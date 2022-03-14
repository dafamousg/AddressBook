import React, { useCallback, useEffect } from 'react';
import './Employee.scss';
import { Link, useNavigate } from "react-router-dom";

export default function Employee({employee}) {
	
	const navigate = useNavigate();
	const handleOnClick = useCallback(() => navigate(`/Employee/${employee.id}`), [navigate]);


	useEffect(() => {
		handleResize();
	}, [employee]);

	const handleResize = () => {
		let imgUrl = employee.picture.large;
		
		const img = document.getElementById(employee.id);
		img.style.backgroundImage = `url(${imgUrl}`;
	};


	return (
		<tr>
			<td onClick={() => handleOnClick()}>
				<div id={employee.id} className="img"></div>
			</td>
			<td onClick={() => handleOnClick()}>
				<span className='name'>{employee.name.title}. {employee.name.first} {employee.name.last}</span>
			</td>
			<td>
				<span className='name'>{employee.email}</span>
			</td>
			<td>
				<div>{employee.phone}</div>
			</td>
			<td>
				<span className='name'>{employee.location.country}</span>
			</td>
		</tr>
	);
}

{/* 		<div className="employee">
			<div className="imgContainer">
				<div id={employee.id} className="img"></div>
			</div>
			<div className="infoContainer">
				<div className="items">
					<div>{employee.name.title}. {employee.name.first} {employee.name.last}</div>
				</div>
				<div className="items">
					<span>Country: </span> {/** Create flag icons instead to display which country }
					<span>{employee.location.country}</span>
				</div>
				<div className="items">
					<span>Email: </span> {/** Create mail icons instead to display which country }
					<div>{employee.email}</div>
				</div>
				<div className="items">
					<div>Phone:</div> {/** Create phone icons instead to display which country }
					<div>{employee.phone}</div>
				</div>
			</div>
		</div> */}