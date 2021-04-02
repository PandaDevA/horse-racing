const LocalStrategy = require('passport-local').Strategy
const User = require('../methods/users');
const bcrypt = require('bcrypt');

function passportInit(passport) {
    passport.use(new LocalStrategy({ usernameField: 'username' }, async(username, password, done) => {
        //Login
        //Check if user exists or not
        const user = await User.getUserByName(username);
        if (!user.result) {
            return done(null, false, { message: user.error });
        }
        bcrypt.compare(password, user.result.password).then((match) => { // here match returns true or false
            if (match)
                return done(null, user.result, { message: 'Logged in successfully' });

            return done(null, false, { message: 'Username or password is incorrect' });
        }).catch((err) => {
            return done(null, false, { message: 'Something went wrong' });
        })
    }));

    //to know whether user is logged in or not
    passport.serializeUser((user, done) => {
        done(null, user._id) // second parameter to store in session to know whether user is logged in or not
    })


    //to receive whatever we have stored in session using passport.serializeUser, here we have stored user._id so we will receive that
    // we deserialize so that we can use req.user to know who is current user in our backend;
    passport.deserializeUser(async (id, done) => {
        const user = await User.getUserById(id);
        done(user.error, user.result);
    })

}

module.exports = passportInit