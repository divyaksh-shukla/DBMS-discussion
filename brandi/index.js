var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

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
app.use(bodyParser.urlencoded({encoded: true}));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {


  res.render('index', {});
});

app.get('/new_member', (req, res) => {
  res.render('new_member',{});
});

app.post('/new_member_data', (req, res) => {

  var new_member_data = "'" + req.body.member_name + "'"
  + ',' + "'" + req.body.joiningDate + "'"
  + ',' + "'" + req.body.age + "'"
  + ',' + "'" + req.body.PhoneNo + "'"
  + ',' + "'" + req.body.EmailId + "'"
  + ',' + "'" + req.body.position + "'"
  + ',' + "'" + req.body.dname + "'" ;
  console.log(req.body.join_date);

  con.query('call insertNewMember (' + new_member_data + ');', function(err, result, fields) {
    if (err) throw err;
    else {
      console.log(new_member_data);
      console.log('inserted successfully');
      console.log(result[0]);

      res.redirect('/');
    }
  });
});
app.get('/assign-manager', (req, res) => {

  con.query('SELECT d.dno, m.mname, m.ssn FROM Department d, Members m WHERE mgrssn=ssn;', (err, result, field) => {
    if (err) throw err;
    else {
      // console.log(JSON.stringify(result));
      var managed_departments = result;
      con.query('SELECT * FROM Department;', (err, result, field) => {
        if (err) throw err;
          else {
          var departments = result;
          res.render('assign_manager', {departments: departments, managers: managed_departments});
          console.log("Department:");
          console.log(JSON.stringify(departments));
          console.log("Managers:");
          console.log(JSON.stringify(managed_departments));
        }
      });
    }
  });
});

app.get('/select_members', (req, res)=>{
  con.query('SELECT m.mname, d.dname FROM Members m, Department d WHERE d.dno=m.dno ORDER BY m.ssn DESC LIMIT 5;', (err, result, field)=> {
    res.send(JSON.stringify(result));
  });
});

app.get('/select_departments', (req, res) => {
  con.query('SELECT d.dname, m.mname FROM Department d, Members m WHERE d.mgrssn=m.ssn ORDER BY d.dno ASC LIMIT 5;', (err, result, field) => {
    res.send(JSON.stringify(result));
  });
});

app.get('/select_Donation', (req, res) => {
  con.query('SELECT donor_name, type FROM Donations ORDER BY receipt_no DESC LIMIT 5;', (err, result, field) => {
    res.send(JSON.stringify(result));
  });
});
// app.post('/get_departments', (req, res) => {
  //   con.query('SELECT dname FROM Department;', (err, result, field) => {
  //     if (err) throw err;
  //     else {
  //       var result_string = JSON.stringify(result);
  //       res.send(result_string);
  //       console.log(result_string);
  //     }
  //   });
  // });
app.listen(8080);
console.log("Server started on url: localhost:8080");
