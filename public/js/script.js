$(document).ready(function(){
  console.log('all systems go on script.js');


//Got this code from a really great gist tutorial on hiding your api key! https://gist.github.com/derzorngottes/3b57edc1f996dddcab25
var mykey = config.MY_KEY;
var secretkey = config.SECRET_KEY;


var callEtsy = function(searchedWords) {
  $.ajax({
  url: "https://openapi.etsy.com/v2/listings/active.js?keywords=" + searchedWords +"&limit=12&includes=Images:1&api_key=" + mykey,
  method: "GET",
  crossDomain: true,
  dataType: "jsonp",
  success: function(data){
    console.log(data);
    for (var i = 0; i < data.results.length; i++) {
      searchResults(data.results[i]);
    }
  }
 });
}

var searchEtsy = function() {
  $("#search-button").click(function() {
    var searchTerm = $("#search-terms").val();
    callEtsy(searchTerm);
  });
};

searchEtsy();

var searchResults = function(data) {
    var image = data.Images[0].url_570xN;
    var price = data.price;
    var title = data.title;
    var link = data.url;

    etsyList(image, price, title, link);

}

var etsyList = function(image, price, title, link) {
  var $body = $("body");
  $body.append("<img src='" + image + "'>");
  $body.append("<p>$" + price + "</p>");
  $body.append("<p>$" + title + "</p>");
  $body.append("<a href=" + link + "> Buy on Etsy </a>");
}

























}); //Doc closing tag
