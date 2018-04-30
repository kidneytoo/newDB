import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'

export default class RegistControlPage extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		return(
			<div className="registControlContainer">
				<h1 className="head">การลงทะเบียน</h1>
				<div className="registControl">
				<h4>ลงทะเบียนเรียน(ปกติ)</h4>
				<label class="switch">
  					<input type="checkbox"></input>
  					<span class="slider round"></span>
				</label>
				</div>
				<div className="registControl">
				<h4>เพิ่มลดรายวิชา</h4>
				<label class="switch">
  					<input type="checkbox"></input>
  					<span class="slider round"></span>
				</label>
				</div>
				<div className="registControl">
				<h4>ถอนรายวิชา</h4>
				<label class="switch">
  					<input type="checkbox"></input>
  					<span class="slider round"></span>
				</label>
				</div>
				<div className="startRegistButton"><button className="button is-rounded is-danger">เริ่มระบบจัดนิสิตลงแต่ละวิชา</button></div>
			</div>
		);
	}
}