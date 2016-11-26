$(document).ready(function(){
  console.log('all systems go on script.js');


//Got this code from a really great gist tutorial on hiding your api key! https://gist.github.com/derzorngottes/3b57edc1f996dddcab25
var mykey = config.MY_KEY;
var secretkey = config.SECRET_KEY;

var callEtsy = function(){
 $.ajax({
  url: "https://openapi.etsy.com/v2/listings/active?api_key=" + mykey,
  method: "GET",
  success: function(data){
    console.log(data);
  }
 });
};

callEtsy();























}); //Doc closing tag
