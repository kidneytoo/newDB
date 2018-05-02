var { con } = require('../server');

var CNameFromCID = function(req, resolve, reject){
  var subjID = req.body.subjectID;

  var sql = "SELECT cname FROM course WHERE cid='" + subjID + "'";
  console.log("SQL: " + sql);

  con.query(sql, function (err, result, field) {
    console.log("INNNNNNNN");
    if (err){
      reject(err);
    }
    if(result.length == 0){
      console.log("There is no this subject");
      reject ({"msg" : "There is no this subject"});
    }
    else{
      console.log(result[0].cname);
      console.log("success");
      resolve({  "msg" : "success" ,
                  "data" : result[0].cname
                });
    }
  });
}

var allSectionfromCID = function(req, resolve, reject){
  console.log("in request all section process");
  var subjID = req.body.subjectID;

  var sql = "SELECT sec_no FROM section WHERE cid='" + subjID + "'";
  console.log("SQL: " + sql);

  con.query(sql, function (err, result, field) {
    if (err){
      console.log("ERROR");
      reject(err);
    }
    console.log(result);
    if(result.length == 0){
      console.log("There is no this subject");
      resolve ({"msg" : "There is no this subject"});
    }
    else{
      console.log("success");
      resolve ({  "msg" : "success" ,
                  "data" : result
                });
    }

  });
}

var getFunction = {
  'CNameFromCID' : CNameFromCID,
  'allSectionfromCID' : allSectionfromCID
}

module.exports = getFunction ;
