$(document).ready(function() {
    console.log('all systems go on script.js');



    //Search functions to be rendered on search.html
    var callEtsy = function(searchedWords) {
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
            }
        })
    }



//click function for search page/button
    var searchEtsy = function() {
        $("#search-button").click(function() {
            var $body = $("body");
            var $item = $(".item");
            $item.remove();
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
        var $etsyimages = $("#etsy-images");
        var $item = $("<div class='item'></div>");
        $etsyimages.append($item);
        $item.append("<img src='" + image + "'>");
        $item.append("<p>$" + price + "</p>");
        $item.append("<p>$" + title + "</p>");
        $item.append("<a href=" + link + "> Buy on Etsy </a>");
    };

    //end Search functions



























}); //Doc closing tag
