import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'

var addSubj = [{subjectID:'',sectionf:null,oper:"only",sectionl:null}];

export default class AddDeletePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addSubject: {subjID:null,sectionf:null,oper:null,sectionl:null},
		}
	}

	handleAddRegistSubject = () => {
    this.setState({
      registSubject: this.state.registSubject.concat([{subjectID:'',sectionf:null,oper:"only",sectionl:null}])
    });
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
									<tr>
										<td>1</td>
										<td>2110324</td>
										<td>System Analysis and Design</td>
										<td>3</td>
										<td>
											<input type="checkbox"></input>
											<input className="input is-rounded is-small sectionf" type="text" pattern="[0-9]*" required></input>
										</td>
										<td><input type="checkbox"></input></td>
									</tr>
								</tbody>
							</table>
							<div class="submitButton"><input type="submit" value="ยืนยัน" className="button is-rounded is-danger"></input></div>
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
										<input value={this.state.addSubject.subjID} className="input is-rounded is-small" type="text" pattern="[0-9]*" required></input>
									</td>
									<td>
										<input value={this.state.addSubject.sectionf} disabled = {this.state.addSubject.oper === "all"} className="input is-rounded is-small sectionf" type="text" pattern="[0-9]*" required></input>
											<select name="choice" id='choice' value={this.state.addSubject.oper}>
												<option value="only">เท่านั้น</option>
												<option value="or">หรือ</option>
												<option value="to">ถึง</option>
												<option value="all">ทั้งหมด</option>
											</select>
										<input value={this.state.addSubject.sectionl} disabled = {this.state.addSubject.oper === "only" || this.state.addSubject.oper === "all"} className="input is-rounded is-small sectionl" type="text" pattern="[0-9]*" required></input>
									</td>
								</tbody>
							</table>
							<div class="submitButton"><input type="submit" value="เพิ่มรายวิชา" className="button is-rounded is-success"></input></div>
							</form>
						</div>
					</div>
			</div>



		);
	}
}