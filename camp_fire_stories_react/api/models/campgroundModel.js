const mongoose = require(mongoose);
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  author: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    username: { type: String }
  },
});

module.exports = mongoose.model('Campground', CampgroundSchema);
