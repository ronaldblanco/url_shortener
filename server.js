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

app.get('/new/*', function (req, res) {
    
    //req info VAR
    var href = url.parse(req.url).href; //all GET
    //var pahtname = url.parse(req.url).pahtname; //only path
    //var query = url.parse(req.url).query; //only query
    //var method = req.method;
    //Loging Activity
    var mydate = new Date();
    console.log(mydate+'-->SHORTENER CREATION!');
    console.log(href.toString());
    console.log(href.toString().split('/')[2]+'//'+href.toString().split('/')[href.toString().split('/').length - 1]);
    //res.redirect(href.toString().split('/')[2]+'//'+href.toString().split('/')[4]);//OK READY
    
    //Checking URL
    var input = href.toString().split('/');
    /*console.log('input->'+input);
    console.log('input 2->'+input[2]);
    console.log('input last->'+input[input.length - 1]);*/
    var final = '';
    var check = input[2]+'//'+input[input.length - 1];
    //console.log('1->'+check);
    check = check.match("^(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]");
    //console.log('2->'+check);
    if(check != null)final = check[0];
    else final = check;
    
    //Preparing json
    var myJson;
    //myJson = JSON.stringify({
    myJson ={
        'new_id': randomIdGenerator(3),// 3 dijits
        'org_url': final
    };
    
    /*function callback(res){
        
    }*/
    
    if(check != null){//if the url is valid
    mongo.connect(mongourl+dbname,function(err,db){
        if(err)throw err;
        var collection = db.collection('shortener');
        //var add = undefined;

        //if(add === true && add != undefined){
            collection.insert(myJson,function(err,data){
                if(err)throw err;
                console.log(data);
                res.send({'shortened_URL':req.protocol + '://' + req.get('host') + '/' + myJson.new_id});
                db.close;
            });
        //} 
        
    });
    }else{
        res.send({'err':'URL not valid'});
    }

});

app.get('/checkurl/*', function (req, res) {
    
    var href = url.parse(req.url).href; //all GET
    var input = href.toString().split('/');
    /*console.log('input->'+input);
    console.log('input 2->'+input[2]);
    console.log('input last->'+input[input.length - 1]);*/
    var final = '';
    var check = input[2]+'//'+input[input.length - 1];
    //var final = '';
    check = check.match("^(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]");
    //console.log('2->'+check);
    if(check != null)final = check[0];
    else final = check;
    
    if(check != null){//if the url is valid
    mongo.connect(mongourl+dbname,function(err,db){
        if(err)throw err;
        var collection = db.collection('shortener');
        
        collection.find({
            org_url: final
        }).toArray(function(err,doc){
            console.log('err->'+err);
            console.log('doc->'+doc);
            //if(doc != []){
                //console.log('Exist->'+doc[0].org_url);
                //add = false;
                //res.send({'shortened_URL':req.protocol + '://' + req.get('host') + '/' + doc[0].new_id});
                res.send({'docs':doc});
            //}else res.send({'shortened_URL':'NO DOC.'});
            //res.redirect(doc[0].org_url);//OK READY
        });

       db.close; 
    })
        
        
    }
    
    
});

app.get('/checkshort/*', function (req, res) {
    
    var href = url.parse(req.url).href; //all GET
    console.log(href.toString());
    var id = href.toString().split('/')[2];
    
    mongo.connect(mongourl+dbname,function(err,db){
        if(err)throw err;
        var collection = db.collection('shortener');
        
        collection.find({
            new_id: id
        }).toArray(function(err,doc){
            if(err)throw err;
            console.log(doc);
            res.send({'doc':doc});
            //res.redirect(doc[0].org_url);//OK READY
        })
        db.close();
    })
    
});

app.get('*', function (req, res) {
    
    var href = url.parse(req.url).href; //all GET
    console.log(href.toString());
    var id = href.toString().split('/')[1];
    
    mongo.connect(mongourl+dbname,function(err,db){
        if(err)throw err;
        var collection = db.collection('shortener');
        
        collection.find({
            new_id: id
        }).toArray(function(err,doc){
            if(err)throw err;
            console.log(doc);
            //res.send(doc);
            res.redirect(doc[0].org_url);//OK READY
        })
        db.close();
    })
    
});

app.listen(port, function () {
  console.log('URL Shortener Api Server listening on port '+port+'!');
});



