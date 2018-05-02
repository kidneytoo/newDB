import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'
import Dog from './image/dog.png'
import _ from 'lodash'

var axios = require('axios')
var sem = [{semester:null,year:null,subjectList:[]}];

function getTranscript(studentID){
	var sid = studentID;
	var data = [];

	// console.log("GetRegData");

	return new Promise( async (resolve, reject) => {
		var regData;
		await( async() => {
			// console.log("Nottyking");
			console.log(sid);
			regData = (await axios.post('http://localhost:8888/student/register/reqTransc',{"sid" : sid})).data;
			// console.log("Mira");
			console.log(regData);
		})();
		// console.log('passing');

		resolve(regData)
	}).then(async(regData) => {

		if(regData.length == 0){
			console.log("ERROR");
			return "ERROR";
		}
		var year = regData[0].gyear;
		var sem = regData[0].gsem;
		var s = "";
		if(sem == 1){
			s = "ต้น"
		}
		else if(sem==2){
			s = "ปลาย"
		}
		else{
			s = "ฤดูร้อน"
		}
		var tmp = {
			semester: s,
			year: year,
			subjectList: []
		};
		var subL = []
		for(var i = 0; i < regData.length ; i++){
			var cname = (await axios.post('http://localhost:8888/student/register/reqSubjectName',{"subjectID" : regData[i].cid})).data.data;
			var credit = (await axios.post('http://localhost:8888/student/register/reqCredit',{"cname" : cname})).data[0].credit;
			console.log(cname);
			console.log(credit);
			var z = {
				subjID: regData[i].cid,
				subjName: cname,
				credit: credit,
				grade: regData[i].graded
			}
			if(regData[i].gyear != year || regData[i].gsem != sem){
				tmp.subjectList = subL;
				data.push(tmp);

				year = regData[i].gyear;
				sem = regData[i].gsem;
				if(sem == 1)	s = "ต้น"
				else if(sem==2)	s = "ปลาย"
				else s = "ฤดูร้อน"
				tmp = {
					semester: s,
					year: year,
					subjectList: []
				};
				subL = [];
				subL.push(z);
			}
			else {
				subL.push(z);
			}
			if(i == regData.length - 1){
				tmp.subjectList = subL;
				data.push(tmp);
			}
		}
		console.log(data);
		return data;
	})
}

function getDataName(studentID) {
	var sid = studentID;

	// console.log("GetRegData");

	return new Promise( async (resolve, reject) => {
		var regData;
		await( async() => {
			console.log("Nottyking");
			regData = (await axios.post('http://localhost:8888/student/register/getIdno',{"sid" : sid})).data;
			// console.log("Mira");
			// console.log(regData);
		})();
		// console.log('passing');
		resolve(regData)
	}).then(async(regData) => {
		console.log(regData);
		// console.log(regData);
		return regData;
	})
}

export default class Transcript extends Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: this.props.studentID,
		}
		setTimeout(async () => {
			console.log("in",this.props.studentID);
			let response = await getTranscript(this.props.studentID);
			let response2 = await getDataName(this.props.studentID);
			// console.log(response[0].subjectName);
			this.setState({
				data: response,
				prefix: response2.prefix,
				firstname: response2.fname,
				lastname: response2.lname
			})
			console.log(this.state.data);
		}, 0);
	}

	render() {
		return(
			<div className="transcriptContainer">
				<div className="transcript">
					<div className="topTranscript">
						<div className="logoTranscript">
							<img src={Dog} className='dogTc' />
							<h4>Chulalongkorn University</h4>
							<h6>Bangkok 10330</h6>
							<h6>Thailand</h6>
						</div>
						<div className="personalInfo">
							<p>รหัสนิสิต : {this.state.studentID}</p>
							<p>ชื่อ : {this.state.prefix}{this.state.firstname} {this.state.lastname}</p>
							<p>คณะ : วิศวกรรมศาสตร์</p>
							<p>ภาควิชา : วิศวกรรมคอมพิวเตอร์</p>
						</div>
					</div>
					<div className="middleTranscript">
						<div className="gradeTerm">

						{_.get(this.state, 'data', []).map((sem,idx) => (
							<tr>
								<h4>ภาคการศึกษา{sem.semester} ปีการศึกษา {sem.year}</h4>
								<div>
										<table>
											<thead>
												<td>รหัสวิชา</td>
												<td>ชื่อรายวิชา</td>
												<td>หน่วยกิต</td>
												<td>เกรด</td>
											</thead>
											<tbody>
											{_.get(sem, 'subjectList', []).map((subj,idx) => (
												<tr>
													<td>{subj.subjID}</td>
													<td>{subj.subjName}</td>
													<td>{subj.credit}</td>
													<td>{subj.grade}</td>
												</tr>
											))}
											</tbody>
										</table>
								</div>
							</tr>
						))}
				</div>
			</div>
			<div className="bottomTranscript">
						<div className="infoZone">
							<div className="gradeZone">
								<p>A : 4.00</p>
								<p>B+ : 3.50</p>
								<p>B : 3.00</p>
								<p>C+ : 2.50</p>
								<p>C : 2.00</p>
								<p>D+ : 1.50</p>
								<p>D : 1.00</p>
								<p>F : 0.00</p>
							</div>
							<div className="conditionZone">
							</div>
						</div>
					</div>
			</div>
			</div>
		);
	}
}
