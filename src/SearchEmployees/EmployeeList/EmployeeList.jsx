import Employee from './Employee/Employee';
import './EmployeeList.css';

function EmployeeList(props) {
	const employeeArray = props.employeeArray;
	//console.log("EmployeeList");

	let employeesList = employeeArray.map((employee, i) => {
		return (
			<Employee
				key={i}
				className="employee"
				onClick={() => props.selectEmployee(employee.id.value)}
				employee={employee}
			/>
		);
	});

	return (
		<div >
			<div>EmployeeList</div>
			<div className="EmployeeList">
				{employeesList}
			</div>
		</div>
	);
}

export default EmployeeList;