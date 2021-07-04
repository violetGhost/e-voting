const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const expressValidator = require('express-validator');
const md5 = require('md5');
const dbConn = require('./db/mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.get('/', function(req, res) {
    res.json('Works!');
});

app.get('/api/electionName', function(req, res) {
    var electionNames = []
    var electionOrganizers = []
    var electionIds = []
    var final = []

    dbConn.query('SELECT * FROM electionlists ORDER BY id desc',function(err,rows)     {

        for (i = 0; i < rows.length; i++){
            electionNames[i] = rows[i].election_name ;
            electionOrganizers[i] = rows[i].election_organizer;
            electionIds[i] = rows[i].election_id;
            final.push({
                'election_id': rows[i].election_id,
                'election_organizer': rows[i].election_organizer,
                'election_name': rows[i].election_name
            })
        }
        res.send(final);

    });

});

app.post('/api/electionName', async function(req, res) {

    let election_id = Math.floor(Math.random() * 100);
    let election_name = req.body.election_name;
    let election_organizer = req.body.election_organizer;
    let election_password = md5(req.body.election_password);
    let error = false;

    var sql = "INSERT INTO electionlists VALUES(0,'"+election_id+"','"+election_name+"','"+election_organizer+"','"+election_password+"')";
        dbConn.query(sql, function (err, result) {
            if (err) throw err;
                console.log("1 election inserted");
                res.json(result);
        });


});

app.post('/api/adminLogin', async function(req, res) {
    admin.findOne({
        username: req.body.username,
        password: md5(req.body.password),
    }).then(election => {
        if(election === null){
            res.send(false);
        }else{
            res.send(true);
        }
    });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Server is up on port " + port)
});