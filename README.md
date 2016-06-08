# Stream-recording
Repozitár pre nahrávanie audio streamu
Testovacia verzia

# Run with
```
node recording.js
```

# Used modules
```
fs
request
nconf
node-schedule
```

#Structure of config file
```
  "streamUrl":"http://radio9.sk", /*Url for stream recording*/
  "port":"8000",                  /*Port*/
  "path":"high.mp3",              /*Path to live stream*/
  "startDate":"2016-06-09",       /*Start date with this format*/
  "startTime":"00:20:00",         /*Start time with this format*/
  "timezoneShift":"+02:00",       /*Shitf of timezone to locale*/
  "duration":"60"                 /*in seconds*/
```
