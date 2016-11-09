var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var CONTACTS_COLLECTION = "Phones"; // Your collection name on Mongo database here
var app = express();
app.use(express.static(__dirname + "/"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// Creating variable that defines Database address and credentials

var connectionString = 'Your-MongoDB-credentials-and-address-here';

//Create database variable that can be used later
var db;

//Database connection
mongodb.MongoClient.connect(connectionString, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = database;
  console.log("Database connection ready");

// Define it to use 8080 port
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

//Error handler
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

//Route to get phones from Mongo-database
app.get("/phones", function(req, res) {
  db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, phones) {
    if (err) {
      handleError(res, err.message, "Failed to get phones.");
    } else {
      res.status(200).json(phones);  
      res.sendFile(__dirname + '/index.html');
    }
  });
});

app.post('/phones', (req, res) => {
  db.collection(CONTACTS_COLLECTION).save(req.body, (err, phones) => {
    if (err) return console.log(err)
else{
    console.log('saved to database')
    res.redirect('back');
    }
  });
});
