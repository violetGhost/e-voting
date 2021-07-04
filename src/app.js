const express = require('express');
const session = require('express-session');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const expressValidator = require('express-validator');
const md5 = require('md5');
const dbConn = require('./db/mongoose');

const app = express();
app.use(express.static('build'));
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.get('/', function(req, res) {
    res.json('Works!');
});

app.get('/api/main', function(req, res) {
    var usernames = []
    var final = []

    dbConn.query('SELECT * FROM user ORDER BY id',function(err,rows)     {

        for (i = 0; i < rows.length; i++){
            usernames[i] = rows[i].username ;
            final.push({
                'username': rows[i].username
            })
        }
        res.send(final);

    });

});

app.get('/api/electionName', function(req, res) {
    var electionNames = []
    var electionPositions = []
    var electionIds = []
    var final = []

    dbConn.query('SELECT * FROM election ORDER BY id desc',function(err,rows)     {

        for (i = 0; i < rows.length; i++){
            electionNames[i] = rows[i].election_name ;
            electionPositions[i] = rows[i].election_position;
            electionIds[i] = rows[i].election_id;
            final.push({
                'election_id': rows[i].election_id,
                'election_position': rows[i].election_position,
                'election_name': rows[i].election_name
            })
        }
        res.send(final);

    });

});

app.post('/api/electionName', async function(req, res) {

    let election_id = Math.floor(Math.random() * 100);
    let election_name = req.body.election_name;
    let election_position = req.body.election_position;
    //let election_password = md5(req.body.election_password);
    let error = false;

    var sql = "INSERT INTO election VALUES(0,'"+election_id+"','"+election_name+"','"+election_position+"','"+"password"+"','2021-05-13 19:57:24','2021-05-13 19:57:24')";
        dbConn.query(sql, function (err, result) {
            if (err) throw err;
                console.log("1 election inserted");
                res.json(result);
        });


});

app.post('/api/adminLogin', function(request, response) {

    var username = request.body.username;
    var password = request.body.password;
    
    if (username && password) {
        
        dbConn.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password],function(error, results, fields)     {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                console.log("success login yeheee " + results.length);
                response.send(username);
            } else {
                console.log("nahhhh ");
            }
        });


    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Server is up on port " + port)
});