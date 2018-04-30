// test node

const express = require('express');
var cors = require('cors');
const http = require('http');
var mysql = require('mysql');

var con = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : '',
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

var generateController = require('./controller/generate');
var checkAuthentificate = require('./controller/checkAuthentificate');
var studentController = require('./controller/student');

app.use('/generate', generateController);
app.use('/checkAuthentificate', checkAuthentificate);
app.use('/student' , studentController);

app.get('/', (req,res) => {
  var sql = "CREATE TABLE `bld_locates_in_fac2` (\
  `bld_id` int(11) NOT NULL,\
  `faculty_id` char(2) NOT NULL,\
  PRIMARY KEY (`bld_id`,`faculty_id`),\
  UNIQUE KEY `bld_id` (`bld_id`),\
  UNIQUE KEY `faculty_id` (`faculty_id`),\
  CONSTRAINT `locates_bld_fk2` FOREIGN KEY (`bld_id`) REFERENCES `building` (`bld_id`) ON DELETE CASCADE,\
  CONSTRAINT `locates_fac_fk2` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`) ON DELETE CASCADE\
)";
  con.query(sql, (err, result)=> {
    if(err){
      console.log('ERROR');
      throw err;
    }
    else {
      console.log('SUCCESS');
    }
  })
})

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
