var app = require('express')
var router = app.Router();
var { con } = require('../server');
var mysql = require('sync-mysql');
var getData = require('./getData');

var scon = new mysql({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'booboodb',
  port : '3306'
})

router.post('/register/checkPrerequisite', function(req, res){
  var cid = req.body.subjectID;
  var sid = req.body.sid;

})

router.post('/register/reqRegisteredData', function(req, res){
  var sid = req.body.sid;

  var preData ;
  var data;
  (async() => {
    var t = await(new Promise( async (resolve, reject) => {
      try{
      await (
          new Promise( async (resolve, reject) => {
            var sql = "SELECT cid,sec_no FROM reg_in WHERE req_status='Requested' AND sid='" + sid + "'";
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
  console.log(getData);
  const promise = new Promise((resolve, reject) => {
    getData.CNameFromCID(req, resolve, reject);
  });
  var data;
  promise.then(result => {
    data = result;
    console.log("DATAAAAAAAA");
    console.log(data);
    res.send(data);
  }).catch(err => {
    console.log("ERR:",err);
    res.send({
      'data' : err
    });
  });
})

router.post('/register/reqAllSection', function (req, res){
  const promise = new Promise((resolve, reject) => {
    getData.allSectionfromCID(req,resolve, reject);
  })
  promise.then(result => {
    console.log("student reqAllSection:",result);
    res.send(result);
  })
})

router.post('/register/checkRegSub', function (req, res){
  console.log("IN CHK REG SUBJ");
  var sid = req.body.studentID;
  var regSubj = req.body.registSubject; // {subjectID:registSubject_before[i].subjectID,section:sect}
  var approveSec = []
  var rejectSec = []
  var promises = []
  console.log("-> req",req);
  console.log("-> body",req.body);
  console.log("-> SID",sid);
  console.log("-> regSection",regSubj);
  for (var i = 0; i < regSubj.length ; i++) {
    console.log("I:",i);
    for(var j = 0; j < regSubj[i].section.length ; j++){
      console.log("J:",j);

      if(regSubj[i].section.length===1 && regSubj[i].section[0]=='-'){
        console.log("->INCASE");
        var aPromise = new Promise((resolve, reject) => {
          var msg = {
            'cid': regSubj[i].subjectID,
            'sec' : '-',
            'msg': 'All section(s) not found'
          }
          console.log("-> MSG:",msg);
          rejectSec.push(msg);
          resolve();
        })
        promises.push(aPromise);
      }

      else{
        ((i,j) => {
          try{
            var cid = regSubj[i].subjectID;
            var sec = regSubj[i].section[j];
            var aPromise = new Promise((resolve, reject) => {
              con.query("SET @msg = 10");
              con.query("CALL checkRegSub(?, ?, ?, @msg)", [sid,cid,sec]);
              con.query("SELECT @msg",function (err, result) {
                if (err) {
                  console.log("ERR: ",err);
                  reject(err);
                }
                console.log("Result: ",result[0]['@msg']);
                var msg = {
                  'cid' : cid,
                  'sec' : sec,
                  'msg' : result[0]['@msg']
                }
                if(msg['msg'] === 'request success'){
                  approveSec.push(msg);
                }
                else{
                  rejectSec.push(msg);
                }
                resolve(result);
                // res.json(result);
              })
            })
            aPromise.then();

            promises.push(aPromise);

          }catch(e){
            console.log("Storing ERROR: ",e);
          }

        })(i,j);
      }

    }
  }

  Promise.all(promises).then(() => {
    console.log("-> approveMSG",approveSec);
    console.log("-> rejectMSG",rejectSec);
    res.send({'approve':approveSec,'reject':rejectSec});
  })
})

router.post('/register/storeToRegIn', function (req, res){
  console.log("IN Reg_IN Storing process");

  var sid = req.body.studentID;
  var regSubj = req.body.filteredSubject; // {subjectID:registSubject_before[i].subjectID,section:sect}
  var probMsg = []
  var promises = []
  console.log("-> regSection",regSubj);
  for (var i = 0; i < regSubj.length ; i++) {
    for(var j = 0; j < regSubj[i].section.length ; j++){

      if(regSubj[i].section.length===1 && regSubj[i].section[0]=='-'){
        console.log("->INCASE");
        var aPromise = new Promise((resolve, reject) => {
          var msg = {
            'cid': regSubj[i].subjectID,
            'msg': 'section not found'
          }
          console.log("-> MSG:",msg);
          probMsg.push(msg);
          resolve();
        })

        promises.push(aPromise);
      }
      else{
        ((i,j) => {
          try{
            var cid = regSubj[i].subjectID;
            var sec = regSubj[i].section[j];
            var aPromise = new Promise((resolve, reject) => {
              con.query("SET @msg = 10");
              con.query("CALL regInSec(?, ?, ?, @msg)", [sid,cid,sec]);
              con.query("SELECT @msg",function (err, result) {
                if (err) {
                  console.log("ERR: ",err);
                  reject(err);
                }
                console.log("Result: ",result);
                console.log(result[0]['@msg']);
                var msg = {
                  'cid' : cid,
                  'msg' : result[0]['@msg']
                }
                probMsg.push(msg);
                resolve(result);
                // res.json(result);
              })
            })
            aPromise.then();

            promises.push(aPromise);

          }catch(e){
            console.log("Storing ERROR: ",e);
          }

        })(i,j);
      }
    }
  }

  Promise.all(promises).then(() => {
    console.log("-> probMSG",probMsg);
    res.send(probMsg);
  })

})

router.post('/view/registerdTable',function(req, res){
  console.log("In viewing register table");
})

module.exports = router ;
