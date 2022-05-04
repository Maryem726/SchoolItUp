const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require("body-parser");
const cors = require('cors');
const Teacher = require('./models/Teacher');
const jwt = require('jsonwebtoken');
require('dotenv/config')
const passport = require('passport');

//IMPORT ROUTES
const adminRoute = require('./routes/admin');
const teacherRoute = require('./routes/teacher');
const usersRoute = require('./routes/users');
const studentRoute = require('./routes/student');


//MIDDLEWARES
app.use(bodyParser.json());
app.use('/admin',adminRoute);
app.use('/teacher',teacherRoute);
app.use('/student',studentRoute);
app.use('/auth',usersRoute);
app.use(passport.initialize());

require('./Middlewares/passport')(passport);

//CONNECT TO DATABASE SCHOOLITUP
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log("CONNECTED TO DATABASE!!!");
});



//TEST ROOT URL
/* app.get('/', (req, res) => {
    res.send('HOME');
}) */




//LISTENING PORT
app.listen(3000);

