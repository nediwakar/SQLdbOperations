// Firstly we'll need to import the fs library
var fs = require("fs");

// next we'll want make our Logger object available
// to whatever file references it.
var Logger = (exports.Logger = {});
let ts = Date.now();
//var n = ts.toLocaleDateString();
// timestamp in milliseconds
var localDate = new Date(ts);
var date1=(localDate.getMonth()+1) + ''+localDate.getDate()+''+localDate.getFullYear();
console.log(date1);



// Create 3 sets of write streams for the 3 levels of logging we wish to do
// every time we get an error we'll append to our error streams, any debug message
// to our debug stream etc...
//var infoStream = fs.createWriteStream(`logs/success-${date1}-${phonenumber}.log`);
function infoStream(mssg,phonenumber)
{
    var sfileName= `logs/success-${date1}-${phonenumber}.log`;
    //if(sfileName) 
    var dfs=fs.createWriteStream(sfileName,{flags: 'a'});
    dfs.write(mssg);
}
// Notice we set the path of our log files in the first parameter of
// fs.createWriteStream. This could easily be pulled in from a config
// file if needed.
var errorStream = fs.createWriteStream("logs/errorlog.txt");
// createWriteStream takes in options as a second, optional parameter
// if you wanted to set the file encoding of your output file you could
// do so by setting it like so: ('logs/debug.txt' , { encoding : 'utf-8' });
var debugStream = fs.createWriteStream("logs/debug.txt");

// Finally we create 3 different functions
// each of which appends our given messages to
// their own log files along with the current date as an
// iso string and a \n newline character
Logger.info = function(msg,phonenumber) {
  var message = new Date().toISOString() + " : " + msg + "\n";
  //infoStream.write(message,phonenumber);
  infoStream(message,phonenumber);
};

Logger.debug = function(msg) {
  var message = new Date().toISOString() + " : " + msg + "\n";
  debugStream.write(message);
};

Logger.error = function(msg) {
  var message = new Date().toISOString() + " : " + msg + "\n";
  errorStream.write(message);
};