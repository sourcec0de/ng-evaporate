'use strict';

var algorithm      = 'sha1';
var encoding       = 'base64';
var express        = require('express');
var createHmac     = require('./lib/createHmac');
var aws_secret_key = process.env.AWS_SECRET_KEY;
var port           = process.env.PORT || 3001;
var app            = express();

app.set('view engine','jade');
app.set('views',__dirname + '/views');
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
    res.render('index',{
        aws_bucket: process.env.AWS_BUCKET,
        aws_access_key: process.env.AWS_ACCESS_KEY
    });
});

app.get('/auth_upload', function (req, res) {
    var to_sign = req.param('to_sign');

    if (typeof to_sign !== 'string') {
        return res.send(400,'to_sign must be a string');
    }

    return res.send(createHmac(
        to_sign,
        aws_secret_key,
        algorithm,
        encoding
    ));
});

app.listen(port, function(){
    console.log('server listening on port %d',port);
});