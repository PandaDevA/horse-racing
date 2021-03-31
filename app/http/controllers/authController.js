const bcrypt = require('bcrypt');
const User = require('../../models/users')
const passport = require('passport');

function authController(){
    return {
        login(req, res) {
            res.render('auth/login');
        },

        postLogin(req, res, next){

            // here err, user, info is coming from passport.js where in done() function we have provided null, false/user , message
            passport.authenticate('local', (err, user, info)=>{       
                if(err){
                    req.flash('error', info.message);
                    return next(err);
                }
                if(!user){
                    req.flash('error', info.message);
                    return res.redirect('/login');
                }

                // when user exists and password matches then login the user using login method;
                req.logIn(user, (err)=>{
                    if(err){
                        req.flash('error', info.message);
                        return next(err);
                    }
                    if(req.user.role=='admin')
                        return res.redirect('/admin/orders');
                    else{
                        return res.redirect('/customer/orders');
                    }
                })
            })(req, res, next)
        },

        register(req, res){
            res.render('auth/register');
        },

        async postRegister(req, res){
            const {name, email, password} = req.body;
            
            //Check if any field is empty
            if(!name || !email || !password){
                req.flash('error', 'All fields are required');
                req.flash('name', name);
                req.flash('email', email);
               res.redirect('/register');
            }

            //Check if user email already exists
            User.exists({email: email}, (err, result)=>{
                if(result){
                    req.flash('error', 'Email already exists, Try another!')
                    req.flash('name', name);
                    req.flash('email', email);
                  res.redirect('/register');
                }
            })

            //Hash Password
            const hashedPass = await bcrypt.hash(password, 10)

            //Create a user
            const user = new User({
                name: name,
                email: email,
                password: hashedPass
            })
            user.save().then(()=>{
                //Login

                res.redirect('/login');

            }).catch((err)=>{
                req.flash('error', 'Something went wrong');
                res.redirect('/register');
            })
        },

        logout(req, res){
            req.logout();
            delete req.session.cart;
            return res.redirect('/');
        }
    }
}
module.exports = authController;