// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", function (request, response) {
  let date_string = new Date();
  if (request.params.date_string != undefined) {
    let test_string = request.params.date_string.toString();
    if (/^([0-9])+$/.test(test_string)) {
      date_string = new Date(+request.params.date_string);
    } else {
      date_string = new Date(request.params.date_string);
    };
  };
  if (date_string.toUTCString() === "Invalid Date") {
    response.json({"error" : "Invalid Date"});
  } else {
    response.json({"unix": date_string.getTime(), "utc": date_string.toUTCString()});
  };
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});