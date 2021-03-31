const LocalStrategy = require('passport-local').Strategy
const User = require('../models/users');
const bcrypt = require('bcrypt');

function passportInit(passport){
     passport.use(new LocalStrategy({usernameField: 'email'}, async(email, password, done)=>{
         //Login
         //Check if user exists or not
         const user = await User.findOne({email: email});
         if(!user){
             return done(null, false, {message: 'No user with this email'});
         }
         bcrypt.compare(password, user.password).then((match)=>{     // here match returns true or false
             if(match)
                return done(null, user, {message: 'Logged in successfully'});

             return done(null, false, {message: 'Username or password is incorrect'});
         }).catch((err)=>{
             return done(null, false, {message: 'Something went wrong'});
         })
     }));
     
     //to know whether user is logged in or not
     passport.serializeUser((user, done)=>{
         done(null, user._id)   // second parameter to store in session to know whether user is logged in or not
     })
     
    
     //to receive whatever we have stored in session using passport.serializeUser, here we have stored user._id so we will receive that
     // we deserialize so that we can use req.user to know who is current user in our backend;
     passport.deserializeUser((id, done)=>{
         User.findById(id, (err, user)=>{
             done(err, user);
         })
     })
    
}

module.exports = passportInit