const express = require("express");
const app = express();
const path = require('./config/conn');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Replace these with your own Google OAuth credentials
const GOOGLE_CLIENT_ID = "349783707782-8sd6r9gd385julkmbkb1s6d8d4hmmq72.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GOOGLE_CALLBACK_URL = 'http://localhost:3007/auth/google/callback';

// Configure passport to use the Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  // This callback will be called after the user has authenticated with Google
  // You can use the profile information to create or authenticate the user in your system
  console.log(profile);
  // Add your logic here to handle the user's profile
}));

// Configure routes
app.get('/', (req, res) => {
  res.send('Hello, please log in with Google <a href="/auth/google">here</a>');
});

// Initiate the Google OAuth authentication
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

// Callback URL for Google OAuth authentication
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Redirect the user after successful authentication
    res.redirect('/profile');
  });

// Protected route that requires authentication
app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Welcome to your profile!');
  } else {
    res.redirect('/');
  }
});


//user routes
const user_routes = require("./routes/userRoute");
app.use('/api', user_routes);

app.listen(3007,()=>{
    console.log(`Server is Created`)
});