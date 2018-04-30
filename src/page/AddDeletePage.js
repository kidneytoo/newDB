import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'
import $ from 'jquery'
import _ from 'lodash'

var deleteChangeSubj = [{subjectID:'',subjectName:'',section:'',isChange:false,changeSection:'',isDelete:false,}];

export default class AddDeletePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: this.props.studentID,
			addSubject: {subjectID:'',sectionf:null,oper:"only",sectionl:null},
			deleteChangeSubject: [], //ดึงข้อมูลจาก DB มีตัวแปรข้างในเหมือน deleteChangeSubj
		}
	}

	handleAddSubjectChange =(evt) => {
		this.setState({addSubject : {subjectID : evt.target.value}});
	}

	handleSectionfChange =(evt) => {
		this.setState({addSubject : {sectionf : evt.target.value}});
	}

	handleOperChange =(evt) => {
		this.setState({addSubject : {oper : evt.target.value}});
	}

	handleSectionlChange =(evt) => {
		this.setState({addSubject : {sectionl : evt.target.value}});
	}

	handleDelete = (idx) => (evt) => {
		const newDeleteChangeSubject = this.state.deleteChangeSubject.map((delChange,sidx) => {
			if (idx !== sidx) return delChange;
			return {... delChange, isDelete: !delChange.isDelete};
		});

		this.setState({deleteChangeSubject: newDeleteChangeSubject});
	}

  	handleChange = (idx) => (evt) => {
		const newDeleteChangeSubject = this.state.deleteChangeSubject.map((delChange,sidx) => {
			if (idx !== sidx) return delChange;
			return {... delChange, isChange: !delChange.isChange};
		});

		this.setState({deleteChangeSubject: newDeleteChangeSubject});
	}

	handleSectionChange = (idx) => (evt) => {
		const newDeleteChangeSubject = this.state.deleteChangeSubject.map((delChange,sidx) => {
			if (idx !== sidx) return delChange;
			return {... delChange, changeSection: !delChange.changeSection};
		});

		this.setState({deleteChangeSubject: newDeleteChangeSubject});
	}

	render() {
		return (
			<div className="addDeleteContainer">
				<h1 className="head">เพิ่ม/ลด รายวิชา</h1>
					<h4>ลดรายวิชาและเปลี่ยนตอนเรียน</h4>
					<div className="deleteContainer">
						<div className="deleteTable">
							<form>
							<table>
								<thead>
									<td>ลำดับ</td>
									<td>รหัสวิชา</td>
									<td>ชื่อวิชา</td>
									<td>ตอนเรียน</td>
									<td>เปลี่ยนตอนเรียน</td>
									<td>ลดรายวิชา</td>
								</thead>
								<tbody>
									{_.get(this.state, 'deleteChangeSubject',[]).map((delChangeSubj,idx) => (
									<tr>
										<td>{idx+1}</td>
										<td>{delChangeSubj.subjectID}</td>
										<td>{delChangeSubj.subjectName}</td>
										<td>{delChangeSubj.section}</td>
										<td>
											<input checked={delChangeSubj.isChange} onChange={this.handleChange} disabled type="checkbox" disabled={delChangeSubj.isDelete}></input>
											<input className="input is-rounded is-small" type="text" pattern="[0-9]*" disabled={!delChangeSubj.isChange} value={delChangeSubj.changeSection} onChange={this.handleSectionChange} required></input>
										</td>
										<td><input checked={delChangeSubj.isDelete} onChange={this.handleDelete} disabled={delChangeSubj.isChange} type="checkbox"></input></td>
									</tr>
									))}
								</tbody>
							</table>
							<div class="submitButton2"><input type="submit" value="ยืนยัน" className="button is-rounded is-danger eiei"></input></div>
							</form>
						</div>
					</div>
					<h4>เพิ่มรายวิชา</h4>
					<div className="addContainer">
						<div className="addTable">
							<form>
							<table>
								<thead>
									<td>รหัสวิชา</td>
									<td>ตอนเรียน</td>
								</thead>
								<tbody>
									<td>
										<input value={this.state.addSubject.subjectID} onChange={this.handleAddSubjectChange} className="input is-rounded is-small" type="text" pattern="[0-9]*" required></input>
									</td>
									<td>
										<input value={this.state.addSubject.sectionf} onChange={this.handleSectionfChange} disabled = {this.state.addSubject.oper === "all"} className="input is-rounded is-small sectionf" type="text" pattern="[0-9]*" required></input>
											<select name="choice" id='choice' onChange={this.handleOperChange} value={this.state.addSubject.oper}>
												<option value="only">เท่านั้น</option>
												<option value="or">หรือ</option>
												<option value="to">ถึง</option>
												<option value="all">ทั้งหมด</option>
											</select>
										<input value={this.state.addSubject.sectionl} onChange={this.handleSectionlChange} disabled = {this.state.addSubject.oper === "only" || this.state.addSubject.oper === "all"} className="input is-rounded is-small sectionl" type="text" pattern="[0-9]*" required></input>
									</td>
								</tbody>
							</table>
							<div class="submitButton2"><input type="submit" value="เพิ่มรายวิชา" className="button is-rounded is-success eiei"></input></div>
							</form>
						</div>
					</div>
			</div>



		);
	}
}