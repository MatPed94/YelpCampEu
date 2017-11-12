const express         = require('express'),
      app             = express(),
      bodyParser      = require("body-parser"),
      mongoose        = require('mongoose'),
      flash           = require("connect-flash"),
      passport        = require("passport"),
      LocalStrategy   = require("passport-local"),
      methodOverride  = require("method-override"),
      Campground      = require("./models/campground"),
      Comment         = require("./models/comment"),
      User            = require("./models/user"),
      seedDB          = require("./seeds");
      
// Requiring routes
var commentsRoutes    = require("./routes/comments"),
    campgroundsRoutes = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");
    
      
// APP CONFIG
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v12";
mongoose.connect(url, {useMongoClient: true});


mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //Seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "i need to poop brb",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   res.locals.info = req.flash("info");
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server online. PORT: " + process.env.PORT + " IP: " + process.env.IP);
});