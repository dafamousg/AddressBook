import data from './employeeData.json';

const seedId = "seed=abc";
const apiAddress = "https://randomuser.me/api/";
const quantityQuery = (number) => `results=${number}`;
const exclude = 'exc=login,gender,dob,registered';


/**
 * Function to do API call and to modify result.
 * 
 * @param {Number} employeesQuantity 
 * @returns {Array} - Return Array of employee objects. 
 */
const apiData = async (employeesQuantity=15) =>
{
	const dataResult = await fetch(`${apiAddress}?${seedId}&${quantityQuery(employeesQuantity)}&${exclude}`)
		.then(res => res.json())
		.then(data => {
			data.results.forEach((employee, i) => {
				// Adds unique ID to all employees due to API ID not always included.
				employee.id = i.toString();
				employee['jobTitle'] = randomJobTitle();
			});

			return data.results.sort((a,b) => a.name.first.localeCompare(b.name.first));
		})
		.catch(e => {
			// If error occurs, show list of employees from local JSON file.
			console.log("Error message: ", e);
			return data.results;
		});

	return dataResult
}

/**
 * Function to return random job title.
 * 
 * @returns {String} - job title.
 */
const randomJobTitle = () =>
{
	const jobTitleArray = [
		'Software Engineer',
		'UI/UX Designer',
		'Software Architect',
		'Graphic Designer',
		'Product Manager',
		'Office Manager',
		'Program Manager'
	];

	return jobTitleArray[Math.floor(Math.random() * jobTitleArray.length)];
}

export default apiData;