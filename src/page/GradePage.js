import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'
import Transcript from './Transcript'
import _ from 'lodash'

var axios = require('axios')

var sem = [{semester:null,year:null,subjectList:[]}];
var subjList = [{subjID:null,subjName:null,credit:null,grade:null}]

function getRegistData(studentID) {
	var sid = studentID;
	var data = [];
	console.log("GetRegData");
	return new Promise( async (resolve, reject) => {
		var regData;
		await( async() => {
			regData = (await axios.post('http://localhost:8888/student/register/reqGrade',{"sid" : sid})).data;
			console.log(regData);
		})();
		resolve(regData)
	}).then(async(regData) => {
		console.log(regData);
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

export default class GradePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: this.props.studentID,
			allGrade: [],
			showTranscript: false,
		}
		setTimeout(async () => {
			let response = await getRegistData(this.props.studentID);
			console.log(response);
			this.setState({
				sem: response
			})
		}, 0);
	}

	showTrans = (evt) => {
		this.setState({
			showTranscript: true,
		})
	}

	render() {
		return (
		this.state.showTranscript ?
			<Transcript studentID={this.state.studentID}/>


			:
			<div className="gradeContainer">
				<h1 className="head">ผลการเรียน</h1>
				<div className="forLoop">
				{_.get(this.state, 'sem', []).map((sem,idx) => (
					<tr>
						<h4>ภาคการศึกษา{sem.semester} ปีการศึกษา {sem.year}</h4>
						<div className="gradeTableContainer">
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
					<div><button onClick = {this.showTrans} className="button is-danger is-rounded">ขอ Transcript</button></div>
			</div>

		);
	}
}
