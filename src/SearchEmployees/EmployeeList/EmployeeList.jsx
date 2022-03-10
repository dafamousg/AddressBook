import Employee from './Employee/Employee';
import './EmployeeList.css';

function EmployeeList({employeeArray, selectEmployee}) {
	
	console.log("EmployeeList re-render");

	let employeesList;

	if (employeeArray.length > 0) {
		employeesList = employeeArray.map((employee, i) => {
			return (
				<Employee
					key={i}
					className="employee"
					onClick={() => selectEmployee(employee.id.value)}
					employee={employee}
				/>
			);
		});
	}
	
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