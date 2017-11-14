var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended:true }));
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotingApp');
mongoose.Promise = global.Promise;
// Setting up schema 
var UserSchema = new mongoose.Schema({
  name: {type: String},
  quote: {type: String}
}, {timestamps: true})
var User = mongoose.model('User', UserSchema);



// Home route 
app.get('/', function(req, res) {
    res.render('index');
})
// Get all quotes 
app.get('/quotes', function(req, res) {
  User.find({}, function (err, users) {
    if (err) {
      console.log('cannot find all users quotes');
    }
    else {
      console.log('find all users qutoes');
      res.render('quotes', {users: users});
    }
  })
})


// Create User's quote Request 
app.post('/quotes', function(req, res) {
    console.log("POST DATA", req.body);
    var user = new User(req.body);    
    user.save(function(err) {
      if (err) {
        console.log('something went wrong', err);
      }
      else {
        console.log('successful save data');
        // redirect to the ejs page when successfully created a quote 
        res.redirect('/quotes');
      }
    })
  })


// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})