const express = require('express');
const mysql = require('mysql');

const router = express.Router();
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

            res.send(rows);

        } else {
            console.log(err);
            res.send({
                "test": "values test"
            });
        }
    });
    // res.send("rows");
});

router.post('/sendotp', (req, res) => {

    res.send({
        "test": "values test"
    });

})
router.post('/retryotp', (req, res) => {

    res.send({
        "test": "values test"
    });

})

router.post('/verifyotp', (req, res) => {
    res.send({
        "test": "values test"
    });

})

router.get('/emp', (req, res) => {
    res.send({
        "test": "values test"
    });
});

router.get('/employee', (req, res) => {
    console.log("/employee")
    mysqlConn.query('select * from usersdb', (err, rows, fields) => {
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

router.get('/employee/:id', (req, res) => {
    mysqlConn.query('select * from ftable where id = ?', [req.params.id], (err, rows, fields) => {
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

router.post('/delemployee/:id', (req, res) => {
    mysqlConn.query('delete from employees where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            // res.send(rows);
            console.log('deleted');
        } else {
            console.log(err);
            res.send({
                "test": "values test"
            });
        }
    });
});

router.post('/employee', (req, res) => {
    let emp = req.body;
    res.send({
        "test": "values test"
    });
});

router.post('/newEmployee', (req, res) => {
    let emp = req.body;
    console.log(emp);

    let sql = "insert into usersdb (username,userid,phoneno) values(?,?,?);";
    mysqlConn.query(sql, [emp.username, emp.userid, emp.phoneno], (err, rows, fields) => {
        if (!err) {
            console.log(rows.insertId);
            res.send(rows);
        } else {
            console.log(err.sqlMessage);
            // console.log(err);
            res.send({
                "test": "values test"
            });
        }
    });
});

module.exports = router;