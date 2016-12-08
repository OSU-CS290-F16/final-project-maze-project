var fs = require('fs');
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 3000;

// Will store database access
var mongoDB;
var collection;
var mongoURL='mongodb://salinasr:usethisdb420@ds033317.mlab.com:33317/web_dev';

var score=1000;
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

app.use(express.static(__dirname));
app.use(bodyParser.json());

// Make a connection to Mongo database
MongoClient.connect(mongoURL, function (err, db) {
  if (err) {
    console.log("== Unable to make connection to MongoDB Database.")
    throw err;
  }
  mongoDB = db;
  app.listen(port, function () {
    console.log("== Listening on port", port);
  });
});

app.get('/', function (req, res) {
  var collection = mongoDB.collection('web_dev4');
  collection.find({}).toArray(function (err, web_dev4) {
  res.render('index-page', {
        first:web_dev4[0].first,
        second:web_dev4[0].second,
        third:web_dev4[0].third
      });
  });
});


app.get('/instructions', function (req, res) {
  res.render('instructions-page',{
    other:1
  });
});

app.get('*', function (req, res) {
  res.render('404-page',{
    other:1
  });
});


app.post('/', function (req, res, next) {
  var number =req.body.number;
  collection = mongoDB.collection('web_dev4');
  collection.find({}).toArray(function (err, web_dev4) {

  if(number<web_dev4[0].first){
    collection.updateOne({},{$set: {first:number}});
  }

  else if (number>web_dev4[0].first && number<web_dev4[0].second) {
    collection.updateOne({},{$set: {second:number}});
  }

  else if (number>web_dev4[0].second && number<web_dev4[0].third ) {
    collection.updateOne({},{$set: {third:number}});
  }

});

});
