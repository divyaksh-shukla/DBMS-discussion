var express = require('express');
var mysql = require('mysql');

var app = express();

// Handling the mysql Database
var con = mysql.createConnection ( {
  host: "localhost",
  user: "divyaksh",
  password: "password",
  database: "ekkPahel"
});

con.connect( function (err) {
  if (err) throw err;
  console.log("Mysql Database Connected!")

  // con.query('call insertNewMember (' + new_member_data + ')', function(err, result, fields) {
  //   if (err) throw err;
  //   if (result[0].res === 0) {
  //     console.log("Some result error...");
  //   }
  //   else {
  //     // Implementation of the callback
  //     // Show a success message
  //
  //   }
  // });
});

// tell node where to look for site resources
app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/font'));

// tell node and configure express to read post data
app.use(express.bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', {});
});

app.get('/new_member', (req, res) => {
  res.render('new_member',{});
});

app.post('/new_member_data', (req, res) => {
  console.log(req);
});
app.listen(8080);
console.log("Server started on url: localhost:8080");
