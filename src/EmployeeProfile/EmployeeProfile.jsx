import './EmployeeProfile.scss';
import { Link, useParams } from "react-router-dom";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function EmployeeProfile({employeeArray}) {
	
	const {employeeId} = useParams() || {};

	const employee = employeeArray.find(employee => employee.id === employeeId) ?? null;

	const employeeProfile = employee ? setUpEmployeeProfile(employee) : null;

	return (
	<>
		<Link to="/">
			<button id='btnback'>{"<-- EmployeeList"}</button>
		</Link>
		<div id='container'>
			<div className="EmployeeProfile">
				{employeeProfile}
			</div>
		</div>
	</>
	);
}



const setUpEmployeeProfile = (employee) => {

	const employeeLocalTime = getUTCTime(employee) ?? null;


	return (
		<>
			<div id='topProfile'>
				<div id='profilePic'>
					<img src={employee.picture.large} alt='' height='200px' width='200px'></img>
				</div>
				<div id='personalInfo'>
					<div id='profileName'>
						<p id='name'>{employee.name.title}. {employee.name.first} {employee.name.last}</p>
						<div><p id='jobTitle'>{employee.jobTitle}</p></div>
					</div>
					<div id='contact'>
						<div className='infoContainer'>
							<div className='titles'>Email</div>
							<p className='phone'>{employee.email}</p>
						</div>
						<div className='infoContainer'>
							<span className='titles'>Work</span>
							<p className='phone'>{employee.phone}</p>
						</div>
						<div className='infoContainer'>
							<span className='titles'>Private</span>
							<p className='phone'>{employee.cell}</p>
						</div>
					</div>
				</div>
			</div>
			<div id='bottomProfile'>
				<div className='infoContainer'>
					<HomeWorkIcon/>
					<div>{employee.location.city}, {employee.location.country}</div>
				</div>
				<div className='infoContainer'>
					<LocationOnIcon/>
					<div>{employee.location.timezone.description}.</div>
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
function getUTCTime(employee) {
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
			<AccessTimeIcon/>
			<div>{convertedTime}</div>
		</div>
	);

}

export default EmployeeProfile;