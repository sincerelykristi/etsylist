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

app.get("/api", function(req, res) {
    //console.log("REQ", req)
    var stuff = req.query.value;
    console.log("REQ2", stuff)
        //console.log("RESP", res)


    var api = "https://openapi.etsy.com/v2/listings/active?keywords="+stuff+"&limit=12&includes=Images:1&api_key=" + MY_KEY;
    //https://openapi.etsy.com/v2/listings/?api_key=

    request.get({
            url: api,
            json: true
        }, function(err, resp, data) {
            //console.log('RESULTS', data.results)
            //console.log(JSON.parse(data));
            res.json(data.results)
                // res.json(body);
        } //end function
    ); //end request
}); //end get

app.get("/", function(req, res) {
    res.render('index');
})

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
                res.redirect('/search');
            } else {
                res.send('Email/Password not found.')
            }
        });
    });
});

app.get('/search', function(req, res) {
    res.render('search');
})


app.listen(3000, function() {
    console.log('Etsylist App: listening on port 3000!');
});
