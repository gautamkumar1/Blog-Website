const mongoose = require('mongoose');
const oAuthSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    provider: {
        type: String,
        required: true,
        enum: ['google', 'github'],
    },
    providerAccountId: {
        type: String,
        required: true,
    },

})

const OAuth = mongoose.model("oauthaccounts", oAuthSchema);
module.exports = OAuth;