import React, {useEffect, useState} from 'react';
import Employee from './Employee/Employee';
import './EmployeeList.scss';


function EmployeeList({employeeArray})
{
	const [tableView, setTableView] = useState({});
	
	// To render correct fields on first render.
	useEffect(() => handleResize(), []);
	
	// UseEffect to call function on window resize with Debounce function delay
	useEffect(() =>
	{
		let searchtimer;
		window.addEventListener('resize', debounce);
		
		function debounce()
		{
			const inputDelay = 50;
			clearTimeout(searchtimer);

			searchtimer = setTimeout(() => {
				handleResize();
			}, inputDelay);
		}
	
		return () => window.removeEventListener('resize', debounce);
	});

	/**
	 * Function that desides what fields do not fit in table
	 * 
	 * sets local state "tableView"
	 */
	const handleResize = () =>
	{
		const temp = {
			showEmail: true,
			showNumber: true,
			showFullCountry: true
		};
		
		if (window.innerWidth <= 900)
		{
			temp.showFullCountry = false;
			temp.showNumber = false;

			if (window.innerWidth < 600)
			{
				temp.showEmail = false;
			}
		}

		setTableView(temp);
	}
	
	const employeesList = employeeArray.map((employee, i) =>
	{
		return (
			<Employee
				key={i}
				employee={employee}
				tableView={tableView}
			/>
		);
	});

	return (
		<div >
			<div className="EmployeeList">
				<table>
					<thead>
						<tr>
							<th>{/** picture */}</th>
							<th>Name</th>
							{tableView.showEmail ? <th>Email</th> : null}
							{tableView.showNumber ? <th>Number</th> : null}
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