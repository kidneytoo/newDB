import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'
import _ from 'lodash'
var axios = require('axios');

function getRegistData(studentID) {
	var sid = studentID;
	var regData;
	console.log("GetRegData");
	return new Promise( async (resolve, reject) => {
		await( async() => {
			regData = (await axios.post('http://localhost:8888/student/register/reqRegisteredData',{"sid" : sid})).data;
			console.log(regData);
		})();
		resolve("success")
	}).then(async(successMsg) => {
		console.log(regData);
		for(var i = 0; i < regData.length ; i++){
			console.log("IN foreach",regData[i].cname);
			var credit = (await axios.post('http://localhost:8888/student/register/reqCredit',{"cname" : regData[i].cname})).data[0].credit;
			console.log(credit);
			regData[i].credit = credit;
		}
		console.log(regData);
		return regData;
	})
}

export default class RegistResultPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: this.props.studentID
		}
		setTimeout(async () => {
			let response = await getRegistData(this.props.studentID);
			this.setState({
				registSubject: response
			})
		}, 0);
	}

	render() {
		return (
			<div className="registResultContainer">
				<h1 className="head">ผลการแสดงความจำนงลงทะเบียนเรียน</h1>
				<div className="registResultTable">
					<table>
						<thead>
							<td>ลำดับ</td>
							<td>รหัสวิชา</td>
							<td>ชื่อรายวิชา</td>
							<td>ตอนเรียน</td>
							<td>หน่วยกิต</td>
						</thead>
						<tbody>
							{_.get(this.state, 'registSubject', []).map((registSubj,idx) => (
								<tr>
									<td><h4>{idx+1}</h4></td>
									<td>{registSubj.cid}</td>
									<td>{registSubj.cname}</td>
									<td>{registSubj.sec_no.join()}</td>
									<td>{registSubj.credit}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>



		);
	}
}
