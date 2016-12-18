$(document).ready(function() {
    console.log('all systems go on script.js');

    // navbar mobile button initialization
    $(".button-collapse").sideNav();

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
        var shortTitle = title.split(',');
        var $body = $("body");
        var $etsyimages = $("#etsy-images");
        var $item = $("<div class='item'></div>");
        var $form = $("<form action='/additem' method='post'></form>");
        $etsyimages.append($item);
        $item.append("<img src='" + image + "'>");
        $item.append("<p>$" + price + "</p>");
        $item.append("<p>" + shortTitle + "</p>");
        $item.append("<a href=" + link + "> Buy on Etsy </a>");
        $item.append($form);
        $form.append("<input name='image' type='hidden' value='" + image + "'>");
        $form.append("<input name='name' type='hidden' value='" +shortTitle+ "'>");
        $form.append("<input name='link' type='hidden' value='" +link+ "'>");
        $form.append("<input name='price' type='hidden' value='" +price+ "'>");
        $form.append("<button type='submit' value='submit' class='btn-default btn-lg white'><span class='grey-text text-darken-3'>&#10084;</span></button>");
        };

    //end Search functions



























}); //Doc closing tag
