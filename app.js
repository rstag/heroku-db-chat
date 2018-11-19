const mysql = require('mysql');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));
const port = process.env.PORT || 3000;

const mysqlConn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
});

mysqlConn.connect((err) => {
    if (err) {
        console.log("err" + JSON.stringify(err, undefined, 2));

    } else {
        console.log("connected db");

    }
})

app.use('register',require('./routes/register'))

app.listen(port, () =>
    console.log(`server started on port ${port}!`)
);