const express = require("express");
const app = express();
// require("dotenv").config()
// const session = require("express-session");
// const user = require("./models/google_auth_model")
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const auth = require("./controllers/middleware/auth")
// const { ensureAuthenticated, ensureGuest } = require("./controllers/middleware/auth")
const port = process.env.port || 3007

// Configure express-session middleware
// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: false
// }));

// Replace these with your own Google OAuth credentials
// const GOOGLE_CLIENT_ID = "803384580431-e7r0hijoh5cfhuk7ggrpk3gfas6e1bla.apps.googleusercontent.com";
// const GOOGLE_CLIENT_SECRET = "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";
// const GOOGLE_CALLBACK_URL = 'http://localhost:3007/auth/google/callback';

// Configure passport to use the Google OAuth strategy
// passport.use(new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: GOOGLE_CALLBACK_URL
// }, async (accessToken, refreshToken, profile, done) => {
  // This callback will be called after the user has authenticated with Google
  // You can use the profile information to create or authenticate the user in your system

  // const newUser = {
  //   googleId: profile.id,
  //   email: profile.emails[0].value,
  //   firstName: profile.name.givenName,
  //   lastName: profile.name.familyName,
  //   image: profile.photos[0].value,
  // }
  // try {
    //find the user in our database
    // let authuser = await user.findOne({ googleId: profile.id });
    // console.log(authuser)
    // if (authuser) {
      //If user present in our database.
      // done(null, authuser.id)
    // } else {
      // if user is not preset in our database save user data to database.
      // const unAuthUser = await user.create(newUser)
//       console.log(unAuthUser)
//       done(null, unAuthUser.id)
//     }
//   } catch (err) {
//     console.log(err)
//   }
// }));
// Configure passport to serialize and deserialize users
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const authUser = await user.findById(id);
//     done(null, authUser);
//   } catch (err) {
//     done(err);
//   }
// });

// Initialize passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// Configure routes
// app.get('/', (req, res) => {
//   res.send('Hello, please log in with Google <a href="/auth/google">here</a>');
// });
// Initiate the Google OAuth authentication
// app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback URL for Google OAuth authentication
// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     // Redirect the user after successful authentication
//     res.redirect('/profile');
//   });

// Protected route that requires authentication
// app.get('/profile', ensureAuthenticated, (req, res) => {
//   res.send("welcome")
// });

//user routes
const user_routes = require("./routes/userRoute");
app.use('/api', user_routes);

app.listen(port, () => {
  console.log(`Server is run http://localhost:${port}`)
}); 