import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'

export default class TuitionPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: this.props.studentID
		}
	}

	render() {
		return (
			<div className="tuitionContainer">
				<h1 className="head">คำนวณค่าลงทะเบียนเรียน</h1>
				<div className="tuition">
					<h4>ค่าลงทะเบียนเรียน ภาคการศึกษาต้น ปีการศึกษา 2560</h4>
					<h6>ภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์</h6>
					<div className="tuitionFee">
						<p>21,000 บาท</p>
					</div>
					<div className="tuitionStatus">
						<p>สถานะ : <span>ชำระแล้ว</span></p>
					</div>
				</div>
			</div>



		);
	}
}