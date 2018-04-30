var app = require('express')
var router = app.Router();
var { con } = require('../server');
var mysql = require('sync-mysql');

var scon = new mysql({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : '',
  port : '3306'
})

router.post('/register/reqRegisteredData', function(req, res){
  var sid = req.body.sid;

  var preData ;
  var data;
  (async() => {
    var t = await(new Promise( async (resolve, reject) => {
      // await( async() => {
      try{
      await (
          new Promise( async (resolve, reject) => {
            var sql = "SELECT cid,sec_no FROM reg_in WHERE status='registered' AND sid='" + sid + "'";
            console.log("SQL: " + sql);
            con.query(sql, function (err, result, field) {
              console.log("DATAAAAAA");
              if (err){
                console.log("ERROR");
                throw err;
              }
              console.log("RESULT");
              console.log(result);

              if(result.length == 0){
                console.log("There is no this subject");
                reject("ERROR in query");
              }
              else{
                preData = result;
                resolve("success");
              }
            })
          }).then((msg) => {
            console.log("PRE DATA");
            console.log(preData);
            var prevSubj = {"cid":'1' , "cname":'1' , 'sec_no':[]};
            data = [];

            var addData = (cid,sec_no) =>{
              prevSubj = {"cid":'1' , "cname":'1' , 'sec_no':[]};

              prevSubj.cid = cid;
              prevSubj.sec_no = [sec_no];

              var sql = "SELECT cname FROM course WHERE cid='" + cid + "'";
              console.log("SQL: " + sql);
                    var result = scon.query(sql);

                    if(result.length == 0){
                      console.log("There is no this subject");
                      throw err;
                    }
                    else{
                      console.log("add cname success");
                      prevSubj.cname = result[0].cname;
                    }
            };

            preData.forEach((datain, idx) => {
              if(idx==0){
                console.log("1");
                addData(datain.cid, datain.sec_no);
              }
              else if(datain.cid == prevSubj.cid){
                console.log("2");
                prevSubj.sec_no.push(datain.sec_no);
              }
              else{
                console.log("3");
                console.log(data);
                let t = prevSubj;
                data.push(t);
                console.log(data);
                addData(datain.cid, datain.sec_no);
                console.log(data);
              }
              if(idx == preData.length-1){
                let t = prevSubj;
                data.push(t);
              }
              console.log(data);
            })
            console.log("ForEach end - DaTa :");
            console.log(data);
          }).catch((e) => {
            console.log(e);
            throw e;
          })
      );
    }catch(e){
      console.log(e);
      throw e;
    }
      console.log("QUERY SUCCESS");
      resolve("QUERY SUCCESS");
    }).then((successMsg) => {
      console.log("DATA OUT");
      console.log(data);
      return data;
    }));
    await res.send(t);
  })();
})

router.post('/register/reqSubjectName', function (req, res){
  var subjID = req.body.subjectID;

  var sql = "SELECT cname FROM course WHERE cid='" + subjID + "'";
  console.log("SQL: " + sql);

  con.query(sql, function (err, result, field) {
    console.log("INNNNNNNN");
    if (err){
      console.log("ERROR");
      throw err;
    }
    if(result.length == 0){
      console.log("There is no this subject");
      res.send({"msg" : "There is no this subject"});
    }
    else{
      console.log(result[0].cname);
      console.log("success");
      res.send({  "msg" : "success" ,
                  "data" : result[0].cname
                });
    }
  });

})

router.post('/register/reqAllSection', function (req, res){
  console.log("in request all section process");
  var subjID = req.body.subjectID;

  var sql = "SELECT sec_no FROM section WHERE cid='" + subjID + "'";
  console.log("SQL: " + sql);

  con.query(sql, function (err, result, field) {
    if (err){
      console.log("ERROR");
      throw err;
    }
    console.log(result);
    if(result.length == 0){
      console.log("There is no this subject");
      res.send({"msg" : "There is no this subject"});
    }
    else{
      console.log("success");
      res.send({  "msg" : "success" ,
                  "data" : result
                });
    }

  });
})

router.post('/register/storeToRegIn', function (req, res){
  console.log("IN Reg_IN Storing process");

  var sid = req.body.studentID;
  var regSubj = req.body.registSubject; // {subjectID:registSubject_before[i].subjectID,section:sect}

  for (var i = 0; i < regSubj.length ; i++) {
    for(var j = 0; j < regSubj[i].section.length ; j++){
      console.log(j);

      (async (i,j) => {
        try{
          var sql = "INSERT INTO reg_in (sid, cid, sec_no, status, req_streak) VALUES ('" + sid + "', '" + regSubj[i].subjectID + "', '" + regSubj[i].section[j] + "', 'registered', '0')";
          console.log("SQL: " + sql);

          await con.query(sql, function (err, result, field) {
            if (err){
              console.log("Storing reg_in ERROR : Subject - " + regSubj[i].subjectID + ", section - " + regSubj[i].section[j]);
              throw err;
            }
            console.log("Storing reg_in successful : Subject - " + regSubj[i].subjectID + ", section - " + regSubj[i].section[j]);
          });

        }catch(e){
          console.log("Storing ERROR");
        }

      })(i,j);

    }
  }
})

router.post('/view/registerdTable',function(req, res){
  console.log("In viewing register table");
})

module.exports = router ;
