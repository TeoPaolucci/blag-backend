# blag-backend

This backend server uses MongoDB, Mongoose, and Express as its means of storing data.

I am using the express-passport files provided by Saad (found here: https://github.com/ga-wdi-boston/express-passport) to set up a user login/register system for my project. This allows this server to:
  * Create a "User" and store it's username and encrypted password in the database using a post request at `/signup`
  * Create a 5 minute session for a user when a username and password is sent to `/login`
  * End a user session by using `/logout`
  * Change a user's password (provided the user is logged in) using `/chagePassword`

I have created a Post model witch allows a user to create, view, update, and delete posts in various ways including:
  * viewing all of the logged in user's posts
  * creating a new post tied to the logged in user
  * viewing all of another specified user's posts
  * viewing one specified post
  * updating one specified post that belongs to the user
  * deleting one specified post that belongs to the user
