const express = require('express');
const connectToDb = require('./config/db');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
    connectToDb();
})