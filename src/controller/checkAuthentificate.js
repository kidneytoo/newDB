var express = require('express');
var router = express.Router();
var { con } = require('../server');

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.post('/student', function (req, res){
  console.log("INNNN");
  var studentID = req.body.studentID;
  var password = req.body.password;
  console.log('checkAuthentificate ' + studentID + " " + password);
  var sql = "SELECT sid,pwd FROM student WHERE sid='" + studentID + "' AND pwd = '" + password + "'";
  console.log("SQL: " + sql);

  con.query(sql, function (err, result, field) {
    if (err){
      console.log("ERROR");
      throw err;
    }
    console.log(result);
    if(result.length == 0){
      res.send("Incorrect username or password");
    }
    else if(result.length == 1){
      res.send("Login successful");
    }
    else{
      res.send("Have problem : There are several ID same as this.")
    }

  });
})

module.exports = router ;
