var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground");



//INDEX ROUTE -- Show all campgrounds
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//CREATE ROUTE -- Add new campgrounds to DB
router.post("/", isLoggedIn, function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name: name, image: image, description: desc, author: author};

   Campground.create(newCampground, function(err, newlyCreated){
      if(err){
          console.log(err);
      } else {
          res.redirect("/campgrounds");
      }
   });
});

// NEW ROUTE -- Show form to create new campgrounds
router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//SHOW ROUTE -- Shows info about a specific campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//EDIT ROUTE
router.get("/:id/edit", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           res.render("campgrounds/edit", {campground: foundCampground});
       }
    });
});

//UPDATE ROUTE
router.put("/:id", function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
      if(err) {
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds/" + req.params.id);
      }
    });
});

//DESTROY ROUTE
router.delete("/:id", function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds");
       }
    });
});


module.exports = router;
