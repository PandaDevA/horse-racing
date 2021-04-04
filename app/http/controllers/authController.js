const { registerUser } = require('../../methods/users')
const passport = require('passport');

function authController() {
    return {
        login(req, res) {
            res.render('auth/login');
        },

        postLogin(req, res, next) {
            console.log(req.body);

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
            const info = registerUser(req.body);
            req.flash('result', info.result);
            req.flash('error', info.error);
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