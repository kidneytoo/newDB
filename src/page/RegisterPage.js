import React, { Component } from 'react'
import Redirect from 'react-router-dom/Redirect'
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Cookies from 'universal-cookie';
var tools = require('../utilityFunction');
var axios = require('axios');

const cookies = new Cookies();
var registSj = [{subjectID:'',sectionf:null,oper:"only",sectionl:null}];

export default class RegisterPage extends React.Component {
	constructor(props) {
		super(props);
		// cookies.set('isSubmit', true, { path: '/' });
		this.state = {
			studentID: this.props.studentID,
			registSubject: registSj,
			isSubmit: false,
			isRegist: false,
		};
		// console.log(this.state.isSubmit);
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

  	handleSubmit = async(evt) => {

			evt.preventDefault();

			var filterSection = async function(regSubj,studentID){
				console.log("CALLLLL");
				var registSubject_before = regSubj;
				var registSubject_after = [];
				var promises = []
				return new Promise(async (resolve, reject) => {
					for (var i = 0; i < registSubject_before.length ; i++) {
						console.log("come");

						// add existing subject's section to sectionExisting
						var aPromise = new Promise((resolve, reject) => {
							(async (i) => {
								try{
									var subjectID = registSubject_before[i].subjectID;
									var oper = registSubject_before[i].oper;
									var sectionf = parseInt(registSubject_before[i].sectionf);
									var sectionl = parseInt(registSubject_before[i].sectionl);
									var sectionExisting;
									var sect = [];

									var subjNamet = (axios.post('http://localhost:8888/student/register/reqSubjectName', {"subjectID":subjectID})); //ชื่อวิชา
									subjNamet.then((result) => {
										console.log(result);
										var subjName = result.data.data;
										console.log("subjName",subjName);

										var responset = (axios.post('http://localhost:8888/student/register/reqAllSection', {"subjectID":subjectID})); // เรียก all section
										responset.then((result) => {
											var response = result.data;
											console.log('req_allSection success - data:');
											console.log(response);
											sectionExisting = response.data;
											console.log(sectionExisting);

											var checkSec = (section) => {
												return sectionExisting.reduce((acc, it) => {
													if(it.sec_no == section) return true;
													return acc;
												}, false)
											};

											if(oper == "only" && checkSec(sectionf)) {
												sect.push(sectionf);
											}
											else if(oper == "or") {
												if(checkSec(sectionf))
												sect.push(sectionf);
												if(checkSec(sectionl))
												sect.push(sectionl);
											}
											else if(oper == "to") {
												for(var j = sectionf ; j <= sectionl ; j++) {
													if(checkSec(j))
													sect.push(j)
												}
											}
											else if(oper == 'all'){
												sectionExisting.forEach((secObj) => {
													sect.push(secObj.sec_no);
												})
											}

											console.log(sect);
											if(sect.length===0){
												sect.push('-')
											}
											console.log("ADD REgist");
											registSubject_after.push({subjectID:subjectID,section:sect,subjectName:subjName});
											resolve();
										})

										})

								} catch(e){
									console.log("Catch in reqAllSection:",e)
									resolve();
								}
							})(i);
						})
						promises.push(aPromise);
					}
					Promise.all(promises).then(() => {
						resolve("success");
					})
				}).then((successMsg) => {
					console.log(registSubject_after);
					return registSubject_after;
				})

			}

			var getDetailSubj = async function(studentID,registSubject){

				console.log(studentID);
				console.log(registSubject);
				var sid = studentID;
				var registSj = registSubject;
				var tmp;

				return new Promise(async (resolve, reject) => {

					console.log(sid,registSj);

					tmp = (await axios.post('http://localhost:8888/student/register/checkRegSub', {"registSubject":registSj,"studentID":sid})).data;
					resolve("pass");
				}).then((result) => {
					console.log(tmp);
					return tmp;
				})
			}

			var sectionFilter = filterSection(this.state.registSubject,this.state.studentID);
			sectionFilter.then((result) => {
				console.log(result);
				var detailSubj = getDetailSubj(this.state.studentID,result);
				detailSubj.then((result) => {
					console.log(result);

					if(result.reject.length !== 0){
						alert("There are problem about your register course");
					}
					else{
			    	this.setState({
			    		isSubmit: true,
							detailSect: result
							// [{
							//  approve : {cid:"012345" , sec:1 ,  msg:"request success"} ,
							//  reject : {cid:"012345" , sec:2 , msg:"there is no course"} 
						  // }]
			    	});
						// console.log(this.state.detailSect);
					}

				})
			})
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
					<h1>{this.state.studentID}</h1>
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
					<div class="submitButton"><input type="submit" value="ยืนยัน" className="button is-rounded is-danger" ></input></div>
				</form>
			}
			</div>

		);
	}
}
