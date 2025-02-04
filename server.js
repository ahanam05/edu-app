const express = require('express');
const connectToDb = require('./config/db');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

//define routes
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const schoolRouter = require('./routes/schools');
const studTeachers = require('./routes/studTeachers');
const studMaterial = require('./routes/studMaterial');
const teachTuitions = require('./routes/teachTuitions');
const teachMaterial = require('./routes/teachMaterial');

const app = express();

//set ejs as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//serve static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));

app.use('/', loginRouter);
app.use('/signup', signupRouter);
app.use('/schools', schoolRouter);
app.use('/studTeachers', studTeachers);
app.use('/studMaterial', studMaterial);
app.use('/teachTuitions', teachTuitions);
app.use('/teachMaterial', teachMaterial);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
    connectToDb();
})