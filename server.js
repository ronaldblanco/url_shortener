var port = process.env.PORT || 5000 || 8080;//FOR HEROKU port Asignation
var express = require('express');
//var url = require('url');
var app = express();

/*app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});*/

app.get('*', function (req, res) {
    
    //req info VAR
    //var myreq = req;
    var mydate = new Date();
    console.log(mydate+'-->Incoming Request!');
    var ipaddress = req.headers['x-forwarded-for'];
    var language = req.headers['accept-language'].toString().split(',')[0];
    var software = req.headers['user-agent'].toString().split(')')[0].split('(')[1];
    /*console.log(req.headers['x-forwarded-for']);
    console.log(req.headers['accept-language']);
    console.log(req.headers['user-agent']);*/
/*12.228.42.154
en-US,en;q=0.5
Mozilla/5.0 (Windows NT 6.1; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0*/

    //console.log(req.headers);
    /*var href = url.parse(req.url).href; //all GET
    var pahtname = url.parse(req.url).pahtname; //only path
    var query = url.parse(req.url).query; //only query
    var method = req.method;*/
    
    var myJson;
    myJson = JSON.stringify({
        "ipaddress": ipaddress,
        "language": language,
        "software": software
    });
    
    /*if(value == false){
        myJson = JSON.stringify({'unix': myDiff, 'natural': final});    
    }else{
        final = final[0] +' '+ final[1] +' '+ final[2] +', '+ final[3];
        myJson = JSON.stringify({'unix': parseInt(myDiff), 'natural': final});
        //var myJson = JSON.stringify({'unix': myDiff, 'natural': final});
    }*/
    
   /* { //Example out!!
"ipaddress": "12.228.42.154",
"language": "en-US",
"software": "Windows NT 6.1; WOW64; rv:52.0"
}*/
    
  res.send(myJson);
  
});


app.listen(port, function () {
  console.log('Request Header Parser Api Server listening on port '+port+'!');
});



