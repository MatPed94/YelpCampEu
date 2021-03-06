var express = require("express");
var router = express.Router();
var Campground = require("../models/campground")
var middleware = require("../middleware")

// INDEX - show all campgrounds
router.get('/', function(req, res) {
    Campground.find({}, function(err, allcampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allcampgrounds});
        }
    });
});

//Create route
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
    Campground.create(newCampground, function (err, newlyCreated){
        if (err) {
            req.flash("error", err.message);
            console.log(err);
        } else {
            req.flash("success", "Success! Thank you for submitting a new campground.");
            res.redirect("/campgrounds");
        }
    });
});

router.get('/new', middleware.isLoggedIn, (req, res) => res.render("campgrounds/new"));

//SHOW - show additional info about campground
router.get("/:id", function(req, res) {
    //find the campground with with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            // renders the show page
            res.render("campgrounds/show", {campground: foundCampground}); 
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err) {
                req.flash("error", err);
            } else {
               res.render("campgrounds/edit", {campground: foundCampground}); 
            }
        });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    //find and update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            //redirect to show page
            req.flash("success", "Campground content updated!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground removed");
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;