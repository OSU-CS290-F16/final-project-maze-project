var path = require('path');
var http = require("http");
var fs = require('fs');

var staticDir = __dirname;
var port = process.env.PORT || 3000;

var indexHTML= fs.readFileSync(staticDir + '/index.html','utf8');
var indexMedHTML= fs.readFileSync(staticDir + '/indexMEDIUM.html','utf8');
var indexHardHTML= fs.readFileSync(staticDir + '/indexHARD.html','utf8');
var instructionsHTML= fs.readFileSync(staticDir + '/instructions.html','utf8');
var errorHTML= fs.readFileSync(staticDir + '/404.html','utf8');
var styleCSS= fs.readFileSync(staticDir + '/style.css','utf8');
var styleCSS2= fs.readFileSync(staticDir + '/style2.css','utf8');

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

}).listen(port);
console.log("==listening on port",port);
