import Employee from './Employee/Employee';
import './EmployeeList.scss';

function EmployeeList({employeeArray}) {
	
	console.log("EmployeeList re-render");

	let employeesList;

	if (employeeArray.length > 0) {
		employeesList = employeeArray.map((employee, i) => {
			return (
				<Employee
					key={i}
					employee={employee}
				/>
			);
		});
	}
	
	return (
		<div >
			<div className="EmployeeList">
				<table>
					<thead>
						<tr>
							<th>{/** picture */}</th>
							<th>Name</th>
							<th>Email</th>
							<th>Number</th>
							<th>Country</th>
						</tr>
					</thead>
					<tbody>
						{employeesList}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default EmployeeList;