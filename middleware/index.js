var Campground = require("../models/campground");
var Comment = require("../models/comment")
// All the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err) {
                req.flash("error", "Something went wrong. Campground not found.");
                res.redirect("back");
            } else {
                
                // Added this block, to check if foundCampground exists, and if it doesn't to throw an error via connect-flash and send us back to the homepage
                if (!foundCampground) {
                        req.flash("error", "Item not found.");
                        return res.redirect("back");
                    }
                // If the upper condition is true this will break out of the middleware and prevent the code below to crash our application
                
                    //did user create post?
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to logged in to do that!")
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                req.flash("error", "Something went wrong. Comment not found.");
                res.redirect("back");
            } else {
                
                // Added this block, to check if foundCampground exists, and if it doesn't to throw an error via connect-flash and send us back to the homepage
                if (!foundComment) {
                        req.flash("error", "Item not found.");
                        return res.redirect("back");
                    }
                // If the upper condition is true this will break out of the middleware and prevent the code below to crash our application
                
                //did user create post?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    req.flash("error", "Please login to continue.");
    res.redirect("/login");
}

middlewareObj.commentNoChange = function(req, res, next) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            console.log(err);
        } else {
            if (req.body.comment.text === foundComment.text) {
                console.log("Nothing has changed");
                res.redirect("/campgrounds/" + req.params.id);
            } else {
                next();
            }
        }
    });
}

module.exports = middlewareObj;