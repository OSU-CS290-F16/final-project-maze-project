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

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

// Parse all request bodies as JSON.
//app.use(bodyParser.json());

//Serve static files from public/.
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

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

//var collection= mongoDB.collection('web_dev');
// Render the index page for the root URL path ('/').
/*app.get('/', function (req, res) {

  res.render('index-page',{
        score:30
 });
});*/

app.get('/', function (req, res) {

  /*
   * Initiate a database query for all of our people in the database.  We'll
   * respond to the requesting client from within the callback of the query.
   */
  var collection = mongoDB.collection('web_dev');
  collection.find({}).toArray(function (err, web_dev) {
  res.render('index-page', {
        first:web_dev[0].first,
        second:web_dev[1].second,
        //third:web_dev[0].third
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



/*


/*app.get('/', function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(indexHTML);
  res.end();

});

app.get('/instructions', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(instructionsHTML);
    res.end();
});

app.get('*', function(req, res) {
  res.writeHead(404, {"Content-Type": "text/html"});
  res.write(errorHTML);
  res.end();
});
*/

function sendClearTime(endTimeInt) {
    /**var int=endTimeInt;

    collection = mongoDB.collection('web_dev');
    collection.update({first:int});
*/
   	console.log("Here is where '" + endTimeInt + "' will be sent to the database." );
  //  window.location.href = 'http://localhost:3000/';

}

/*
var indexHTML= fs.readFileSync(staticDir + '/index.html','utf8');
var indexMedHTML= fs.readFileSync(staticDir + '/indexMEDIUM.html','utf8');
var indexHardHTML= fs.readFileSync(staticDir + '/indexHARD.html','utf8');
var instructionsHTML= fs.readFileSync(staticDir + '/instructions.html','utf8');
var errorHTML= fs.readFileSync(staticDir + '/404.html','utf8');
var styleCSS= fs.readFileSync(staticDir + '/style.css','utf8');
var styleCSS2= fs.readFileSync(staticDir + '/style2.css','utf8');
var mazeJS= fs.readFileSync(staticDir + '/maze.js','utf8');
*/
