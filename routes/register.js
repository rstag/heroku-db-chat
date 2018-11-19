
const express = require('express');

const router=express.Router();


app.get('/', (req, res) => {
    mysqlConn.query('select * from ftable', (err, rows, fields) => {
        if (!err) {
            // res.header("Access-Control-Allow-Origin", "*");
            res.send(rows);

        } else {
            console.log(err);
            // res.redirect('/');
        }
    });

});

app.get('/emp', (req, res) => {

    // res.send(arr);
    // console.log(arr[1].name);

});

app.get('/employee', (req, res) => {
    mysqlConn.query('select * from ftable', (err, rows, fields) => {
        if (!err) {
            res.send(rows);

        } else {
            console.log(err);
            res.redirect('/');
        }
    });
});

app.get('/employee/:id', (req, res) => {
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

app.delete('/employee/:id', (req, res) => {
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

app.post('/employee', (req, res) => {
    let emp = req.body;
    // let sql="set @id = ?;set @name = ?;set @salery = ?;set @address = ?;call EmpAddEdit(@id,@name,@salery,@address);";
    // mysqlConn.query(sql,[emp.id,emp.name,emp.salery,emp.address], (err, rows, fields) => {
    //     if (!err) {
    //         res.send(rows);
    //         // console.log(rows[0].name);
    //     } else {
    //         console.log(err);
    //         // res.redirect('/');
    //     }
    // });
});

app.put('/employee', (req, res) => {
    let emp = req.body;
    // let sql="set @id = ?;set @name = ?;set @salery = ?;set @address = ?;call EmpAddEdit(@id,@name,@salery,@address);";
    // mysqlConn.query(sql,[emp.id,emp.name,emp.salery,emp.address], (err, rows, fields) => {
    //     if (!err) {
    //         res.send(rows);
    //         // console.log(rows[0].name);
    //     } else {
    //         console.log(err);
    //         // res.redirect('/');
    //     }
    // });
});

app.post('/newEmployee', (req, res) => {
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