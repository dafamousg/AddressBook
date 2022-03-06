import data from './employeeData.json';

const seedId = "seed=abc";
const apiAddress = "https://randomuser.me/api/"
const quantityQuery = (number) => `results=${number}`

const apiData = async (employeesQuantity=15) => {
	console.log("API ANSWER");

	const da = await fetch(`${apiAddress}?${seedId}&${quantityQuery(employeesQuantity)}`)
		.then(res => res.json())
		.then(data => {
			data.results.forEach(employee => {
				// Add unique ID to all employees due to API ID not always included.
				//employee.id.value = UUid
			});
			return data.results;
		})
		.catch(e => {
			console.log("Error message: ", e);
			return data.results;
		});

	return da;
}

export default apiData;