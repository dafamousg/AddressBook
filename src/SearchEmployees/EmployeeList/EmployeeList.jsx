import Employee from './Employee/Employee';
import './EmployeeList.css';

function EmployeeList(props) {
	const employeeArray = props.employeeArray;
	//console.log("EmployeeList");

	let employeesList = employeeArray.map((employee, i) => {
		return (
			<Employee
				key={i}
				onClick={() => props.selectEmployee(employee.id.value)}
				employee={employee}
			/>
		);
	});

	return (
		<div className="EmployeeList">
			<div>EmployeeList</div>
			{employeesList}
		</div>
	);
}

export default EmployeeList;