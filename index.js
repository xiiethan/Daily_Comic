//require express
var express = require('express');
//reqiure body parser
var bodyParser = require('body-parser');
//Require node fetch
var fetch = require('node-fetch');
//create express object, call express
var app = express();
//get port info
const port = process.env.PORT || 3000;
//tell app to use EJS for templates
app.set('view engine', 'ejs');
//Make styles public
app.use(express.static("public"));
//tell app to use Body parser
app.use(bodyParser.urlencoded({ extended: true }));


// BODY
app.get('/', function (req, res) {
  res.render('Home', {});
});
app.get('/random', function (req, res) {
  res.render('Random', {});
});

app.get('/', function(req, res){
    fetch('http://xkcd.com/info.0.json')
    .then(res => res.json())
    .then(data => {
        res.render('/', {data:data})
    });
});

app.get('/random', function(req, res){
    let randomNumber = rand(1, 600);
    fetch('http://xkcd.com/'+randomNumber+'/info.0.json')
    .then(res => res.json())
    .then(data => {
        res.render('/random', {data:data})
    });
});

function rand(min, max) {
    let randomNum = Math.random() * (max - min) + min;
    return Math.round(randomNum);
}

//server setup
app.listen(port, function () {
    console.log('Listening on port ' + port)
});
