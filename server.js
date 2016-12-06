var path = require('path');
var http = require("http");
var fs = require('fs');

var staticDir = __dirname;
var port = process.env.PORT || 3000;

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
var errorHTML= fs.readFileSync(staticDir +'/404.html','utf8');
var instructionsHTML= fs.readFileSync(staticDir + '/instructions.html','utf8');

// Some stuff from class examples
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();

// Will store database access
var mongoDB;
var mongoURL='mongodb://salinasr:usethisdb420@ds033317.mlab.com:33317/web_dev';

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

// Parse all request bodies as JSON.
app.use(bodyParser.json());

// Serve static files from public/.
app.use(express.static(__dirname));
// Render the index page for the root URL path ('/').
//var collection= mongoDB.collection('web_dev');
var collection
// Make a connection to Mongo database
/*MongoClient.connect('mongodb://salinasr:usethisdb420@ds033317.mlab.com:33317/web_dev', function (err, db) {
	if (err) {
		console.log("== Unable to make connection to MongoDB Database.")
		throw err;
	}
else {
  mongoDB= db;
  test=1;
  console.log(mongoDB);
  }
	app.listen(port, function () {
		console.log("== Listening on port", port);
	});
});
*/
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
  res.render('index-page', {
    pageTitle: 'Welcome!'
  });

});

app.get('/instructions', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(instructionsHTML);
    res.end();
    collection = mongoDB.collection('web_dev');
    collection.insert({second:200});

    //console.log(collection.find({}).toArray);
  //  console.log(collection);
});

app.get('*', function(req, res) {
  res.writeHead(404, {"Content-Type": "text/html"});
  res.write(errorHTML);
  res.end();
});

function sendClearTime(endTimeInt) {

	console.log("Here is where '" + endTimeInt + "' will be sent to the database." );

}


