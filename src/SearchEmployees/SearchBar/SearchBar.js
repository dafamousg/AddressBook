import React from 'react';

import './SearchBar.css';


function SearchBar({employeeArray, setDisplayArray}) {

	console.log("SearchBar re-render: ", employeeArray);
	/* useEffect(() => {
	}, [employeeArray]); */

	let searchtimer;

	const handleInput = (employeeArray, filterString) => {
		
		const inputDelay = 350;
		clearTimeout(searchtimer);

		searchtimer = setTimeout(() => {
			filterEmployees(employeeArray, filterString);
		}, inputDelay);
	}

	/**
	 * Function to filter array of employees by text input
	 * 
	 * @param {Array} employeeArray Unsorted list of object employees
	 * @param {String} filterString String from text input field
	 * 
	 * Parent local state (displayArray) gets overwritten by filteredArray
	 */
	function filterEmployees(employeeArray, filterString) {
		console.log("filterEmployees");
		//const filterWords = filterString.split(/(,| |!|\?)+/);
		const filterWords = filterString.split(" ");
		
		const filteredArray = employeeArray.filter((employee) => loopEntries(employee, filterWords));
		
		// Set state to filtered employee array
		setDisplayArray(filteredArray);
	}

	return (
		<div className="SearchBar">
			<input 
				type='text'
				onChange={(e) => handleInput(employeeArray, e.target.value)}
				className='searchTerm'
				placeholder='Search for an employee'
			/>
		</div>
	);
}

/**
 * Function to loop entries and compare all values from properties in object
 * 
 * @param {object} objectEntries  object of employee or callback from object property in object
 * @param {Array} filterWords array of words to use when filtering (only passed to function)
 * @returns Boolean from function compareValueWithWord
 */
function loopEntries(objectEntries, filterWords) {
	
	if (objectEntries != null) {
		for (const [, value] of Object.entries(objectEntries)) {
			if (typeof value === "object") 
			{
				if (loopEntries(value, filterWords))
				{
					return true;
				}
			}
			
			if (value != null && compareValueWithWord(value, filterWords))
			{
				return true;
			}
		}
	}
	
	return false;
}

/**
 * Function to compare employee property with filter words
 * 
 * @param {String} EmployeeValue property value from object "employee" 
 * @param {Array} filterWords array of words to use when filtering 
 * @returns 
 */
function compareValueWithWord(EmployeeValue, filterWords) {
	if (filterWords.length > 0) {
		for (const filterWord of filterWords) {
			if (EmployeeValue.toString().toLowerCase().includes(filterWord.toLowerCase()))
			{
				/* console.log("******FOUND A MATCH*******");
				console.log("EmployeeValue: ", EmployeeValue);
				console.log("filterWord: ", filterWord); */
				
				return true;
			}
		}
	}

	return false;
}

export default SearchBar;