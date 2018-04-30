import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'

export default class RemoveControlPage extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		return(
			<div className="removeControlContainer">
				<h1 className="head">ถอนรายวิชาให้นิสิต</h1>
				<div className="searchToRemove">
					<input type="text" className="input is-rounded is-small" placeholder="รหัสนิสิต"></input>
					<button className="button is-small is-rounded is-danger">ค้นหา</button>
				</div>
				<div>
					<div className="nisit"><p>นางสาว นิสิตจุฬา คนหนึ่ง	6031025421</p></div>
					<div className="removeControlTable">
						<table>
							<thead>
								<td>ลำดับ</td>
								<td>รหัสวิชา</td>
								<td>ชื่อวิชา</td>
								<td>ตอนเรียน</td>
								<td>ถอนรายวิชา</td>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td>2110318</td>
									<td>DIS SYS ESSEN</td>
									<td>1</td>
									<td><input type="checkbox"></input></td>
								</tr>
								<tr>
									<td>2</td>
									<td>2110332</td>
									<td>SYS ANALYSIS DSGN</td>
									<td>3</td>
									<td><input type="checkbox"></input></td>
								</tr>
								<tr>
									<td>3</td>
									<td>2110422</td>
									<td>DB MGT SYS DESIGN</td>
									<td>2</td>
									<td><input type="checkbox"></input></td>
								</tr>
								<tr>
									<td>4</td>
									<td>2110471</td>
									<td>COMP NETWORK I</td>
									<td>33</td>
									<td><input type="checkbox"></input></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div><button className="button is-rounded is-small is-danger">ยืนยัน</button></div>
				</div>
			</div>

		);
	}
}