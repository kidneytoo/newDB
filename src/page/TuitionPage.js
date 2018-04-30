import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'

export default class TuitionPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: this.props.studentID,
			tuition: null, //ไว้ดึงจาก DB Generate ค่าเทอม
			isPaid: false, //ถ้าไม่มีก็จีจี
		}
	}

	render() {
		const paid = this.state.isPaid ? "ชำระแล้ว" : "ยังไม่ชำระ";

		return (
			<div className="tuitionContainer">
				<h1 className="head">คำนวณค่าลงทะเบียนเรียน</h1>
				<div className="tuition">
					<h4>ค่าลงทะเบียนเรียน ภาคการศึกษาต้น ปีการศึกษา 2560</h4>
					<h6>ภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์</h6>
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