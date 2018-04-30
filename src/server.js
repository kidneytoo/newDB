// test node

const express = require('express');
var cors = require('cors');
const http = require('http');
var mysql = require('mysql');

var con = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'booboodb',
  port : '3306'
})
con.connect(function(err) {
  if (err) throw err;
  console.log("Database connected at 127.0.0.1:3306!");
});

module.exports = { "con": con };

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

var checkAuthentificate = require('./controller/checkAuthentificate');
var studentController = require('./controller/student');

app.use('/checkAuthentificate', checkAuthentificate);
app.use('/student' , studentController);

// receive information of register from client
// app.post('/send', function (req, res){
//   var data = req.body;
//   console.log('body ' + JSON.stringify(data));
//   res.end('body ' + JSON.stringify(req.body));
//   var sql = "INSERT INTO regjson (json) VALUES ('" + JSON.stringify(req.body) + "')";
//   console.log("SQL: " + sql);
//
//   con.query(sql, function (err, result) {
//     if (err){
//       console.log("ERROR");
//       throw err;
//     }
//     console.log("1 record inserted " + result);
//   });
// })

//app.get('/', (req ,res) => res.render('home'));

const server = http.createServer(app);

app.listen(8888, () => {
  console.log('Start server at port 8888.');
})
