const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync')

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', catchAsync (async (req, res) => {
    try{
        const { username, email, password, password2 } = req.body;
        if(password == password2){
            const user = await new User({ username, email });
            const registeredUser = await User.register(user, password);
            req.login(registeredUser, err => {
            if(err) return next(err)

            req.flash('success', "New User Registered");
            res.redirect('/'); 
        })
        } else{
            req.flash('error', "Password does not match");
            res.redirect('register');
        }
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
    
}))

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/home'
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res) => {
    req.logOut();
    req.flash("success", "Goodbye");
    res.redirect('/');
})

module.exports = router;

// if(req.user && req.user.isAdmin){
//     res.render('users/register');
// }
// else{
//     req.flash('error', 'Only admins can register new users.')
//     res.redirect('/login');
// }