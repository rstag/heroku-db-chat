const express = require('express');
const mysql = require('mysql');
const crypto = require('crypto');

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

router.post('/findByuserid', (req, res) => {
    let emp = req.body;
    mysqlConn.query('select * from messagesdb where senderid = ? or receiverid=?', 
    [emp.userid,emp.userid], (err, rows, fields) => {
        if (!err) {
            res.send(rows);

        } else {
            console.log(err);
            res.send({
                "test": "values test"
            });

        }
    });

})

router.post('/findByphoneno', (req, res) => {
    let emp = req.body;
    mysqlConn.query('select * from usersdb where phoneno = ?', [emp.phoneno], (err, rows, fields) => {
        if (!err) {
            res.send(rows);

        } else {
            console.log(err);
            res.send({
                "test": "values test"
            });

        }
    });

})
// router.post('/findByuserid', (req, res) => {
//     let emp = req.body;
//     mysqlConn.query('select * from usersdb where userid = ?', [emp.userid], (err, rows, fields) => {
//         if (!err) {
//             res.send(rows);

//         } else {
//             console.log(err);
//             res.send({
//                 "test": "values test"
//             });

//         }
//     });

// })


router.get('/allMsgs', (req, res) => {
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


function findUserId(userid) {

    mysqlConn.query('select * from usersdb where userid = ?', [userid], (err, rows, fields) => {
        if (!err) {

            if (rows.length > 0)
                return rows[0].userid;
            return 0;
        } else {
            // console.log(err);
            return 0;
        }
    });
}

function random(howMany, chars) {
    chars = chars ||
        'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789';
    let rnd = crypto.randomBytes(howMany),
        value = new Array(howMany),
        len = Math.min(256, chars.length),
        d = 256 / len

    for (let i = 0; i < howMany; i++) {
        value[i] = chars[Math.floor(rnd[i] / d)]
    };

    return value.join('');
}

const findPhoneno = (phoneno) => new Promise((resolve, reject) => {
    setTimeout(() => {
        let pn;

        mysqlConn.query('select * from usersdb where phoneno = ?', [phoneno], (err, rows, fields) => {
            if (!err) {

                if (rows.length > 0) {
                    pn = rows[0].phoneno;
                }
                resolve(pn)
            } else {
                console.log(err);
                pn = err;
                //    return pn
            }
        });

    }, 3000)
})

router.post('/newMsg', (req, res) => {
    let emp = req.body;
    findPhoneno(emp.phoneno).then((butter) => {

        if (butter == emp.phoneno) {

            res.send({
                "test": "phone already exists"
            });
        } else {
            let t; {
                t = random(16);
                console.log(t);
            }
            while (t == findUserId(t));
            emp.userid = t;
// `senderid`, `receiverid`, `msgtxt`, `msgid`
            let sql = "insert into messagesdb (senderid,receiverid,msgtxt,msgid) values(?,?,?,?);";
            mysqlConn.query(sql, [emp.senderid, emp.msgid, emp.receiverid], (err, rows, fields) => {
                if (!err) {
                    console.log(rows.insertId);
                    rows.userid=emp.userid;
                    res.send(rows);
                } else {
                    console.log(err.sqlMessage);

                    res.send({
                        "test": "values test"
                    });
                }
            });
        }
        return butter;
    });
});

module.exports = router;