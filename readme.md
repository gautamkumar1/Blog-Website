# Blog Website

A comprehensive Blog Website System with features for user authentication, blog management, and administrative control.

## Features

### Authentication

1. **Register**: Allows new users to sign up with their email, username, role, and password.
2. **Login**: Authenticates users and provides access to their account.
3. **Logout**: Logs users out of their account.
4. **Verify Email**: Sends a verification email to confirm the user’s email address.
5. **Forgot Password**: Allows users to initiate a password reset process if they forget their password.
6. **Reset Password**: Allows users to set a new password using a reset token sent to their email.

### User Features

1. **Write a Blog**: Allows users to create new blog posts.
2. **Show the Draft Blog**: Displays all draft blog posts created by the user.
3. **Check Blog Approval Status**: Allows users to check if their blog posts have been approved or not.

### Admin Features

1. **Show All User Details**: Displays information about all registered users.
2. **Delete User**: Deletes a user from the system.
3. **Show All Posts**: Displays all blog posts in the system.
4. **Delete Post**: Deletes a specific blog post.
5. **Approve Post**: Allows admins to approve a blog post.
6. **Reject Post**: Allows admins to reject a blog post.

## API Endpoints

### Authentication

- **POST /api/user/register**: Register a new user.
- **POST /api/user/login**: Log in a user.
- **POST /api/user/logout**: Log out the user.
- **GET /api/user/verify-email**: Verify user email.
- **POST /api/user/forgot-password**: Initiate the password reset process.
- **POST /api/user/reset-password**: Reset the user’s password.

### User Features

- **POST /api/user/create-blog**: Create a new blog post.
- **GET /api/user/draft-blog**: Get all draft blog posts.
- **GET /api/user/blog**: Check the approval status of user blog posts.

### Admin Features

- **GET /api/admin/show-users**: Show details of all users.
- **DELETE /api/admin/delete-user/:id**: Delete a user by ID.
- **GET /api/admin/show-allposts**: Show all blog posts.
- **DELETE /api/admin/delete-posts/:id**: Delete a blog post by ID.
- **PUT /api/admin/posts/:id/status**: Approve or reject a blog post.

## Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/gautamkumar1/Task-2-Blog-Website.git
    cd server
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add your configuration:

    ```
    JWT_SECRET_KEY = 
   JWT_EXPIRES=
   MONGODB_URL = 
   PORT=
   COOKIE_EXPIRE=
   EMAIL_SERVICE =
   EMAIL_USERNAME =
   EMAIL_PASSWORD = 
   EMAIL_FROM =

    ```

4. **Start the server:**

    ```bash
    npm start
    ```

5. **Visit** `http://localhost:3000` to access the API.



