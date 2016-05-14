var fs = require('fs');
var request = require('request');

var streamName = 'http://radio9.sk:8000/high.mp3';

console.log("Recording start...");
var requestStream = request(streamName, {timeout: 5000}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
	console.log("Record succesfull");
  }else{
	console.log("ERRORS:");
	console.log(error);
  }
}).pipe(fs.createWriteStream('stream.mp3'));


// ukoncenie spojenia v danom case podla configu
// toto treba dokoncit
console.log("Recoding close...");
setTimeout(function() {
console.log("Recoding is closed");

}, 3000);
//request.shouldKeepAlive = false;
//request.pause();
requestStream.abort();
response.status = 400;
response.end('upload limit exceeded');

