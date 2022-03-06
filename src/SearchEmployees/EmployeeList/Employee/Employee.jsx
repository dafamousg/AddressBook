import React, { Component } from 'react';
import './Employee.css';
import { Link } from "react-router-dom";

export default class Employee extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const employee = this.props.employee;

		return (
			<div className="EmployeeListItem">
				<Link to={{pathname: `/Employee/${employee.id.value}`}} >
					<div>Employee {employee.name.first}</div>
				</Link>
			</div>
		);
	}
}
