import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'
import Transcript from './Transcript'

var sem = [{semester:null,year:null,subjectList:[]}];
var subjList = [{subjID:null,subjName:null,credit:null,grade:null}]


export default class GradePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: this.props.studentID,
			allGrade: [],
			showTranscript: false,
		}
	}

	showTrans = (evt) => {
		this.setState({
			showTranscript: true,
		})
	}

	render() {
		return (
		this.state.showTranscript ? 
			<Transcript />


			:
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
							</tbody>
						</table>
					</div>
				</div>
					<div><button onClick = {this.showTrans} className="button is-danger is-rounded">ขอ Transcript</button></div>
			</div>
			
		);
	}
}