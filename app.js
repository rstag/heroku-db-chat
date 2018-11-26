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


// app.use(require('./routes/register'));
app.use('/reg', require('./routes/register'));
app.use('/user', require('./routes/users'));
app.use('/msg', require('./routes/messages'));
app.get('/', (req, res) => {

    
    res.send({
        "test": "values test"
    });
});
app.listen(port, () =>
    console.log(`server started on port ${port}!`)
);