import { useCallback } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Tooltip } from '@mui/material';

import './EmployeeProfile.scss';

function EmployeeProfile({employeeArray})
{
	const {employeeId} = useParams() || {};
	const navigate = useNavigate();
	const handleOnClick = useCallback(() => navigate(`/`), [navigate]);

	const employee = employeeArray.find(employee => employee.id === employeeId) ?? null;
	const employeeProfile = employee ? setUpEmployeeProfile(employee) : null;

	return (
	<>
		<div id='container'>
			<div id='btnContainer'>
				<button id='btnback' onClick={() => handleOnClick()} type='button' data-hover='Back to employee menu'>
					<ArrowBackIcon/>
				</button>
				<div className="EmployeeProfile">
					{employeeProfile}
				</div>
			</div>
		</div>
	</>
	);
}

export default EmployeeProfile;

const setUpEmployeeProfile = (employee) =>
{
	const employeeLocalTime = getUTCTime(employee) ?? null;

	return (
		<>
			<div id='topProfile'>
				<div id='profilePic'>
					<img src={employee.picture.large} alt='' height='200px' width='200px'></img>
				</div>
				<div id='personalInfo'>
					<div id='profileName'>
						<p className='primaryText'>{employee.name.first} {employee.name.last}</p>
						<div><p className='secondaryText'>{employee.jobTitle}</p></div>
					</div>
					<div id='contact'>
						<div className='infoContainer'>
							<div className='titles'>Email</div>
							<p className='tertiary'>{employee.email}</p>
						</div>
						<div className='infoContainer'>
							<span className='titles'>Work</span>
							<p className='tertiary'>{employee.phone}</p>
						</div>
						<div className='infoContainer'>
							<span className='titles'>Private</span>
							<p className='tertiary'>{employee.cell}</p>
						</div>
					</div>
				</div>
			</div>
			<div id='bottomProfile'>
				<div className='infoContainer'>
					<Tooltip title='Home office' placement="top" arrow>
						<HomeWorkIcon className='titles'/>
					</Tooltip>
					<div className='tertiary'>{employee.location.city}, {employee.location.country}</div>
				</div>
				<div className='infoContainer'>
					<Tooltip title='Current Location' placement="top" arrow>
						<LocationOnIcon className='titles'/>
					</Tooltip>
					<div className='tertiary'>{employee.location.timezone.description}.</div>
				</div>
				{employeeLocalTime}
			</div>
		</>
	)
}

/**
 * Function to convert UTC to employee local time.
 * 
 * @param {Object} employee
 * @returns DOM structure for Local time or null
 */
function getUTCTime(employee)
{
	// Converts string of UTC date to array with hours, minuts, seconds and a combination as items
	const UTCDate = new Date().toISOString();
	const regex = /(\d{2}):(\d{2}):(\d{2})/;
	const HourMinArray = UTCDate.match(regex);

	// Converts string of offset to array with UTC(-/+), hours, minutes and a combination as items
	const timezoneOffset = employee.location.timezone.offset;
	const offsetRegex = /(\D)(\d{1,2}):(\d{2})/;
	const offsetArray = timezoneOffset.match(offsetRegex);

	let hour = Number(HourMinArray[1]);
	let minute = Number(HourMinArray[2]);

	switch(offsetArray[1])
	{
		case '+':
			if (Number(offsetArray[2]) > 0)
			{
				const addedHours = hour + Number(offsetArray[2]);
				hour = addedHours > 24 ? addedHours - 24 : addedHours;
			}
			if (Number(offsetArray[3]) > 0)
			{
				const addedMinuts = minute + Number(offsetArray[3]);
				minute = addedMinuts > 60 ? addedMinuts - 60 : addedMinuts
			}
		break;

		case '-':
			if (Number(offsetArray[2]) > 0)
			{
				const addedHours = hour - Number(offsetArray[2]);
				hour = addedHours < 0 ? addedHours + 24 : addedHours;
			}
			if (Number(offsetArray[3]) > 0)
			{
				const addedMinuts = minute - Number(offsetArray[3]);
				minute = addedMinuts < 0 ? addedMinuts + 60 : addedMinuts
			}
		break;

		default:
		break;
	}

	hour = hour < 10 ? ('0'+hour) : hour;
	minute = minute < 10 ? ('0'+minute) : minute;

	const convertedTime = `${hour}:${minute}`;

	return (
		<div className='infoContainer'>
			<Tooltip title='Local Time' placement="top" arrow>
				<AccessTimeIcon className='titles'/>
			</Tooltip>
			<div className='tertiary'>{convertedTime}</div>
		</div>
	);
}