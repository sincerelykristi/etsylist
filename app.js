const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const session = require('express-session');
const path = require('path');
const request = require('request');

var MY_KEY = process.env.MY_KEY;
var SECRET_KEY = process.env.SECRET_KEY;

/* BCrypt stuff here */
const bcrypt = require('bcrypt');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'theTruthIsOutThere51',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

var db = pgp('postgres://kristimurphy@localhost:5432/etsy_list');

//API call for search - appended to the DOM in etsyList in script.js
app.get("/api", function(req, res) {
    var stuff = req.query.value;
    var api = "https://openapi.etsy.com/v2/listings/active?keywords="+stuff+"&limit=12&includes=Images:1&api_key=" + MY_KEY;

    request.get({
            url: api,
            json: true
        }, function(err, resp, data) {
            res.json(data.results)
        } //end function
    ); //end request
}); //end get
//end API call function


//Load cover page
app.get("/", function(req, res) {
    var user = req.session.user;


    if (user) {
      res.redirect("/dashboard");
    } else {
      res.render('index');
    }
})

//User Authentication or login
app.get("/login", function(req, res) {
    var logged_in;
    var email;

    if (req.session.user) {
        logged_in = true;
        email = req.session.user.email;
    }

    var data = {
        "logged_in": logged_in,
        "email": email
    }

    res.render('login', data);
});

app.get("/signup", function(req, res) {
    res.render('signup')
});

app.post('/signup', function(req, res) {
    var data = req.body;

    bcrypt.hash(data.password, 10, function(err, hash) {
        db.none(
            "INSERT INTO users (name, email, password_digest) VALUES ($1, $2, $3)", [data.name, data.email, hash]
        ).then(function() {
            res.send('User created!');
        })
    });
})

app.post('/login', function(req, res) {
    var data = req.body;

    db.one(
        "SELECT * FROM users WHERE email = $1", [data.email]
    ).catch(function() {
        res.send('Email/Password not found.')
    }).then(function(user) {
        bcrypt.compare(data.password, user.password_digest, function(err, cmp) {
            if (cmp) {
                req.session.user = user;
                res.redirect('/dashboard');
            } else {
                res.send('Email/Password not found.')
            }
        });
    });
});

//Search page route
app.get('/search', function(req, res) {
  var user = req.session.user;
  var data = {data:user};
  if (user) {
    db.many("SELECT * FROM lists WHERE user_id = $1", [user.id]).then(function(list){
      data['lists'] = list;
      console.log(data);
            res.render('search', data);
    })

  } else {
    res.redirect('/')
  }
})

//Dashboard page route
app.get('/dashboard', function(req, res){
  var user = req.session.user;
  var data = {data:user};
  if (user) {
    res.render('dashboard', data);
  } else {
    res.redirect('/')
  }
})

//List page route
app.get('/lists', function(req, res){
  var user = req.session.user;
  var data = {data:user};
  if (user) {
    db.many("SELECT * FROM lists WHERE user_id = $1", [user.id]).then(function(list){
      data['lists'] = list;
      console.log(data);
            res.render('list', data);
    })

  } else {
    res.redirect('/')
  }
})

//create a new wishlist
app.post('/createlist', function(req, res) {
    var user = req.session.user;
    var data = {data:user};

    var wishlist = req.body;

    db.none(
      "INSERT INTO lists (name, user_id) VALUES ($1, $2)", [wishlist.name, user.id]
        ).then(function() {
            res.redirect('/lists');
        })
    });


//Logout and redirect to home page
app.get('/logout', function(req, res){
  req.session.destroy(function(){
    res.redirect("/")
  });
})

app.listen(3000, function() {
    console.log('Etsylist App: listening on port 3000!');
});
