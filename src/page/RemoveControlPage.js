import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'
import Redirect from 'react-router-dom/Redirect'
import _ from 'lodash'

var axios = require('axios')

function getApproveSubj(studentID) {
	var sid = studentID;
	var regData;

	// console.log("GetRegData");

	return new Promise( async (resolve, reject) => {
		await( async() => {
			// console.log("Nottyking");
			regData = (await axios.post('http://localhost:8888/student/register/reqApproveSubj',{"sid" : sid})).data;
			// console.log("Mira");
			// console.log(regData);
		})();
		// console.log('passing');
		resolve("success")
	}).then(async(successMsg) => {
		console.log(regData);
		if(regData === "You do not have any approved course."){
			regData = [];
		}
		else{

			for(var i = 0 ; i < regData.length ; i++){
				// console.log("IN foreach",regData[i].cid);
				var cname = (await axios.post('http://localhost:8888/student/register/reqSubjectName',{"subjectID" : regData[i].cid})).data.data;
				// console.log(cname);
				console.log(sid);
				regData[i].studentID = sid;
				regData[i].subjectID = regData[i].cid;
				regData[i].subjectName = cname;
				regData[i].section = regData[i].sec_no;
				regData[i].isRemove = false;
				delete regData[i].cid;
				delete regData[i].sec_no;
				delete regData[i].sid;
				delete regData[i].req_status;
				delete regData[i].req_streak;
			}
		}
		// console.log(regData);
		return regData;
	})
}

export default class RemoveControlPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFinish : false,
			subject : [], //เป็นตัวเก็บวิชาที่เรียนไป แนะนำให้เก็บ isRemove : false ไปด้วย ไว้ดึงค่า
			isFind: false,
			studentData : {
				studentID: "",
				prefix: "",
				fname: "",
				lname: "",
			},
			subject: []
		}
		// setTimeout(async () => {
		// 	console.log("in");
		// 	let response = await getApproveSubj(this.props.studentID);
		// 	// console.log(response[0].subjectName);
		// 	this.setState({
		// 		subject: response
		// 	})
		// 	// console.log(this.state.deleteChangeSubject);
		// }, 0);
	}

	handleStudentIDchange = (evt) => {
		this.setState({ studentID: evt.target.value });
	}

	findStudent = async(evt) => {
		console.log("In findStudent");
		evt.preventDefault();

		var data = (await axios.post('http://localhost:8888/student/register/reqStudentData/', this.state)).data;
		console.log(data);
		if(data == "ID incorrect."){
			alert("ID incorrect");
		}
		else{
			console.log("ID correct:",data);
			let response = await getApproveSubj(this.state.studentID);
			this.setState({
				studentData : {
					studentID: this.state.studentID,
					prefix: data.prefix,
					fname: data.fname,
					lname: data.lname,
				},
				subject: response,
				isFind: true
			})
			if(response.length==0){
				alert("นิสิตคนนี้ไม่มีวิชาเรียนในระบบ")
			}
			console.log(this.state.studentData);

		}
	}

	handleRemove = (idx) => (evt) => {
		const newRemoveSubject = this.state.subject.map((remSubj,sidx) => {
			if (idx !== sidx) return remSubj;
			return {... remSubj, isRemove: !remSubj.isRemove};
		});

		this.setState({subject: newRemoveSubject});
	}

	submitRemove = async(evt) => {
		evt.preventDefault();
		var confirm = window.confirm("ยืนยันการถอน?");
		if(confirm == true) {
			//จัดการกับ Database ตรงนี้แหละ
			var subject = this.state.subject;

			for(var i = 0 ; i < subject.length ; i++){
				var sid = subject[i].studentID;
				var cid = subject[i].subjectID;
				var cname = subject[i].subjectName;
				var sec = subject[i].section;
				var isRemove = subject[i].isRemove;

				if(isRemove){
					var msg = (await axios.post('http://localhost:8888/student/register/withdrawOutTime',{"subject" : subject[i]}))
					console.log(msg);
				}
			}

			alert("การถอนเสร็จสิ้น");
			this.setState({isFinish: true});
		}
	}

	render() {
		if(this.state.isFinish) {
			return(
				<Redirect to='/Main' />
			)
		}

		return(
			<div className="removeControlContainer">
				<h1 className="head">ถอนรายวิชาให้นิสิต</h1>
				<form onSubmit={this.findStudent}>
					<div className="searchToRemove">
						<input value={this.state.studentID} onChange={this.handleStudentIDchange} type="text" className="input is-rounded is-small" placeholder="รหัสนิสิต"></input>
						<input value="ค้นหา" type="submit" className="button is-small is-rounded is-danger"></input>
					</div>
				</form>
				<div>
					<div className="nisit"><p>{this.state.studentData.prefix} {this.state.studentData.fname} {this.state.studentData.lname}	{this.state.studentData.studentID}</p></div>
					<form onSubmit={this.submitRemove}>
						<div className="removeControlTable">
							<table>
								<thead>
									<td>ลำดับ</td>
									<td>รหัสวิชา</td>
									<td>ชื่อวิชา</td>
									<td>ตอนเรียน</td>
									<td>ถอนรายวิชา</td>
								</thead>
								<tbody>
								{_.get(this.state, 'subject',[]).map((remSubj,idx) => (
									<tr>
										<td>{idx+1}</td>
										<td>{remSubj.subjectID}</td>
										<td>{remSubj.subjectName}</td>
										<td>{remSubj.section}</td>
										<td><input type="checkbox" checked={remSubj.isRemove} onChange={this.handleRemove(idx)}></input></td>
									</tr>
								))}
								</tbody>
							</table>
						</div>
						<div><button className="button is-rounded is-small is-danger">ยืนยัน</button></div>
					</form>
				</div>
			</div>

		);
	}
}
