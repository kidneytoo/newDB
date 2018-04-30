var axios = require('axios');

var filterSection = function(regSubj,studentID){
	console.log("CALLLLL");
	var registSubject_before = regSubj;
	var registSubject_after = [];

	return new Promise(async (resolve, reject) => {
		for (var i = 0; i < registSubject_before.length ; i++) {
			console.log("come");

			// add existing subject's section to sectionExisting

			await(async (i) => {
				try{
					var subjectID = registSubject_before[i].subjectID;
					var oper = registSubject_before[i].oper;
					var sectionf = parseInt(registSubject_before[i].sectionf);
					var sectionl = parseInt(registSubject_before[i].sectionl);
					var sectionExisting;
					var sect = [];
					var subjName = (await axios.post('http://localhost:8888/student/register/reqSubjectName', {"subjectID":subjectID})).data.data; //ชื่อวิชา
					console.log("subjName");
					console.log(subjName);
					// console.log(subjName.data);

					var response = await axios.post('http://localhost:8888/student/register/reqAllSection', {"subjectID":subjectID}); // เรียก all section

					console.log('req_allSection success - data:');
					console.log(response);
					sectionExisting = response.data.data ;
					console.log(sectionExisting);
					console.log(response.data.msg);

					var checkSec = (section) => {
						return sectionExisting.reduce((acc, it) => {
							if(it.sec_no == section) return true;
							return acc;
						}, false)
					};

					if(oper == "only" && checkSec(sectionf)) {
						sect.push(sectionf);
					}
					else if(oper == "or") {
						if(checkSec(sectionf))
							sect.push(sectionf);
						if(checkSec(sectionl))
							sect.push(sectionl);
					}
					else if(oper == "to") {
						for(var j = sectionf ; j <= sectionl ; j++) {
							if(checkSec(j))
								sect.push(j)
						}
					}
					else if(oper == 'all'){
						sectionExisting.forEach((secObj) => {
							sect.push(secObj.sec_no);
						})
					}

					console.log(sect);
					if(sect.length===0){
						sect.push('-')
					}
					registSubject_after.push({subjectID:subjectID,section:sect,subjectName:subjName});

				} catch(e){
					console.log("Catch in reqAllSection")
				}
			})(i);
		}
		resolve("success");
	}).then((successMsg) => {
		console.log(registSubject_after);
		return registSubject_after;
	})

	//ถ้าเช็คว่ามี Section อะไรบ้างจาก Database ได้จ
}

var tools = {
  'filterSection' : filterSection
}

export default tools;
