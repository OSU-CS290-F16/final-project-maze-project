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
var errorHTML= fs.readFileSync(staticDir + '/public'+'/404.html','utf8');
var instructionsHTML= fs.readFileSync(staticDir +'/public'+ '/instructions.html','utf8');

// Maze.js will use these varaibles to update
var endTime;
var endTimeInt;

// Some stuff from class examples
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();


var mongoHost = "classmongo.engr.oregonstate.edu"
var mongoPort = 27017;
var mongoUser = "cs290_bolanosf";
var mongoPassword = "M8N5RfRs6M5wQ7x";
var mongoDBName = "cs290_bolanosf";
var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;
var mongoDB;


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

// Parse all request bodies as JSON.
app.use(bodyParser.json());

// Serve static files from public/.
app.use(express.static(path.join(__dirname, 'public')));

// Render the index page for the root URL path ('/').
app.get('/', function (req, res) {
  res.render('index-page', {
    pageTitle: 'Welcome!'
  });
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



/*


http.createServer(function (req, res){
    if(req.url.indexOf('Easy') !=-1 || req.url=='/'){
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(indexHTML);
      res.end();
    }

    else if (req.url.indexOf('style.css') != -1){
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(styleCSS);
        res.end();
    }

    else if (req.url.indexOf('style2.css') != -1){
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(styleCSS2);
        res.end();
    }

    else if (req.url.indexOf('maze.js') != -1){
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(mazeJS);
        res.end();
    }

    else if(req.url.indexOf('Medium') != -1){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(indexMedHTML);
        res.end();
    }

    else if(req.url.indexOf('Hard') != -1){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(indexHardHTML);
        res.end();
    }

    else if(req.url.indexOf('instructions') != -1){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(instructionsHTML);
        res.end();
    }

    else {
        res.writeHead(404, {"Content-Type": "text/html"});
        res.write(errorHTML);
        res.end();
    }

});
//.listen(port);
*/


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

