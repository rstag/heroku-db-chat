// const mysql = require('mysql');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const arr = [{
    "id": 0,
    "name": "sdsad",
    "salery": "125",
    "address": "mumbai"
}, {
    "id": 1,
    "name": "rs",
    "salery": "33200",
    "address": "airoli"
}, {
    "id": 2,
    "name": "sdsad",
    "salery": "12005",
    "address": "mum"
}, {
    "id": 3,
    "name": "svs",
    "salery": "25000",
    "address": "thane"
}, {
    "id": 4,
    "name": "sdsad",
    "salery": "12005",
    "address": "mum"
}, {
    "id": 5,
    "name": "sdsad",
    "salery": "12005",
    "address": "cst"
}];

// const mysqlConn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'carsdb',
//     multipleStatements: true
// });

// mysqlConn.connect((err) => {
//     if (err) {
//         console.log("err" + JSON.stringify(err, undefined, 2));

//     } else {
//         console.log("connected db");

//     }
// })

app.get('/', (req, res) => {
    
    res.send(arr);
    console.log(arr[1].name);

});

app.get('/emp', (req, res) => {
    
            res.send(arr);
            console.log(arr[1].name);
        
});

app.get('/employee', (req, res) => {
    // mysqlConn.query('select * from employees', (err, rows, fields) => {
    //     if (!err) {
    //         res.send(rows);
    //         console.log(rows[0].name);
    //     } else {
    //         console.log(err);
    //         // res.redirect('/');
    //     }
    // });
});

app.get('/employee/:id', (req, res) => {
    // mysqlConn.query('select * from employees where id = ?',[req.params.id], (err, rows, fields) => {
    //     if (!err) {
    //         res.send(rows);
    //         // console.log(rows[0].name);
    //     } else {
    //         console.log(err);
    //         // res.redirect('/');
    //     }
    // });
});

app.delete('/employee/:id', (req, res) => {
//     mysqlConn.query('delete from employees where id = ?',[req.params.id], (err, rows, fields) => {
//         if (!err) {
//             // res.send(rows);
//             console.log('deleted');
//             // console.log(rows[0].name);
//         } else {
//             console.log(err);
//             // res.redirect('/');
//         }
//     });
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
    // let sql="insert into employees values(?,?,?,?);";
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

// app.listen('3000', () => console.log('server started'));
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
);