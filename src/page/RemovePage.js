import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'

//จะเขียน function ดึงข้อมูลป่ะ

export default class RemovePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID : this.props.studentID,
			registSubj : [], //เป็นตัวเก็บวิชาที่เรียนไป แนะนำให้เก็บ isRemove : false ไปด้วย ไว้ดึงค่า
		}
	}

	// ไว้เสร็จละดึง comment ออก

	// toggleChange = () => {
 //    this.setState({
 //      isRemove: !this.state.isRemove,
 //    });

	render() {
		return (
			<div className = 'removeContainer'>
				<h1 className="head">ถอนรายวิชา</h1>
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
								<tr>
									<td>1</td>
									<td>2110318</td>
									<td>DIS SYS ESSEN</td>
									<td>1</td>
									<td><input type="checkbox"></input></td>
								</tr>
								<tr>
									<td>2</td>
									<td>2110332</td>
									<td>SYS ANALYSIS DSGN</td>
									<td>3</td>
									<td><input type="checkbox"></input></td>
								</tr>
								<tr>
									<td>3</td>
									<td>2110422</td>
									<td>DB MGT SYS DESIGN</td>
									<td>2</td>
									<td><input type="checkbox"></input></td>
								</tr>
								<tr>
									<td>4</td>
									<td>2110471</td>
									<td>COMP NETWORK I</td>
									<td>33</td>
									<td><input type="checkbox"></input></td>
								</tr>
						</tbody>
					</table>
				</div>
				<div><button type="button" className="button is-rounded is-danger">ยืนยัน</button></div>
			</div>



		);
	}
}