import React, { useCallback, useEffect } from 'react';
import './Employee.scss';
import { useNavigate } from "react-router-dom";

export default function Employee({employee, tableView})
{
	const navigate = useNavigate();
	const handleOnClick = useCallback((id) => navigate(`/Employee/${id}`), [navigate]);

	useEffect(() => {
		document.getElementById(employee.id)
			.style.backgroundImage = `url(${employee.picture.large}`;
	}, [employee]);

	const country = tableView.showFullCountry ?
		employee.location.country : employee.nat;
	
	const emailColumn = tableView.showEmail ? 
		(<td><div className='secondaryInfo'>{employee.email}</div></td>) : null;

	const numberColumn = tableView.showNumber ?
		(<td><div className='secondaryInfo'>{employee.phone}</div></td>) : null;

	return (
		<tr>
			<td onClick={() => handleOnClick(employee.id)}>
				<div id={employee.id} className="img"></div>
			</td>
			<td onClick={() => handleOnClick(employee.id)}>
				<div id='listName'>{employee.name.first} {employee.name.last}</div>
			</td>
			{emailColumn}
			{numberColumn}
			<td>
				<div className='secondaryInfo'>{country}</div>
			</td>
		</tr>
	);
}