import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'
import RegisterPage from './RegisterPage'
import AddDeletePage from './AddDeletePage'
import RegistResultPage from './RegistResultPage'
import RemovePage from './RemovePage'
import GradePage from './GradePage'
import TuitionPage from './TuitionPage'
import Redirect from 'react-router-dom/Redirect'
import dog from './image/dog.png'

export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: this.props.studentID,
			prefix: 'นาย',
			firstname: 'เตชินท์',
			lastname: 'ศุภผล',
			person: this.props.person,
		};
	}

	goHome = () => {
		<Redirect to='/Main' />
	}

	render() {

		return(
			<div className="regAll">
				<div className="menuBar">
					<div className="header">
						<img src={dog} className='dogApp' onClick={this.goHome} />
						<h1>BooBooDB</h1>
						<p>ระบบลงทะเบียนเรียนออนไลน์ของจุฬาฯ</p>
						<p>{this.state.prefix} {this.state.firstname} {this.state.lastname}</p>
						<p>{this.state.studentID}</p>
					</div>
					<div className="menuButton">
					<aside className="menu">
  						<ul className="menu-list">
    						<li><NavLink to="/Main/Register" activeClassName="activeBar" className="pageButton">ลงทะเบียนเรียน</NavLink></li>
    						<li><NavLink to="/Main/AddDelete" activeClassName="activeBar" className="pageButton">เพิ่ม/ลด รายวิชา</NavLink></li>
    						<li><NavLink to="/Main/RegistResult" activeClassName="activeBar" className="pageButton">ผลการแสดงความจำนงลงทะเบียนเรียน</NavLink></li>
    						<li><NavLink to="/Main/Remove" activeClassName="activeBar" className="pageButton">ถอนรายวิชา</NavLink></li>
    						<li><NavLink to="/Main/Grade" activeClassName="activeBar" className="pageButton">ผลการเรียน</NavLink></li>
    						<li><NavLink to="/Main/Tuition" activeClassName="activeBar" className="pageButton">คำนวณค่าลงทะเบียนเรียน</NavLink></li>
  						</ul>
  						<ul className="menu-list">
  							<li><NavLink to="/" className="pageButton">ออกจากระบบ</NavLink></li>
  						</ul>

					</aside>
					</div>
				</div>
				<div>
					<Route path="/Main/Register" render={()=><RegisterPage />} />
					<Route path="/Main/AddDelete" render={()=><AddDeletePage />} />
					<Route path="/Main/RegistResult" render={()=><RegistResultPage />} />
					<Route path="/Main/Remove" render={()=><RemovePage />} />
					<Route path="/Main/Grade" render={()=><GradePage />} />
					<Route path="/Main/Tuition" render={()=><TuitionPage />} />
				</div>
			</div>
		);
	}
}