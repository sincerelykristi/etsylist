$(document).ready(function() {
    console.log('all systems go on script.js');


    //Got this code from a really great gist tutorial on hiding your api key! https://gist.github.com/derzorngottes/3b57edc1f996dddcab25

    //Search functions to be rendered on search.html
    var callEtsy = function(searchedWords) {

        //i need a url in app.js to handle my ajax call
        //in app.js i need to require request module,
        //make request.get call to api inside the route
        //use data returned in the .then()
        console.log(searchedWords)
        $.ajax({
            url: "/api",
            method: "GET",
            data: { value: searchedWords },
            dataType: "json"
        }).done(function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                searchResults(data[i]);
            }//end for


        })


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

    //end Search functions

    var signUp = function() {
        $("signup").click(function() {

        })
    }

























}); //Doc closing tag
