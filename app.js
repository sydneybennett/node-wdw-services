
/**
 * Module dependencies.
 */

var express = require('express'),
    sqlite3 = require('sqlite3'),
    parks = require('./routes/parks'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    db = null;

//Export app so it is accessible for unit testing.
exports.app = app = express();

// Create application database if it does not exist.
fs.exists('./app.db', function (exists) {
    db = new sqlite3.Database('./app.db');

    if (!exists) {
        console.info('Creating database. This may take a while...');
        fs.readFile('app.sql', 'utf8', function (err, data) {
            if (err) throw err;
            db.exec(data, function (err) {
                if (err) throw err;
                console.info('Done.');
            });
        });
    }
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(function(req, res, next) {
    //Provide a reference to the database in the request for external route modules to use.
    req.db = db;
    next();
  });  
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/locations', parks.getLocations);
app.get('/locations/parks', parks.getParks);
app.get('/locations/parks/:parkPermalink', parks.getParkAttractions);
app.get('/locations/parks/:parkPermalink/:attractionPermalink', parks.getParkAttractionDetails);
app.post('/locations/parks/:parkPermalink/:attractionPermalink/comment', parks.setParkAttractionComment);

//Only run the server if this file is run directly. Lets us use test-helper for testing.
if (__filename == process.argv[1]) {
    http.createServer(app).listen(app.get('port'), function(){
      console.log("Express server listening on port " + app.get('port'));
    });
}