var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
  name: String,
  cuisine: String,
  location: String,
  best_dish: String,
  image_url: String
});

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
