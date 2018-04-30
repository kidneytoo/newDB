import React, { Component } from 'react'
import { Route,Link,NavLink } from 'react-router-dom'
import Dog from './image/dog.png'

export default class Transcript extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		return(
			<div className="transcriptContainer">
				<div className="transcript">
					<div className="topTranscript">
						<div className="logoTranscript">
							<img src={Dog} className='dogTc' />
							<h4>Chulalongkorn University</h4>
							<h6>Bangkok 10330</h6>
							<h6>Thailand</h6>
						</div>
						<div className="personalInfo">
							<p>รหัสนิสิต : 5831022021</p>
							<p>ชื่อ : นายเตชินท์ ศุภผล</p>
							<p>คณะ : วิศวกรรมศาสตร์</p>
							<p>ภาควิชา : วิศวกรรมคอมพิวเตอร์</p>
						</div>
					</div>
					<div className="middleTranscript">
					</div>
					<div className="bottomTranscript">
						<div className="infoZone">
							<div className="gradeZone">
								<p>A : 4.00</p>
								<p>B+ : 3.50</p>
								<p>B : 3.00</p>
								<p>C+ : 2.50</p>
								<p>C : 2.00</p>
								<p>D+ : 1.50</p>
								<p>D : 1.00</p>
								<p>F : 0.00</p>
							</div>
							<div className="conditionZone">
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}