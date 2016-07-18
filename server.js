// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    db = require('./models');

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: false, // CHANGE ME ;)
    message: "Welcome to Daniel's personal api! Here's what you need to know!",
    documentation_url: "https://github.com/danieloh91/express-personal-api/README.md", // CHANGE ME
    base_url: "https://shrouded-brushlands-49491.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "GET", path: "/api/restaurants", description: "Database of all my favorite eateries"},
      {method: "GET", path: "/api/restaurants/:id", description: "Shows info of a specific eatery"},
      {method: "POST", path: "/api/restaurants", description: "Adds an eatery"},
      {method: "PUT", path: "/api/restaurants/:id", description: "Updates info of a specific eatery (currently under construction)"},
      {method: "DELETE", path: "/api/restaurants/:id", description: "Deletes a specific eatery"}
      // CHANGE ME
    ]
  });
});

// get api profile
app.get('/api/profile', function api_profile(req, res) {
  // send all books as JSON response
  res.json({
    name: 'Daniel Oh',
    github_link: 'https://github.com/danieloh91',
    github_profile_image: 'https://avatars2.githubusercontent.com/u/16109701?v=3&s=460',
    current_city: 'Berkeley, CA',
    favorite_dishes: [{name: "sushi", cuisine: "Japanese"}, {name: "tacos", cuisine: "Mexican"}]
  });
});

// get all restaurants
app.get('/api/restaurants', function api_restaurants(req, res) {
  db.Restaurant.find(function (err, restaurants) {
    if (err) {
      res.sendStatus(404);
    }
    res.json(restaurants);
  });
});

// get restaurant by Id
app.get('/api/restaurants/:id', function api_onerestaurant(req, res) {
  var id = req.params.id;
  db.Restaurant.findOne({_id: id}, function (err, restaurant) {
    if (err) {
      res.sendStatus(404);
    }
    res.json(restaurant);
  });
});

// create new restaurant
app.post('/api/restaurants', function create_newrestaurant(req, res) {
  db.Restaurant.create(req.body, function(err, restaurant){
    if (err) {
      res.sendStatus(404);
    }
    res.json(restaurant);
  });
});

// delete a restaurant post
app.delete('/api/restaurants/:id', function delete_restaurant(req, res) {
  var restaurantId = req.params.id;
  db.Restaurant.findOneAndRemove({_id: restaurantId}, function (err, deleted) {
    if (err) {
      res.sendStatus(404);
    }
    res.json(deleted);
  });
});

// edit a restaurant post
app.put('/api/restaurants/:id', function edit_restaurant(req, res) {

});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
