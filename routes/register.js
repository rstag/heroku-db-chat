const express = require('express');
const mysql = require('mysql');

const SendOtp = require('sendotp');

const sendOtp = new SendOtp('225381A8G6vDBo5b44d0ff');

// const sendOtp = new SendOtp(process.env.SENDOTP);

const router = express.Router();
// const mysqlConn = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     multipleStatements: true
// });

const mysqlConn = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12265630',
    password: 'N2v67jMxDA',
    database: 'sql12265630',
    multipleStatements: true
});



mysqlConn.connect((err) => {
    if (err) {
        console.log("err" + JSON.stringify(err, undefined, 2));

    } else {
        console.log("connected db");

    }
})


router.get('/', (req, res) => {
    mysqlConn.query('select * from ftable', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send({
                "test": "values test"
            });
        }
    });
});

router.post('/sendotp', (req, res) => {
    let user = req.body;
    console.log(user)
    sendOtp.send(user.phoneNo, "rstag008", function (error, data) {
        console.log(data);
        res.send(data);
    });
})
router.post('/retryotp', (req, res) => {
    let user = req.body;

    sendOtp.retry(user.phoneNo, false, function (error, data) {
        console.log(data);
        res.send(data);
    });
})

router.post('/verifyotp', (req, res) => {
    let user = req.body;
    sendOtp.verify(user.phoneNo, user.otp, function (error, data) {
        console.log(data);
        if (data.type == 'success') console.log('OTP verified successfully')
        if (data.type == 'error') console.log('OTP verification failed')
        res.send(data);
    });
})


router.get('/employee', (req, res) => {
    console.log("/empl")
    mysqlConn.query('select * from ftable', (err, rows, fields) => {
        if (!err) {
            res.send(rows);

        } else {
            console.log(err);
            res.redirect('/');
        }
    });
});


module.exports = router;