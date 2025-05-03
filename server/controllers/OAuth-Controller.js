const {generateState, generateCodeVerifier, decodeIdToken} = require("arctic");
const google = require("../utils/google");
const User = require('../models/userSchema');
const OAuth = require('../models/oAuthSchema');
const sendToken = require("../utils/jwtToken");
const jwt = require("jsonwebtoken");
const googleOAuth = async (req, res) => {
    try {
        const state = generateState();
        const codeVerifier = generateCodeVerifier();
        const url = google.createAuthorizationURL(state,codeVerifier,[
            "openid", // this is called scope in the documentation -> this give token
            "profile", // this give user information
            "email", // this give user email
        ]);

        const cookiesConfig = {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 15, // 15 minutes
        };

        res.cookie("google_oauth_state", state, cookiesConfig);
        res.cookie("google_oauth_code_verifier", codeVerifier, cookiesConfig);
        res.redirect(url.toString());

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while logging in with google" });
        
    }
}
const getUserWithOauthId = async ({ provider, email }) => {
    try {
      const [user] = await User.aggregate([
        {
          $match: { email: email } // Find the user by email
        },
        {
          $lookup: {
            from: "oauthaccounts", // collection name in MongoDB (usually all lowercase)
            localField: "_id",
            foreignField: "userId",
            as: "accounts"
          }
        },
        {
          $unwind: {
            path: "$accounts",
            preserveNullAndEmptyArrays: true // LEFT JOIN behavior
          }
        },
        {
          $match: {
            $or: [
              { "accounts.provider": provider },
              { "accounts": null } // Include users even if no oauth account (LEFT JOIN)
            ]
          }
        },
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: 1,
            email: 1,
            provider: "$accounts.provider",
            providerAccountId: "$accounts.providerAccountId"
          }
        }
      ]);
  
      console.log("user:>>>>>>>>>>>>>>>>>>>>>>>.. ", user);
      return user || null;
  
    } catch (error) {
      console.error("Error in getUserWithOauthId:", error);
      throw error;
    }
  };
  
  const linkedUserWithOauth = async ({ userId, provider, providerAccountId }) => {
    try {
        const oauthAccount = await OAuth.findOneAndUpdate(
            { userId: userId, provider: provider },
            { providerAccountId: providerAccountId },
            { new: true, upsert: true } // Create if doesn't exist
          );
        const user = await User.findById(userId);      
  
      return user;
    } catch (error) {
      console.error("Error in linkedUserWithOauth:", error);
      throw error;
    }
  };
const createUserWithOauth = async ({ name, email, provider, providerAccountId }) => {
    try {
      const user = await User.create({ name: name, email: email,isVerified: true, OAuth: [{ provider, providerAccountId }] });

      return user;
    } catch (error) {
      console.error("Error in createUserWithOauth:", error);
      throw error;
    }
}
const getGoogleLoginCallback = async (req, res) => {
    try {
        // Google redirects with code and state in the query params
        const { code, state } = req.query;
        console.log(`code: ${code}, state: ${state}`);
        const { google_oauth_code_verifier, google_oauth_state } = req.cookies;
        console.log(`google_oauth_code_verifier: ${google_oauth_code_verifier}, google_oauth_state: ${google_oauth_state}`);
        
        if(!code || !state || !google_oauth_code_verifier || !google_oauth_state || state !== google_oauth_state) {
            console.log("Could not login with Google: Invalid login attempt. Missing or mismatched parameters.");
            return res.redirect("http://localhost:5173/login?error=invalid_request");
        }
        
        let tokens;
        try {
            tokens = await google.validateAuthorizationCode(code, google_oauth_code_verifier);
            console.log(`tokens from verifying code: ${JSON.stringify(tokens)}`);
        } catch (error) {
            console.log(`Error while validating authorization code: ${error}`);
            return res.redirect("http://localhost:5173/login?error=validation_failed");
        }
        
        // Based on your logs, tokens appear to be in tokens.data format
        const tokenData = tokens.data || tokens;
        const idToken = tokenData.id_token;
        
        if (!idToken) {
            console.log("No ID token received from Google");
            return res.redirect("http://localhost:5173/login?error=no_id_token");
        }
        
        // Decode the ID token - make sure this function is properly implemented
        const claims = decodeIdToken(idToken);
        const { sub: googleUserId, name, email } = claims;
        console.log(`Google user id: ${googleUserId}, name: ${name}, email: ${email}`);

        // Get user by email or OAuth ID
        let user = await getUserWithOauthId({
            provider: "google",
            email
        });
        
        // Create or link user as needed
        if (!user) {
            // User doesn't exist, create a new one
            user = await createUserWithOauth({
                name,
                email,
                provider: "google",
                providerAccountId: googleUserId
            });
        } else if (!user.providerAccountId) {
            // User exists but isn't linked to Google
            await linkedUserWithOauth({
                userId: user.id,
                provider: "google",
                providerAccountId: googleUserId,
            });
            
            // Reload user to get updated info
            user = await getUserWithOauthId({
                provider: "google",
                email
            });
        }
        
        if (!user || !user.id) {
            console.log("Failed to create or find user");
            return res.redirect("http://localhost:5173/login?error=user_creation_failed");
        }
        
        // Ensure OAuth record exists
        let oauthAccount = await OAuth.findOne({ provider: 'google', providerAccountId: googleUserId });
        
        if (!oauthAccount) {
            oauthAccount = await OAuth.create({
                userId: user.id,
                provider: 'google',
                providerAccountId: googleUserId
            });
        }
        
        // Create JWT token
        const userPayload = {
            id: user.id,
            email: user.email,
            provider: 'google',
            providerAccountId: googleUserId
        };
console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

        const jwtToken = jwt.sign(userPayload, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRES,
        });
        
        
        res.redirect(`http://localhost:5173/login?token=${encodeURIComponent(jwtToken)}`);
        
    } catch (error) {
        console.log(`Error in getGoogleLoginCallback: ${error}`);
        // Include error type in the redirect for better debugging
        return res.redirect(`http://localhost:5173/login?error=server_error&message=${encodeURIComponent(error.message)}`);
    }
};

module.exports = {googleOAuth,getGoogleLoginCallback}