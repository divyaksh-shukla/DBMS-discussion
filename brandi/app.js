var express = require('express');
var routes = express.router();

var index = require('./routes/index.js');
var member = require('./routes/member.js');
var department = require('./routes/department.js');
var donation = require('./routes/donation.js');
var event = require('./routes/event.js');

app.use('/', index);
app.use('/member', member);
app.use('/department', department);
app.use('/donation', donation);
app.use('/event', event);
