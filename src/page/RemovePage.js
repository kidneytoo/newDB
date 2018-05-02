import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'
import Redirect from 'react-router-dom/Redirect'
import $ from 'jquery'
import _ from 'lodash'

var axios = require('axios')

//Format ที่จะเก็บใน state subject
var subj = [{subjectID:'',subjectName:'',section:'',isRemove:false}]

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

export default class RemovePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFinish : false,
			studentID : this.props.studentID,
			subject : [], //เป็นตัวเก็บวิชาที่เรียนไป แนะนำให้เก็บ isRemove : false ไปด้วย ไว้ดึงค่า
		}
		setTimeout(async () => {
			console.log("in");
			let response = await getApproveSubj(this.props.studentID);
			// console.log(response[0].subjectName);
			this.setState({
				subject: response
			})
			// console.log(this.state.deleteChangeSubject);
		}, 0);
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


		return (
			<div className = 'removeContainer'>
				<h1 className="head">ถอนรายวิชา</h1>
				<form onSubmit={this.submitRemove}>
				<div className='removeTable'>
					<table>
						<thead>
							<td>ลำดับ</td>
							<td>รหัสวิชา</td>
							<td>ชื่อวิชา</td>
							<td>Section</td>
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
				<div><input type="submit" value="ยืนยัน" className="button is-rounded is-danger"></input></div>
				</form>
			</div>



		);
	}
}
