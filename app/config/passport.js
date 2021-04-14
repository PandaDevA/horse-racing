const LocalStrategy = require('passport-local').Strategy
const User = require('../methods/users');
const bcrypt = require('bcrypt');

function passportInit(passport){
     passport.use(new LocalStrategy({usernameField: 'username'}, async(username, password, done)=>{
        //Login
        //Check if user exists or not
        let user = await User.getUserByName(username);
        if(!user.result){
            return done(null, false, {message: `Username does not exist. Please try again`});
        }
        user = user.result;
        bcrypt.compare(password, user.password).then((match)=>{     // here match returns true or false
            if(match) {
                let curDate = new Date();
                let prevDate = user.createdAt;
                let diffTime = curDate.getTime() - prevDate.getTime();
                let freeDays = Math.ceil(diffTime / (1000 * 3600 * 24));
                if(user.role != 'admin' && freeDays > 0)  return done(null, false, {message: 'Your trial period is over 24 hours. Please upgrade your subscription.'});
                else return done(null, user, {message: 'Logged in successfully'});
            }

            return done(null, false, {message: 'Username or password is incorrect'});
        }).catch((err)=>{
            return done(null, false, {message: 'Error occur while check password.'});
        })
     }));
     
     //to know whether user is logged in or not
     passport.serializeUser((user, done)=>{
         done(null, user._id)   // second parameter to store in session to know whether user is logged in or not
     })
     
    
     //to receive whatever we have stored in session using passport.serializeUser, here we have stored user._id so we will receive that
     // we deserialize so that we can use req.user to know who is current user in our backend;
     passport.deserializeUser(async(id, done)=>{
         const result = await User.getUserById(id);
         if(!result.error){
             const err = '';
             const user = result.result;
             done(err, user);
         } else done(result.error, false);
     })
    
}

module.exports = passportInit