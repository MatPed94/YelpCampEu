var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get('/', (req, res) => res.render("landing"));

// ===============================================
// AUTH ROUTES
// ===============================================

//Show register form
router.get('/register', (req, res) => res.render("register"));

//handles sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("info", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//Show loggin form
router.get('/login', (req, res) => res.render("login"));

//Handles login logic
router.post("/login", passport.authenticate('local', 
    {
        failureRedirect: '/login',
        failureFlash: true
    }), function(req, res) {
            res.redirect(req.session.returnTo || '/campgrounds');
            delete req.session.returnTo;
});

//Logout
router.get('/logout', function(req, res){
    req.logout();
    req.flash("info", "You are now logged out.");
    res.redirect("/campgrounds");
}); 

module.exports = router;