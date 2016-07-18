// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var restaurant_list = [
  {
    name: 'Tacos Sinaloa',
    cuisine: 'Mexican',
    location: 'Oakland, CA',
    best_dish: 'Al Pastor Tacos',
    image_url: 'http://s3-media4.fl.yelpcdn.com/bphoto/94H5vus5QpCEiOVh0_rOyg/o.jpg'
  },
  {
    name: 'Sugarfish',
    cuisine: 'Japanese',
    location: 'Los Angeles, CA',
    best_dish: 'Uni Nigiri',
    image_url: 'http://sugarfishsushi.com/wp-content/uploads/2012/04/sugarFISH_Takeout.jpg'
  },
  {
    name: 'China Village',
    cuisine: 'Chinese',
    location: 'Albany, CA',
    best_dish: 'Five Spice Hot and Spicy Pork Shoulder',
    image_url: 'http://s3-media2.fl.yelpcdn.com/bphoto/UBBib7IsSKbObwCdlU7ToA/o.jpg'
  },
  {
    name: 'PyeongChang Tofu House',
    cuisine: 'Korean',
    location: 'Oakland, CA',
    best_dish: 'Spicy Soft Tofu Soup',
    image_url: 'http://s3-media1.fl.yelpcdn.com/bphoto/rHQRToSORI3hrYdYTEEnFg/o.jpg'
  }
];


db.Restaurant.create(restaurant_list, function(err, restaurant){
  if (err){
    res.sendStatus(404);
    return;
  }
  process.exit(); // we're all done! Exit the program.
});
