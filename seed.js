// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var restaurant_list = [
  {
    name: 'Tacos Sinaloa',
    cuisine: 'Mexican',
    location: 'Oakland, CA',
    best_dish: 'Al Pastor tacos',
    image_url: 'http://s3-media2.fl.yelpcdn.com/bphoto/tWVvdDkKPA6nLADoRGP_OQ/o.jpg'
  },
  {
    name: 'Sugarfish',
    cuisine: 'Japanese',
    location: 'Los Angeles, CA',
    best_dish: 'Uni Nigiri',
    image_url: 'http://sugarfishsushi.com/wp-content/uploads/2012/04/sugarFISH_Takeout.jpg'
  }
];


db.Restaurant.create(restaurant_list, function(err, restaurant){
  if (err){
    console.log("Error:", err);
    return;
  }

  console.log("Created new restaurant", restaurant._id);
  process.exit(); // we're all done! Exit the program.
});
