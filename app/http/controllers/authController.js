const { registerUser } = require('../../methods/users')
const passport = require('passport');
var request = require('request');

function authController() {
    return {
        login(req, res) {
            res.render('auth/login');
        },

        postLogin(req, res, next) {

            // here err, user, info is coming from passport.js where in done() function we have provided null, false/user , message
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message);
                    return next(err);
                }
                if (!user) {
                    req.flash('error', info.message);
                    return res.redirect('/login');
                }

                // when user exists and password matches then login the user using login method;
                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message);
                        return next(err);
                    }


                    if (req.user.role == 'admin')
                        return res.redirect('/admin/setting');
                    else {
                        return res.redirect('/home');
                    }
                })
            })(req, res, next)
        },

        async postRegister(req, res) {
            const parseIp = (req) =>
                (typeof req.headers['x-forwarded-for'] === 'string'
                    && req.headers['x-forwarded-for'].split(',').shift())
                || req.connection.remoteAddress
                || req.socket.remoteAddress
                || req.connection.socket.remoteAddress

            console.log(parseIp(req));

            // g-recaptcha-response is the key that browser will generate upon form submit.
            // if its blank or null means user has not selected the captcha, so return the error.
            if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
                req.flash("error", "Please select recaptcha");
                return res.redirect('/login');
            }
            // Put your secret key here.
            let secretKey = "6LfEw58aAAAAAIKefugvWGprNgQEPX1YtLOyjgJs";
            // req.connection.remoteAddress will provide IP address of connected user.
            let verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
            // Hitting GET request to the URL, Google will respond with success or error scenario.
            request(verificationUrl,function(error,response,body) {
                body = JSON.parse(body);
                // Success will be true or false depending upon captcha validation.
                if(body.success !== undefined && !body.success) {
                    req.flash("error", "Failed captcha verification");
                    return res.redirect('/login');
                }
            });

            const info = registerUser(req.body, parseIp(req));
            if(!info.result) req.flash('error', info.error);
            res.redirect('/login');
        },

        logout(req, res) {
            req.logout();
            delete req.session.cart;
            req.session.destroy(function (err) {
                   res.redirect('/'); //Inside a callback… bulletproof!
               });
            // return res.redirect('/');
        }
    }
}
module.exports = authController;