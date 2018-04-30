import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'

var addSubj = [{subjectID:'',sectionf:null,oper:"only",sectionl:null}];

export default class AddDeletePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: this.props.studentID,
			addSubject: {subjID:null,sectionf:null,oper:null,sectionl:null},
			// isDelete: false,
			// isChange: false,
		}
	}

	handleAddRegistSubject = () => {
    this.setState({
      registSubject: this.state.registSubject.concat([{subjectID:'',sectionf:null,oper:"only",sectionl:null}])
    });
  	}

  	// handleDelete = (evt) => {
  	// 	this.setState({isDelete: !this.state.isDelete});
  	// }

  	// handleChange = (evt) => {
  	// 	this.setState({isChange: !this.state.isChange});
  	// }

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
										<td>2110318</td>
										<td>DIS SYS ESSEN</td>
										<td>1</td>
										<td>
											<input checked={this.state.isChange} onChange={this.handleChange} disabled type="checkbox"></input>
											<input className="input is-rounded is-small sectionf" type="text" pattern="[0-9]*" disabled={!this.state.isChange}required></input>
										</td>
										<td><input checked={this.state.isDelete} onChange={this.handleDelete} disabled={this.state.isChange} type="checkbox"></input></td>
									</tr>
									<tr>
										<td>2</td>
									<td>2110332</td>
									<td>SYS ANALYSIS DSGN</td>
									<td>3</td>
										<td>
											<input checked={this.state.isChange} onChange={this.handleChange} disabled={this.state.isDelete}type="checkbox"></input>
											<input className="input is-rounded is-small sectionf" type="text" pattern="[0-9]*" required></input>
										</td>
										<td><input checked={this.state.isDelete} onChange={this.handleDelete} disabled type="checkbox"></input></td>
									</tr>
									<tr>
										<td>3</td>
									<td>2110422</td>
									<td>DB MGT SYS DESIGN</td>
									<td>2</td>
										<td>
											<input checked={this.state.isChange} onChange={this.handleChange} disabled={this.state.isDelete}type="checkbox"></input>
											<input className="input is-rounded is-small sectionf" type="text" pattern="[0-9]*" disabled={!this.state.isChange}required></input>
										</td>
										<td><input checked={this.state.isDelete} onChange={this.handleDelete} disabled={this.state.isChange} type="checkbox"></input></td>
									</tr>
									<tr>
										<td>4</td>
									<td>2110471</td>
									<td>COMP NETWORK I</td>
									<td>33</td>
										<td>
											<input checked={this.state.isChange} onChange={this.handleChange} disabled={this.state.isDelete}type="checkbox"></input>
											<input className="input is-rounded is-small sectionf" type="text" pattern="[0-9]*" disabled={!this.state.isChange}required></input>
										</td>
										<td><input checked={this.state.isDelete} onChange={this.handleDelete} disabled={this.state.isChange} type="checkbox"></input></td>
									</tr>
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
							<div class="submitButton2"><input type="submit" value="เพิ่มรายวิชา" className="button is-rounded is-success eiei"></input></div>
							</form>
						</div>
					</div>
			</div>



		);
	}
}