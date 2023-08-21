const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const { models } = require('mongoose');


passport.use(new LocalStrategy({
        usernameField:'email',
        passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email });
    
        if (!user || user.password != password) {
          // console.log("invalid Username/password");
          req.flash('error', 'Invalid Username/password');
          return done(null, false);
        }
    
        return done(null, user);
      } catch (err) {
        req.flash('error', err);
        return done(err);
      }
    // function(username, password, done){
    //     // find user and establish the identity
    //     User.findone({email:email}, function(err, user){
    //         if(err){
    //              console.log('Error in finding the user --> passport');
    //              return done(err);
    //         }

    //         if(!user || user.password != password){
    //             console.log("invalid Username/password");
    //             return done(null, false);
    //         }

    //         return done(null, user);
    //     })
    }
));

// serilizind the user to decide which key is to be kept in the cookies 
passport.serializeUser((user, done) => {
    done(null, user.id);
  });


// Deserilizing the user from the key in the cookies
passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  // check if the user is authenticated
  passport.checkAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    // if the user is not signed in
    return res.redirect('/user/signIn');
  }

  passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
      // req.user contains the current signed in user from session cookies and we are just sending 
      // this to the locals for the views 
      res.locals.user = req.user;
    }
    next();
}

  module.exports=passport;