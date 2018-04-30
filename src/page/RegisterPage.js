import React, { Component } from 'react'
import Redirect from 'react-router-dom/Redirect'
import ReactDOM from 'react-dom';
import $ from 'jquery';

var registSj = [{subjectID:'',sectionf:null,oper:"only",sectionl:null}];

export default class RegisterPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: this.props.studentID,
			registSubject: registSj,
			isSubmit: false,
			isRegist: false,
		};
	}

	handleStudentIDchange = (evt) => {
		this.setState({ studentID: evt.target.value });
	}

	handleSubjectIDChange = (idx) => (evt) => {
    	const newRegistSubject = this.state.registSubject.map((subjID, sidx) => {
      		if (idx !== sidx) return subjID;
      		return { ...subjID, subjectID: evt.target.value };
    	});

    	this.setState({ registSubject: newRegistSubject });
  	}

  	handleOperChange = (idx) => (evt) => {
    	const newRegistSubject = this.state.registSubject.map((subjID, sidx) => {
      		if (idx !== sidx) return subjID;
      		return { ...subjID, oper: evt.target.value };
    	});

    	this.setState({ registSubject: newRegistSubject });
  	}

  	handleSectionfChange = (idx) => (evt) => {
    	const newRegistSubject = this.state.registSubject.map((subjID, sidx) => {
      		if (idx !== sidx) return subjID;
      		return { ...subjID, sectionf: evt.target.value };
    	});

    	this.setState({ registSubject: newRegistSubject });
  	}

  	handleSectionlChange = (idx) => (evt) => {
    	const newRegistSubject = this.state.registSubject.map((subjID, sidx) => {
      		if (idx !== sidx) return subjID;
      		return { ...subjID, sectionl: evt.target.value };
    	});

    	this.setState({ registSubject: newRegistSubject });
  	}

	handleAddRegistSubject = () => {
    this.setState({
      registSubject: this.state.registSubject.concat([{subjectID:'',sectionf:null,oper:"only",sectionl:null}])
    });
  	}

  	handleRemoveRegistSubject = (idx) => () => {
    this.setState({
      registSubject: this.state.registSubject.filter((s, sidx) => idx !== sidx)
    });
  	}

  	handleSubmit = (evt) => {
  		// $.post('http://localhost:8888/send', this.state , function(data , status){
			//   console.log('data: ' + data + ', status: ' + status);
			//   alert('From server => data: ' + data + ', status: ' + status);
			// });

    	registSj = this.state.registSubject;
    	this.setState({
    		isSubmit: true
    	});
  	}

  	comeBack = (evt) => {
  		this.setState({
    		isSubmit: false
    	});
  	}

  	setInit = () => {
		registSj = [{subjectID:'',sectionf:null,oper:"only",sectionl:null}];
  	}

  	goMain = (evt) => {
  		this.setState({isRegist: true});
  	}

	render() {
		if(this.state.isRegist) {
			return(
				<Redirect to='/Main' />
			)
		}

		return (
			<div className='registerContainer'>
				<h1 className="head">ลงทะเบียนปกติ</h1>
				{this.state.isSubmit ?
				<div>
					<h1>อิอิ</h1>
					<div>
					<button type="button" className="button is-danger is-rounded" onClick={this.comeBack}>ย้อนกลับ</button>
					<button type="button" className="button is-danger is-rounded" onClick={this.goMain}>ยืนยัน</button>
					</div>
				</div>
				:





				<form onSubmit={this.handleSubmit}>
					<div>
						<p>{this.state.studentID}</p>
					</div>
					<div className='registerFill'>
						<div className='registTable'>
							<table>
								<thead>
									<td>ลำดับ</td>
									<td>รหัสวิชา</td>
									<td>Section</td>
									<td></td>
								</thead>
								<tbody>
									{this.state.registSubject.map((registSubj,idx) => (
										<tr className = "trow">
											<td>
												<h4>{idx+1}</h4>
											</td>
											<td>
												<input value={registSubj.subjectID} onChange={this.handleSubjectIDChange(idx)} className="input is-rounded is-small" type="text" pattern="[0-9]*" required></input>
											</td>
											<td>
												<input value={registSubj.sectionf} onChange={this.handleSectionfChange(idx)} disabled = {registSubj.oper === "all"} className="input is-rounded is-small sectionf" type="text" pattern="[0-9]*" required></input>
												<select name="choice" id='choice' value={registSubj.oper} onChange={this.handleOperChange(idx)}>
													<option value="only">เท่านั้น</option>
													<option value="or">หรือ</option>
													<option value="to">ถึง</option>
													<option value="all">ทั้งหมด</option>
												</select>
												<input value={registSubj.sectionl} onChange={this.handleSectionlChange(idx)} disabled = {registSubj.oper === "only" || registSubj.oper === "all"} className="input is-rounded is-small sectionl" type="text" pattern="[0-9]*" required></input>
											</td>
											<td>
												<button type="button" disabled = {this.state.registSubject.length <= 1} onClick={this.handleRemoveRegistSubject(idx)} className="button is-danger is-rounded is-small">-</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<div><button type="button" disabled = {this.state.registSubject.length >=10} onClick={this.handleAddRegistSubject} className="button is-success is-rounded">+</button></div>
					<div class="submitButton"><input type="submit" value="ยืนยัน" className="button is-rounded is-danger"></input></div>
				</form>
			}
			</div>

		);
	}
}

