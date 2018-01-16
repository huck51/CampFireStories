var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds"),
    Comment = require("./models/comment"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    port = process.env.PORT || 5000,
    methodOverride = require("method-override");

//ROUTES
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index");

//APP CONFIG
// mongoose.connect("mongodb://localhost/camp_fire_stories");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
//seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "...Secrets Secrets Secrets Secrets Secrets",
    resave: false,
    saveUninitialized: false

}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//Passes user info to each route
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

//Requiring Routes
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//LISTENER
app.listen(port, function(){
    console.log(`SERVS UP DUDE ON PORT ${port}`);
});
