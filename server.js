var port = /*process.env.PORT || 5000 || */8080;//FOR HEROKU port Asignation
var express = require('express');
var mongo = require('mongodb').MongoClient;
var mongourl = "mongodb://localhost:27017/";
var dbname = "urlshortener";
var url = require('url');
var app = express();

var randomIdGenerator = require('random-id-generator');
//let defaultLengthId = randomIdGenerator();
//defaultLengthId 3KDl9x 
//default length is 6 

app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

//app.get('*', function (req, res) {
app.get('/new/*', function (req, res) {
    
    //req info VAR
    var href = url.parse(req.url).href; //all GET
    //var pahtname = url.parse(req.url).pahtname; //only path
    //var query = url.parse(req.url).query; //only query
    var method = req.method;
    console.log(href.toString().split('/'));
    console.log(href.toString().split('/')[2]+'//'+href.toString().split('/')[4]);
    //res.redirect(href.toString().split('/')[2]+'//'+href.toString().split('/')[4]);//OK READY
    
    var mydate = new Date();
    console.log(mydate+'-->Incoming Request!');
    /*var ipaddress = req.headers['x-forwarded-for'];
    var language = req.headers['accept-language'].toString().split(',')[0];
    var software = req.headers['user-agent'].toString().split(')')[0].split('(')[1];*/

    var myJson;
    //myJson = JSON.stringify({
    myJson ={
        'new_id': randomIdGenerator(3),// 3 dijits
        'org_url': href.toString().split('/')[2]+'//'+href.toString().split('/')[4]
    };
    
  res.send(myJson);
  
});

app.listen(port, function () {
  console.log('Request Header Parser Api Server listening on port '+port+'!');
});



