var express = require('express');
var mysql = require('mysql');
var promise_mysql = require('promise-mysql');
var bodyParser = require('body-parser');
var Promise = require('bluebird');

const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');

var app = express();

// Handling mysql using Promise
var connection = promise_mysql.createPool({
  host: "localhost",
  user: "divyaksh",
  password: "password",
  database: "ekkPahel"
});

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

  var flag = 1;
  var members, departments, donations, events, event_members;
  // Query to get latest added members
  connection.query('SELECT m.mname, d.dname FROM Members m, Department d WHERE d.dno=m.dno ORDER BY m.ssn DESC LIMIT 5;').then((rows) => {
  // connection.query('SELECT mname, ssn FROM Members ORDER BY ssn DESC LIMIT 5;').then((rows) => {

    // Members preview data
    console.log(JSON.stringify(rows));
    members = rows;
    flag += 1;

    // Query to get latest added departments
    return connection.query('SELECT d.dname, m.mname FROM Department d, Members m WHERE d.mgrssn=m.ssn ORDER BY d.dno ASC LIMIT 5;')
  }).then((rows) => {

    // Departments Preview data
    console.log(JSON.stringify(rows));
    departments = rows;
    flag += 1;

    // Query to get latest added donations
    return connection.query('SELECT donor_name, type FROM Donations ORDER BY receipt_no DESC LIMIT 5;')
  }).then((rows) => {

    // Donations Preview data
    console.log(JSON.stringify(rows));
    donations = rows;
    flag += 1;

    // Query to get latest added Events
    return connection.query('SELECT ename, location FROM Events ORDER BY eid DESC LIMIT 5;')

  }).then((rows) => {

    // Events Preview data
    console.log(JSON.stringify(rows));
    events = rows;
    flag += 1;

    // Query to get the event members
    return connection.query('SELECT ename, mname FROM Events e, Members m, Event_Members em where e.eid=em.eid and m.ssn=em.memssn LIMIT 5;')

    // res.render('index', {departments: departments, members: members, donations: donations, events: events});

  }).then((rows) => {

    // Event Members Preview data
    console.log(JSON.stringify(rows));
    event_members = rows;

    res.render('index', {departments: departments, members: members, donations: donations, events: events, event_members: event_members});
  });
});

app.get('/new_member', (req, res) => {
  res.render('new_member',{data: null, errors: null});
});

app.get('/remove_member', (req, res) => {
  res.render('remove_member');
});

app.post('/new_member_data',[
  check('member_name').isEmpty().isAlpha().trim(),
  check('joiningDate').isEmpty(),
  check('age').isEmpty().isInt().trim(),
  check('PhoneNo').isEmpty().isMobilePhone('any').trim(),
  check('EmailId').isEmpty().isEmail().trim(),
  check('position').isEmpty().isAlpha().trim(),
  check('dname').isEmpty().isAlpha().trim()
] , (req, res) => {

  var new_member_data = "'" + req.body.member_name + "'"
  + ',' + "'" + req.body.joiningDate + "'"
  + ',' + "'" + req.body.age + "'"
  + ',' + "'" + req.body.PhoneNo + "'"
  + ',' + "'" + req.body.EmailId + "'"
  + ',' + "'" + req.body.position + "'"
  + ',' + "'" + req.body.dname + "'" ;
  console.log(req.body);

  con.query('call insertNewMember (' + new_member_data + ');', function(err, result, fields) {
    if (err) {
      // Testing to send and handle errors in inserting the data
      console.log('SQL Error');
      // res.render('new_member', {data: req.body, errors: });
    }
    else {
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

app.post('')

app.listen(8080);
console.log("Server started on url: localhost:8080");
