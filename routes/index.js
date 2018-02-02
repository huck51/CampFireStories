//=======================
//AUTHENTICATION ROUTES
//=======================

var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");

//Passes user info to each route
router.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

//LANDING PAGE ROUTE
router.get("/", function(req, res){
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("landingPage", {campgrounds: allCampgrounds});
    }
  });

});


//AUTH REGISTER ROUTE -- Shows the register form
router.get("/register", function(req, res){
   res.render("register");
});

//AUTH REGISTER ROUTE -- Handles sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if(err){
           console.log('Error in index.js 32'  + err);
           res.render("/register");
       }
       passport.authenticate("local")(req, res, function(){
          res.redirect("/campgrounds");
       });
   });
});

//LOGIN ROUTE -- Show login form
router.get("/login", function(req, res){
   res.render("login");
});

//LOGIN ROUTE-- Handle login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){

});

//LOGOUT ROUTE
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
