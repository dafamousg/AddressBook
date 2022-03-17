import React from 'react';
import './SearchEmployees.scss';
import SearchBar from './SearchBar/SearchBar';
import EmployeeList from './EmployeeList/EmployeeList';
import { useState } from 'react';

const sortingOrders = {
	currentType: 'firstname',
	first: {
		ascendingOrder: false
	},
	last: {
		ascendingOrder: true
	},
	country: {
		ascendingOrder: true
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
		sortingOrders.currentType = sortingType;
		if (sortingType === 'first' || sortingType === 'last')
		{
			sortingOrders.currentType += 'name';
		}

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
				default:
					return a.location[sortingType].localeCompare(b.location[sortingType]);	
			}
		});

		sortingOrders[sortingType].ascendingOrder = !sortingOrders[sortingType].ascendingOrder;

		setDisplayArray(sortedArray);

		return sortedArray;
	}

	const employeeList = displayArray.length > 0 && <EmployeeList employeeArray={displayArray}/>;

	const sortDirection = {
		firstname: sortingOrders.first.ascendingOrder ? <>Firstname &uarr;</> : <>Firstname &darr;</>,
		lastname: sortingOrders.last.ascendingOrder ? <>Lastname &uarr;</> : <>Lastname &darr;</>,
		country: sortingOrders.country.ascendingOrder ? <>Country &uarr;</> : <>Country &darr;</>
	}

	
	const showSort = sortDirection[sortingOrders.currentType];

	return (
		<div className="SearchEmployees"> 
			<div className="searchContainer">
				<SearchBar
					employeeArray={sortedArray}
					setDisplayArray={setDisplayArray}
				/>
				<div className="dropdown" onClick={showSortList}>
				<button className="dropbtn">Sort By: {showSort}</button>
					<div id='sortContent' className="dropdown-content">
						<span onClick={() => sortEmployees([...displayArray], "first")}>{sortDirection.firstname}</span>
						<span onClick={() => sortEmployees([...displayArray], "last")}>{sortDirection.lastname}</span>
						<span onClick={() => sortEmployees([...displayArray], "country")}>{sortDirection.country}</span>
					</div>
				</div>
			</div>
			{employeeList}
		</div>
	);
}

function showSortList() {
	const sortContent = document.getElementById('sortContent');
	if (sortContent.classList.contains('show'))
	{
		sortContent.classList.remove('show');
	}
	else
	{
		sortContent.classList.add('show')
	}
}

export default SearchEmployees;

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn'))
	{
    const sortContent = document.getElementById("sortContent");

		if (sortContent.classList.contains('show')) {
			sortContent.classList.remove('show');
		}
  }
}