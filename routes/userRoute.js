const express = require("express");
const user_route = express();
const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));
const auth = require("../controllers/middleware/auth")
require("../config/conn")
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// // Replace these with your own Google OAuth credentials
// const GOOGLE_CLIENT_ID = "349783707782-8sd6r9gd385julkmbkb1s6d8d4hmmq72.apps.googleusercontent.com";
// const GOOGLE_CLIENT_SECRET = "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";
// const GOOGLE_CALLBACK_URL = 'http://localhost:3007/auth/google/callback';

// // Configure passport to use the Google OAuth strategy
// passport.use(new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: GOOGLE_CALLBACK_URL
// }, (accessToken, refreshToken, profile, done) => {
//   // This callback will be called after the user has authenticated with Google
//   // You can use the profile information to create or authenticate the user in your system
//   console.log(profile);
//   // Add your logic here to handle the user's profile
// }));

const user_controller = require("../controllers/userController");

//Register route
user_route.post('/register', user_controller.register_user);

//Login route
user_route.post('/login', user_controller.user_login);

//Auth route
// user_route.get('/test', auth, (req, res) => {
//     return res.send({ status: 200, success: true, Message: "Authenticated" })
// });

// user_route.get('/test', auth, (req, res) => {
//     return res.send({ status: 200, success: true, Message: "Authenticated" })
// })
//update Password route
// user_route.post('/update-password', auth, user_controller.update_password);

//Social Login
// Configure routes
// user_route.get('/', function(req, res){
//     return res.send('Hello, please log in with Google <a href="/auth/google">here</a>');
//   });

// // Initiate the Google OAuth authentication
// user_route.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

// // Callback URL for Google OAuth authentication
// user_route.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     // Redirect the user after successful authentication
//     res.redirect('/profile');
//   });

// // Protected route that requires authentication
// user_route.get('/profile', (req, res) => {
//     if (req.isAuthenticated()) {
//       res.send('Welcome to your profile!');
//     } else {
//       res.redirect('/');
//     }
//   });


module.exports = user_route;
