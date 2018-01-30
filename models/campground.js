var mongoose = require("mongoose"),
    Comment = require("./comment");
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    date: {
      type: Date,
      default: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
});


module.exports = mongoose.model("Campground", campgroundSchema);
