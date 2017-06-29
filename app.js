var express = require('express');
var app = express();
var os = require('os');
var sleep = require('sleep');

var port = process.env.PORT || 9080;
var host = process.env.HOST || 'localhost';
var RUNNING = process.env.RUNNING || "";

app.get('/', function (req, res) {
  res.send('Hello world from ' + os.hostname() + " running in " + RUNNING + "\n");
});

app.get('/health', function (req, res) {
  res.status(200);
  res.type('application/json');
  res.send('Health looks good for: ' + os.hostname() + " running in " + RUNNING);
});

app.get('/hang60', function (req, res) {
  var keepGoing = function () {
    res.status(200);
    res.send('Done with the hold on instance: ' + os.hostname() + ' in the environment: ' + RUNNING + '\n');
  };
  sleep.sleep(60);
  keepGoing();
  //setTimeout(keepGoing, 60000);
});

var server = app.listen(port, function () {
//  var host = server.address().address;
  var port = server.address().port;

  console.log("Running in the env: " + RUNNING);
  console.log('Example app listening at http://%s:%s', host, port);
});
