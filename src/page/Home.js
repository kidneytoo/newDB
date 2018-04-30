import React, { Component } from 'react'
import dog from'./image/dog.png'
import $ from 'jquery'
import Redirect from 'react-router-dom/Redirect'

var studentLogin = '';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: '',
			password: '',
			person: 'student',
			isLogin: false,
		};
	}

	handleStudentIDchange = (evt) => {
		this.setState({ studentID: evt.target.value });
	}

	handlePasswordchange = (evt) => {
		this.setState({ password: evt.target.value });
	}

	handlePersonchange = (evt) => {
		this.setState({ person: evt.target.value });
	}

	checkAuthentificate = () => {
		console.log('hello')
		studentLogin = this.state.studentID;
		// alert('http://localhost:8888/checkAuthentificate/' + this.state.person);
		$.post('http://localhost:8888/checkAuthentificate/' + this.state.person, this.state , function(data , status){
			console.log('checkAunthentification data: ' + data + ', status: ' + status);
			alert(data);
			if(data == "Login successful"){

			}
			else if(data == "Incorrect username or password"){
				// do nothing - just alert
			}
		});

		this.setState({isLogin: true});

	}

	render() {
		if(this.state.isLogin) {
			this.props.handleLogin(this.state.studentID,this.state.password,this.state.person);
			return(
				<Redirect to='/Main' />
			)
		}

		return(
			<div className='loginContainer'>
				<div className='login2'>
					<img src={dog} className='dogLogin'/>
					<h1>BoobooDB</h1>
					<p>ระบบลงทะเบียนเรียนออนไลน์ของจุฬาฯ</p>
					<form onSubmit={this.checkAuthentificate}>
						<div className = 'loginLabel'>
							<label for="sid">รหัสประจำตัว</label>
							<input value={this.state.studentID} onChange={this.handleStudentIDchange} className="input is-rounded login" type="text" placeholder="10 หลัก" required></input>
						</div>
						<div className = 'loginLabel'>
							<label for="pass">รหัสผ่าน</label>
							<input value={this.state.password} onChange={this.handlePasswordchange} className="input is-rounded login" type="password" required></input>
						</div>
						<div className = "select is-rounded selectContainer">
							<select className = "personSelect" name="person" id='person' value={this.state.person} onChange={this.handlePersonchange}>
								<option value="student">นิสิต</option>
								<option value="staff">เจ้าหน้าที่</option>
							</select>
						</div>
						<div className="loginButton"><button className="button is-danger is-rounded" type="submit">เข้าสู่ระบบ</button></div>
					</form>
				</div>
			</div>
		);
	}
}