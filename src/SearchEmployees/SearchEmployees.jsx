import './SearchEmployees.css';
import SearchBar from './SearchBar/SearchBar';
import EmployeeList from './EmployeeList/EmployeeList';
import { useState } from 'react';
import { useEffect } from 'react';

function SearchEmployees(props) {
	const unsortedArray = props.employeeArray;
	const [employeeArray, setEmployeeArray] = useState(props.employeeArray);

	useEffect(() => {
		setEmployeeArray(unsortedArray);
	}, [unsortedArray]);

	/**
	 * Function to filter array of employees by text input
	 * 
	 * @param {Array} unsortedEmployeeArray Unsorted list of object employees
	 * @param {String} filterString String from text input field
	 * 
	 * Local state (employeeArray) gets set to the filtered array (filteredArray).
	 */
	function filtering(unsortedEmployeeArray, filterString) {
		//console.log("filterString: ", filterString);
	
		//const filterWords = filterString.split(/(,| |!|\?)+/);
		const filterWords = filterString.split(" ");
	
		// Filter through properties value of array.
		const filteredArray = unsortedEmployeeArray.filter((employee => loopEntries(employee, filterWords)));
	
		
		/* console.log("filterWords: ", filterWords);
		console.log("filteredArray: ", filteredArray); */
		
		// Set state to filtered employee array
		setEmployeeArray(filteredArray);
	}

	return (
		<div className="SearchEmployees">
			<SearchBar
				employeeArray={employeeArray}
				filtering={(filterString) => filtering(unsortedArray, filterString)}
			/>
			<EmployeeList employeeArray={employeeArray}/>
		</div>
	);
}

/**
 * Function to loop entries and compare all values from properties in object
 * 
 * @param {object} entryObject  object of employee or callback from object property in object
 * @param {Array} filterWords array of words to use when filtering (only passed to function)
 * @returns Boolean from function compareValueWithWord
 */
function loopEntries(entryObject, filterWords) {
	if (entryObject != null) {
		for (const [key, value] of Object.entries(entryObject)) {
			if (typeof value === "object") 
			{
				/* console.log(`loopEntries key: ${key}`); */
				if (loopEntries(value, filterWords))
				{
					return true;
				}
			}

			/* console.log(`Key: ${key} = Value: ${value}; TypeOf: ${typeof value}`); */
			if (value != null && compareValueWithWord(value, filterWords))
			{
				return true;
			}
		}
	}

	return false;
}


/**
 * 
 * @param {String} EmployeeValue property value from object "employee" 
 * @param {Array} filterWords array of words to use when filtering 
 * @returns 
 */
function compareValueWithWord(EmployeeValue, filterWords) {
	for (const filterWord of filterWords) {
		if (EmployeeValue.toString().toLowerCase().includes(filterWord.toLowerCase()))
		{
			/* console.log("******FOUND A MATCH*******");
			console.log("EmployeeValue: ", EmployeeValue);
			console.log("filterWord: ", filterWord); */

			return true;
		}
	}

	return false;
}

export default SearchEmployees;