import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'
import Redirect from 'react-router-dom/Redirect'
import $ from 'jquery'
import _ from 'lodash'

//Format ที่จะเก็บใน state subject
var subj = [{subjectID:'',subjectName:'',section:'',isRemove:false}]

export default class RemovePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFinish : false,
			studentID : this.props.studentID,
			subject : [], //เป็นตัวเก็บวิชาที่เรียนไป แนะนำให้เก็บ isRemove : false ไปด้วย ไว้ดึงค่า
		}
	}

	handleRemove = (idx) => (evt) => {
		const newRemoveSubject = this.state.subject.map((remSubj,sidx) => {
			if (idx !== sidx) return remSubj;
			return {... remSubj, isRemove: !remSubj.isRemove};
		});

		this.setState({subject: newRemoveSubject});
	}

	submitRemove = (evt) => {
		evt.preventDefault();
		var confirm = window.confirm("ยืนยันการถอน?");
		if(confirm == true) {
			//จัดการกับ Database ตรงนี้แหละ
			alert("การถอนเสร็จสิ้น");
			this.setState({isFinish: true});
		}
	}

	render() {
		if(this.state.isFinish) {
			return(
				<Redirect to='/Main' />
			)
		}


		return (
			<div className = 'removeContainer'>
				<h1 className="head">ถอนรายวิชา</h1>
				<form onSubmit={this.submitRemove}>
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
							{_.get(this.state, 'subject',[]).map((remSubj,idx) => (
								<tr>
									<td>{idx+1}</td>
									<td>{remSubj.subjectID}</td>
									<td>{remSubj.subjectName}</td>
									<td>{remSubj.section}</td>
									<td><input type="checkbox" checked={remSubj.isRemove} onChange={this.handleRemove}></input></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div><input type="submit" value="ยืนยัน" className="button is-rounded is-danger"></input></div>
				</form>
			</div>



		);
	}
}