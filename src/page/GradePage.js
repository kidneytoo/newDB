import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'

var sem = [{semester:null,year:null,subjectList:[]}];
var subjList = [{subjID:null,subjName:null,credit:null,grade:null}]


export default class GradePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: this.props.studentID,
			allGrade: [],
		}
	}

	render() {
		return (
			<div className="gradeContainer">
				<h1 className="head">ผลการเรียน</h1>
				<div className="forLoop">
					<h4>ภาคการศึกษาต้น ปีการศึกษา 2560</h4>
					<div className="gradeTableContainer">
						<table>
							<thead>
								<td>รหัสวิชา</td>
								<td>ชื่อรายวิชา</td>
								<td>หน่วยกิต</td>
								<td>เกรด</td>
							</thead>
							<tbody>
								<tr>
								<td>2110313</td>
								<td>OS SYS PROG</td>
								<td>3</td>
								<td>A</td>
								</tr>
								<tr>
								<td>2110316</td>
								<td>PROG LANG PRIN</td>
								<td>3</td>
								<td>B+</td>
								</tr>
								<tr>
								<td>2110327</td>
								<td>ALGORITHM DESIGN</td>
								<td>3</td>
								<td>C</td>
								</tr>
								<tr>
								<td>2110352</td>
								<td>COMP SYS ARCH</td>
								<td>3</td>
								<td>C+</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className="forLoop">
					<h4>ภาคการศึกษาปลาย ปีการศึกษา 2560</h4>
					<div className="gradeTableContainer">
						<table>
							<thead>
								<td>รหัสวิชา</td>
								<td>ชื่อรายวิชา</td>
								<td>หน่วยกิต</td>
								<td>เกรด</td>
							</thead>
							<tbody>
								<tr>
									<td>2110318</td>
									<td>DIS SYS ESSEN</td>
									<td>1</td>
									<td>A</td>
								</tr>
								<tr>
									<td>2110332</td>
									<td>SYS ANALYSIS DSGN</td>
									<td>3</td>
									<td>B+</td>
								</tr>
								<tr>
									<td>2110422</td>
									<td>DB MGT SYS DESIGN</td>
									<td>3</td>
									<td>X</td>
								</tr>
								<tr>
									<td>2110471</td>
									<td>COMP NETWORK I</td>
									<td>3</td>
									<td>X</td>
								</tr>
							</tbody>
						</table>
					</div>
					<button className="button is-danger is-rounded">ขอ Transcript</button>
				</div>
			</div>



		);
	}
}