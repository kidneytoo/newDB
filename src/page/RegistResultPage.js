import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'

export default class RegistResultPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: this.props.studentID,
		}
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
							<tr>
									<td>1</td>
									<td>2110318</td>
									<td>DIS SYS ESSEN</td>
									<td>1</td>
									<td>1</td>
								</tr>
								<tr>
									<td>2</td>
									<td>2110332</td>
									<td>SYS ANALYSIS DSGN</td>
									<td>3</td>
									<td>3</td>
								</tr>
								<tr>
									<td>3</td>
									<td>2110422</td>
									<td>DB MGT SYS DESIGN</td>
									<td>2</td>
									<td>3</td>
								</tr>
								<tr>
									<td>4</td>
									<td>2110471</td>
									<td>COMP NETWORK I</td>
									<td>33</td>
									<td>3</td>
								</tr>
						</tbody>
					</table>
				</div>
			</div>



		);
	}
}