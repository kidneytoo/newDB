import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'

var axios = require('axios')

// tuition: response.tuition, //ไว้ดึงจาก DB Generate ค่าเทอม
// isPaid: response.isPaid, //ถ้าไม่มีก็จีจี
// sem: response.sem,				//ดึง DB
// year: response.year,			//ดึง DB
// department: response.department,	//ดึง DB
// faculty: response.faculty,		//ดึง DB

function getTuitionData(studentID) {
	var sid = studentID;
	var regData = {};

	// console.log("GetRegData");

	return new Promise( async (resolve, reject) => {
		await( async() => {
			console.log("Nottyking");
			regData = (await axios.post('http://localhost:8888/student/register/reqTuitionData',{"sid" : sid})).data;
			console.log("Mira");
			console.log(regData);
		})();
		// console.log('passing');
		resolve("success")
	}).then(async(successMsg) => {
		console.log(regData);

		// console.log(regData);
		return regData;
	})
}

export default class TuitionPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: this.props.studentID,
			tuition: null, //ไว้ดึงจาก DB Generate ค่าเทอม
			isPaid: false, //ถ้าไม่มีก็จีจี
			sem: 1,				//ดึง DB
			year: 2560,			//ดึง DB
			department: null,	//ดึง DB
			faculty: null,		//ดึง DB
		}
		setTimeout(async () => {
			console.log("in");
			let response = await getTuitionData(this.props.studentID);
			console.log(response[0]);
			this.setState({
				tuition: response.tuition, //ไว้ดึงจาก DB Generate ค่าเทอม
				isPaid: response.isPaid, //ถ้าไม่มีก็จีจี
				sem: response.sem,				//ดึง DB
				year: response.year,			//ดึง DB
				department: response.department,	//ดึง DB
				faculty: response.faculty,		//ดึง DB
			})
			console.log(this.state);
		}, 0);
	}

	render() {
		const paid = this.state.isPaid ? "ชำระแล้ว" : "ยังไม่ชำระ";
		const semester = ['ภาคการศึกษาต้น','ภาคการศึกษาปลาย','ภาคฤดูร้อน'];

		return (
			<div className="tuitionContainer">
				<h1 className="head">คำนวณค่าลงทะเบียนเรียน</h1>
				<div className="tuition">
					<h4>ค่าลงทะเบียนเรียน {semester[this.state.sem]} ปีการศึกษา {this.state.year}</h4>
					<h6>{this.state.department} {this.state.faculty}</h6>
					<div className="tuitionFee">
						<p>{this.state.tuition} บาท</p>
					</div>
					<div className="tuitionStatus">
						<p>สถานะ : <span style={this.state.isPaid ? {color: 'limegreen'} : {color: 'red'}}>{paid}</span></p>
					</div>
				</div>
			</div>



		);
	}
}
