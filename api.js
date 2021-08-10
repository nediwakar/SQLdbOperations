var express = require('express');
var session = require('express-session');
var app = express();
let routes=require('./router1.js')
app.use('/NodeAPI', routes);
session.Phonenumber="9871570049";
var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);



