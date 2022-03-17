import React from 'react';
import './SearchEmployees.scss';
import SearchBar from './SearchBar/SearchBar';
import EmployeeList from './EmployeeList/EmployeeList';
import { useState } from 'react';

const sortingOrders = {
	first: {
		ascendingOrder: false
	},
	last: {
		ascendingOrder: false
	},
	country: {
		ascendingOrder: false
	}
}

function SearchEmployees({employeeArray}) {

	const sortedArray = employeeArray;

	const [displayArray, setDisplayArray] = useState(sortedArray);
	
	console.log("SearchEmployees re-render: ", employeeArray);


	/**
	 * Function to sort an employeeArray of objects by object properties value
	 * 
	 * @param {Array} unsortedEmployeeArray 
	 * @param {String} sortingType 
	 */
	 function sortEmployees(unsortedEmployeeArray, sortingType) {
		const ascending = sortingOrders[sortingType].ascendingOrder;

		// Display chosen sort value
		const sortedArray = unsortedEmployeeArray.sort((a,b) => {
			switch (sortingType) {
				case 'country':
					return ascending ? 
							a.location[sortingType].localeCompare(b.location[sortingType])
						:
							b.location[sortingType].localeCompare(a.location[sortingType]);

				case 'first':
				case 'last':
					return ascending ? 
							a.name[sortingType].localeCompare(b.name[sortingType])
						:
							b.name[sortingType].localeCompare(a.name[sortingType]);
			}
		});

		sortingOrders[sortingType].ascendingOrder = !sortingOrders[sortingType].ascendingOrder;

		setDisplayArray(sortedArray);

		return sortedArray;
	}

	let employeeList = displayArray.length > 0 && <EmployeeList employeeArray={displayArray}/>;

	return (
		<div className="SearchEmployees"> 
			<div className="searchContainer">
				<SearchBar
					employeeArray={sortedArray}
					setDisplayArray={setDisplayArray}
				/>
				<div className="sortingOptions">
					<p>SortBy:</p>
					<span onClick={() => sortEmployees([...displayArray], "first")}>Firstname</span>
					<span onClick={() => sortEmployees([...displayArray], "last")}>Lastname</span>
					<span onClick={() => sortEmployees([...displayArray], "country")}>Country</span>
				</div>
			</div>
			{employeeList}
		</div>
	);
}


export default SearchEmployees;