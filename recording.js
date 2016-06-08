var fs = require('fs');
var request = require('request');
var nconf = require('nconf');
var schedule = require('node-schedule');

nconf.argv()
	.file({ file: 'config.json' });

streamUrl = nconf.get('streamUrl');
port = nconf.get('port');
path = nconf.get('path');

startDate = nconf.get('startDate');
startTime = nconf.get('startTime');
timezoneShift = nconf.get('timezoneShift');

duration = nconf.get('duration') * 1000;

var start_td = new Date(startDate + "T" + startTime + timezoneShift);

//console.log("Waiting for recording in scheduled time (" + start_td + "-(" + start_td.getTime() + "))");
console.log("Waiting for recording in scheduled time (" + start_td.toString() + ")");

var job = schedule.scheduleJob(start_td, function(){
	var streamName = streamUrl + ":" + port + "/" + path;
	console.log("Recording start for: " + streamName);

	var requestStream = request(streamName, {timeout: 5000}, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
			console.log("Record succesfull");
	  }else{
			console.log("ERRORS:");
			console.log(error);
			/*try to repeat connection
				goes here
			*/
	  }
	});
	// pipe to file
	requestStream.pipe(fs.createWriteStream('stream' + start_td.getTime() + '.mp3'));

	// abort connection according to schedule in config
	setTimeout(function() {
		console.log('Recording stoped...');
		requestStream.abort();
	}, duration);
	job.cancel();
});
