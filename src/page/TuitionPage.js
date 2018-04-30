import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'

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
	}

	render() {
		const paid = this.state.isPaid ? "ชำระแล้ว" : "ยังไม่ชำระ";
		const semester = ['ภาคการศึกษาต้น','ภาคการศึกษาปลาย','ภาคฤดูร้อน'];

		return (
			<div className="tuitionContainer">
				<h1 className="head">คำนวณค่าลงทะเบียนเรียน</h1>
				<div className="tuition">
					<h4>ค่าลงทะเบียนเรียน {semester[this.state.sem]} ปีการศึกษา {this.state.year}</h4>
					<h6>{this.state.department} {this.state.faculty}์</h6>
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