import React from 'react';
import './SearchBar.scss';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({employeeArray, setDisplayArray})
{
	let searchtimer;
	/**
	 * Debounce function to handle multiple fast inputs.
	 * 
	 * @param {Array} employeeArray - Array of employee objects
	 * @param {String} filterString - String of filter words seperated by space
	 */
	const handleInput = (employeeArray, filterString) =>
	{
		const inputDelay = 350;
		clearTimeout(searchtimer);

		searchtimer = setTimeout(() => {
			filterEmployees(employeeArray, filterString);
		}, inputDelay);
	};

	/**
	 * Function to filter array of employees by text input
	 * 
	 * @param {Array} employeeArray Unsorted list of object employees
	 * @param {String} filterString String from text input field
	 * 
	 * Parent local state (displayArray) gets overwritten by filteredArray
	 */
	function filterEmployees(employeeArray, filterString)
	{
		const filterWords = filterString.split(" ");
		const filteredArray = employeeArray.filter((employee) => loopEntries(employee, filterWords));
		
		// Set state to filtered employee array
		setDisplayArray(filteredArray);
	}

	return (
		<div className="SearchBar">
			<div className='searchTerm'>
				<SearchIcon id='searchIcon'/>
				<input 
					type='text'
					onChange={(e) => handleInput(employeeArray, e.target.value)}
					placeholder='Search For Employee'
					id='searchInput'
				/>
			</div>
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
function loopEntries(objectEntries, filterWords)
{
	const allowedSearhKey = ['first', 'last', 'country', 'phone'];

	if (objectEntries != null)
	{
		for (const [key, value] of Object.entries(objectEntries))
		{
			if (typeof value === "object") 
			{
				if (loopEntries(value, filterWords))
				{
					return true;
				}
			}
			
			if (allowedSearhKey.some(allowedWord => allowedWord === key))
			{
				if (value != null && compareValueWithWord(value, filterWords))
				{
					return true;
				}
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
function compareValueWithWord(EmployeeValue, filterWords)
{
	if (filterWords.length > 0)
	{
		for (const filterWord of filterWords)
		{
			if (EmployeeValue.toString().toLowerCase().includes(filterWord.toLowerCase()))
			{
				return true;
			}
		}
	}

	return false;
}

export default SearchBar;