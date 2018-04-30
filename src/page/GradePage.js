import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'

var sem = [{semester:null,year:null,subjectList:[]}];
var subjList = [{subjID:null,subjName:null,credit:null,grade:null}]


export default class GradePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
								<td>2110324</td>
								<td>System Analysis and Design</td>
								<td>3</td>
								<td>A</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>



		);
	}
}