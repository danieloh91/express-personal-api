console.log("Sanity Check: JS is working!");
var template;
var $restaurantsList;
var allRestaurants = [];

$(document).ready(function(){

  $restaurantsList = $('#restaurantTarget');

  // compile handlebars template
  var source = $('#restaurants-template').html();
  template = Handlebars.compile(source);

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
      url: '/api/restaurants/'+$(this).attr('data-id'),
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

$(function(){
  $.fn.extend({
    leanModal:function(options){
      var defaults={top:100,overlay:0.5,closeButton:null
      };
      var overlay=$("<div id='lean_overlay'></div>");
      $("body").append(overlay);options=$.extend(defaults,options);
      return this.each(function(){
        var o=options;
        $(this).click(function(e){
          var modal_id=$(this).attr("href");
          $("#lean_overlay").click(function(){
            close_modal(modal_id);
          });
          $(o.closeButton).click(function(){
            close_modal(modal_id);
          });
          var modal_height=$(modal_id).outerHeight();
          var modal_width=$(modal_id).outerWidth();
          $("#lean_overlay").css({
            "display":"block",opacity:0
          });
          $("#lean_overlay").fadeTo(200,o.overlay);
          $(modal_id).css({
            "display":"block",
            "position":"fixed",
            "opacity":0,
            "z-index":11000,
            "left":50+"%",
            "margin-left":-(modal_width/2)+"px","top":o.top+"px"
          });
          $(modal_id).fadeTo(200,1);
          e.preventDefault();
        });
      });
      function close_modal(modal_id){
        $("#lean_overlay").fadeOut(200);
        $(modal_id).css({
          "display":"none"
        });
      }
    }
  });
});
