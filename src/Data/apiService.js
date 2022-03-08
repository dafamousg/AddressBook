import data from './employeeData.json';
import { v4 as uuidv4 } from 'uuid';

const seedId = "seed=abc";
const apiAddress = "https://randomuser.me/api/"
const quantityQuery = (number) => `results=${number}`

const apiData = async (employeesQuantity=15) => {
	console.log("API ANSWER");

	const dataResult = await fetch(`${apiAddress}?${seedId}&${quantityQuery(employeesQuantity)}`)
		.then(res => res.json())
		.then(data => {
			data.results.forEach(employee => {
				// Adds unique ID to all employees due to API ID not always included.
				employee.id = uuidv4();
			});
			return data.results;
		})
		.catch(e => {
			// If error occurs, show list of employees from local JSON file.
			console.log("Error message: ", e);
			return data.results;
		});

	return dataResult;
}

export default apiData;