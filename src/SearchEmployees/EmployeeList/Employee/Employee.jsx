import React, { Component } from 'react';
import './Employee.scss';
import { Link } from "react-router-dom";

export default class Employee extends Component {
	/* constructor(props) {
		super(props);
	} */

	componentDidMount() {
		const employee = this.props.employee;
		const img = document.getElementById(employee.id);
		img.style.backgroundImage = `url(${employee.picture.large}`;
	}

	componentDidUpdate() {
		const employee = this.props.employee;
		const img = document.getElementById(employee.id);
		img.style.backgroundImage = `url(${employee.picture.large}`;
	}

	render() {
		const employee = this.props.employee;

		return (
			<Link to={{pathname: `/Employee/${employee.id}`}} >
				<div className="employee">
					<div className="imgContainer">
						<div id={employee.id} className="img"></div>
					</div>
					<div className="infoContainer">
						<div className="items">
							<div>Name:</div>
							<div>{employee.name.title}. {employee.name.first} {employee.name.last}</div>
						</div>
						<div className="items">
							<div>Country:</div>
							<div>{employee.location?.country}</div>
						</div>
						<div className="items">
							<div>Email:</div>
							<div>{employee.email}</div>
						</div>
						<div className="items">
							<div>Phone:</div>
							<div>{employee.phone}</div>
						</div>
					</div>
				</div>
			</Link>
		);
	}
}
