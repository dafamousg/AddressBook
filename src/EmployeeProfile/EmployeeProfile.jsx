import './EmployeeProfile.css';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

function EmployeeProfile(props) {
	
	const [ employee, setEmployee ] = useState(null);

	const {employeeId} = useParams() || {};
	const employeeArray = props.employeeArray;
	
	console.log("EmployeeProfile ID: ", employeeId);


	useEffect(() => {
		const selectedEmployee = employeeArray.find(e => e.id.value === employeeId);
		setEmployee(selectedEmployee);
	}, [props.employeeArray]);

	
	console.log("EmployeeProfile: ", employee);


	/**
	 * Function that selects an employee 
	 * @param {String} employeeId ID for employees
	 */
	/* const selectEmployee = async (employeeId) => {
		console.log("selectEmployee ID: ", employeeId);
		const selectedEmployee = employeeArray.find(e => e.id.value === employeeId);
		console.log("selectEmployee OBJECT: ", selectedEmployee);

		setEmployee(selectedEmployee);
		//this.setState({selectedEmployee});/
	};

	useEffect(() => {
		selectEmployee(employeeId);
	}, []); */

	return (
		<div className="EmployeeProfile">
			<div>EmployeeProfile {employee?.name?.first}</div>
			<Link to="/">
				<button>Back</button>
			</Link>
		</div>
	);
}

export default EmployeeProfile;