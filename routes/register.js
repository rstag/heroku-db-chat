
const express = require('express');
const mysql = require('mysql');

const SendOtp=require('sendotp');
const sendOtp = new SendOtp(process.env.SENDOTP);

const router=express.Router();
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


router.get('/', (req, res) => {
    mysqlConn.query('select * from ftable', (err, rows, fields) => {
        if (!err) {
            // res.header("Access-Control-Allow-Origin", "*");
            res.send(rows);

        } else {
            console.log(err);
            // res.redirect('/');
        }
    });
    // console.log("hello")
    // res.send("rows");
});

router.post('/sendotp',(req,res)=>{
    sendOtp.send("919029923008", "rstag008", function (error, data) {
        console.log(data);
      });
})
router.post('/retryotp',(req,res)=>{
    sendOtp.retry("919029923008", false, function (error, data) {
        console.log(data);
      });
})

router.post('/verifyotp',(req,res)=>{
    sendOtp.verify("919029923008", "1410", function (error, data) {
        console.log(data); 
        if(data.type == 'success') console.log('OTP verified successfully')
        if(data.type == 'error') console.log('OTP verification failed')
      });
})

router.get('/emp', (req, res) => {

    // res.send(arr);
    // console.log(arr[1].name);

});

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

router.get('/employee/:id', (req, res) => {
    mysqlConn.query('select * from ftable where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
            // console.log(rows[0].name);
        } else {
            console.log(err);
            // res.redirect('/');
        }
    });
});

router.post('/delemployee/:id', (req, res) => {
    mysqlConn.query('delete from employees where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            // res.send(rows);
            console.log('deleted');
            // console.log(rows[0].name);
        } else {
            console.log(err);
            // res.redirect('/');
        }
    });
});

router.post('/employee', (req, res) => {
    let emp = req.body;
   
});

router.post('/newEmployee', (req, res) => {
    let emp = req.body;
    console.log(emp);
    let sql = "insert into ftable values(?,?,?,?);";
    mysqlConn.query(sql, [emp.id, emp.name, emp.salery, emp.address], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.redirect('/');
        }
    });
    // res.redirect('/');
});

module.exports=router;