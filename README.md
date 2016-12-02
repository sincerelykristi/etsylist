# Etsy.list

Etsy.list is a fullstack CRUD web application allowing users to search the Etsy 
marketplace and save items to their personal Wishlist. Etsy.list also features login 
functionality.

[Start building your wishlist on Etsy.list](http://etsylist.herokuapp.com)

![](http://i.giphy.com/xT8qAXxZBUcdsdqSuA.gif)

## User Story

Etsy.list users are conscientious consumers who support small businesses, local businesses 
and are interested in finding products ethically produced and/or unqique and handmade. 
These users are looking for a way to curate items they like with the intent of easy sharing 
their 'Wishlist' with family members as inspiration for gift giving occasions. In short, 
"I like these items, hint hint."


## Technology used and Approach

The frontend is built with HTML5, CSS3, Bootstrap and JQUERY/Javascript.

The server is built with Node.js, Express.js, npm, AJAX/API calls to Etsy's API. 

To start I conceptualized the data structures with a database ERD. My original ERD featured 3 tables but was later changed to two when I changed the functionality of the app to NOT feature multiple wishlist. This functionality may be added in the future. ERDs pictured below.

### 3 Table ERD
![Etsy.list 3 Table ERD](http://i.imgur.com/WPEXVeJ.jpg)

### 2 Table ERD
![Etsy.list 2 Table ERD](http://i.imgur.com/pRKLs36.jpg)

From there I also thought out the wireframes for each page of my application (and in turn the views/routes for later backend).

## Wireframes
![Etsy.list Wireframes](http://i.imgur.com/rzzeay6.jpg)

My API Call happens in the backend and passes it to my front end javascript file to append the Search information for user access. 

After the search, all information storage occurs via front end click functions calling to backend routes to post, delete or put information gained from those DOM elements.

All together Users can sign up and login. Passwords are securely stored as a password digest hash. 

Logged in users can access their Dashboard which just serves as the homepage and can navigate to their Wishlist, the Search page or User Settings.



## Unsolved problems

Guest users: Originally I wanted to be able to let a user access the site by 'Continue as Guest'. The guest login would give access to the search and create a temporary wishlist from the current session, also the wishlist would no longer exist when the user closed their browser or navigated away from the page. Currently this feature is not available and any user who is not logged in will be consistently redirected to the index page which just prompts them to login or sign up.

Bootstrap: I started styling with Bootstrap but the functionality of the web app was more important. Since I'm not familiar with Bootstrap my styling is messy or nonexistent but will be updated later. 

Multiple Wishlists: When I started the project, I wanted users to be able to create many wishlists and when saving, wanted them to have the option of which wishlist to add the item to.

Although I was able to create three tables - Users, Lists and Item - and allow logged in users to create multiple lists, I was not able to solve how to access the lists table while also letting users choose a list for each searched item. 




