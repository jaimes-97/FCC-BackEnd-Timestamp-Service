// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.json())

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date',(req,res)=>{
  var reqDate = req.params.date;

  if(!isNaN(reqDate)) reqDate = parseInt(reqDate);

  const date = reqDate ? new Date(reqDate): new Date()  ;

  if(date =="Invalid Date")  return res.json({error: "Invalid Date"})

  const unix = date.getTime();
  const utc = date.toUTCString();
  

res.json({unix, utc})
})


app.get('/api',(req,res)=>{
  var reqDate = req.params.date;

  var date = reqDate ? new Date(reqDate): new Date()  ;
  date = date.getTime() + 20000
  date  = new Date(date)
  const unix = date.getTime();
  const utc = date.toUTCString();
  

res.json({unix, utc})
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
