console.log("Sanity Check: JS is working!");
var template;
var $restaurantsList;
var allRestaurants = [];

$(document).ready(function(){

  $restaurantsList = $('#restaurantTarget');

  $.ajax({
    method: 'GET',
    url: '/api/restaurants',
    success: handleSuccess,
    error: handleError
  });

  $("#newRestaurantForm").on("submit", function(e) {
    e.preventDefault();
    console.log('hi');
    $.ajax({
      method: 'POST',
      url: '/api/restaurants',
      data: $(this).serialize(),
      dataType: 'json',
      success: newRestaurantSuccess,
      error: newRestaurantError
    });
    return;
  });

  $restaurantsList.on('click', '.deleteBtn', function() {
    $.ajax({
      method: 'DELETE',
      url: '/api/restaurant/'+$(this).attr('data-id'),
      success: deleteRestaurantSuccess,
      error: deleteRestaurantError
    });
  });

});

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render() {
  // empty existing posts from view
  $restaurantsList.empty();

  // pass `allRestaurants` into the template function
  var restaurantsHtml = template({ restaurants: allRestaurants });

  // append html to the view
  $restaurantsList.append(restaurantsHtml);
}

function handleSuccess(json) {
  allRestaurants = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#restaurantTarget').text('Failed to load restaurants, is the server working?');
}

function newRestaurantSuccess(json) {
  $('#newRestaurantForm input').val('');
  allRestaurants.push(json);
  render();
}

function newRestaurantError() {

}

function deleteRestaurantSuccess(json) {
  var restaurant = json;
  var restaurantId = restaurant._id;

  // find the restaurant the correct ID and remove it from our allRestaurants array
  for(var index = 0; index < allRestaurants.length; index++) {
    if(allRestaurants[index]._id === restaurantId) {
      allRestaurants.splice(index, 1);
      break;
    }
  }
  render();
}

function deleteRestaurantError() {

}
