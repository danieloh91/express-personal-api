console.log("Sanity Check: JS is working!");
var template;
var $restaurantsList;
var allRestaurants = [];

$(document).ready(function(){

  $restaurantsList = $('#restaurantTarget');

  // compile handlebars template
  var source = $('#restaurants-template').html();
  template = Handlebars.compile(source);

  $(".btn-input").click(function() {
    $(".btn-input").hide();
    $("#newRestaurantForm").show();
    $(".btn-default").click(function() {
      $("#newRestaurantForm").hide();
      $(".btn-input").show();
    });
    $(".escape").click(function() {
      $("#newRestaurantForm").hide();
      $(".btn-input").show();
    });
  });

  $.ajax({
    method: 'GET',
    url: '/api/restaurants',
    success: handleSuccess,
    error: handleError
  });

  $("#newRestaurantForm").on("submit", function(e) {
    e.preventDefault();
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
      url: '/api/restaurants/'+$(this).attr('data-id'),
      success: deleteRestaurantSuccess,
      error: deleteRestaurantError
    });
  });
});

function render() {
  $restaurantsList.empty();
  var restaurantsHtml = template({ restaurants: allRestaurants });
  $restaurantsList.append(restaurantsHtml);
}

function handleSuccess(json) {
  allRestaurants = json;
  render();
}

function handleError(e) {
  $('#restaurantTarget').text('Failed to load restaurants, is the server working?');
}

function newRestaurantSuccess(json) {
  $('#newRestaurantForm input').val('');
  allRestaurants.push(json);
  render();
}

function newRestaurantError() {
  console.log('newRestaurantError');
}

function deleteRestaurantSuccess(json) {
  var restaurant = json;
  var restaurantId = restaurant._id;
  for(var index = 0; index < allRestaurants.length; index++) {
    if(allRestaurants[index]._id === restaurantId) {
      allRestaurants.splice(index, 1);
      break;
    }
  }
  render();
}

function deleteRestaurantError() {
  console.log('deleteRestaurantError');
}
