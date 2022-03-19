import React from 'react';
import './SearchEmployees.scss';
import SearchBar from './SearchBar/SearchBar';
import EmployeeList from './EmployeeList/EmployeeList';
import { useState } from 'react';

const sortingOrders = {
	currentType: 'first',
	first: {
		ascendingOrder: true
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
		
		sortingOrders[sortingType].ascendingOrder = !sortingOrders[sortingType].ascendingOrder;
		const ascending = sortingOrders[sortingType].ascendingOrder;
		sortingOrders.currentType = sortingType;

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

		setDisplayArray(sortedArray);
	}

	const employeeList = displayArray.length > 0 && <EmployeeList employeeArray={displayArray}/>;

	const orderDirection = sortingOrders[sortingOrders.currentType].ascendingOrder ? '/ascending.svg' : '/descending.svg';
	const orderDirectionString = sortingOrders[sortingOrders.currentType].ascendingOrder ? 'Ascending' : 'Descending';
	const showSort = convertSortName(sortingOrders.currentType);

	return (
		<div className="SearchEmployees"> 
			<div className="searchContainer">
				<SearchBar
					employeeArray={sortedArray}
					setDisplayArray={setDisplayArray}
				/>
				<div className="dropdown" onClick={showSortList}>
					<div className="dropbtn">
						Sort By: {showSort}
					</div>
					<div id='sortContent' className="dropdown-content">
						<span onClick={() => sortEmployees([...displayArray], "first")}>Firstname</span>
						<span onClick={() => sortEmployees([...displayArray], "last")}>Lastname</span>
						<span onClick={() => sortEmployees([...displayArray], "country")}>Country</span>
					</div>
					
					<img
							id='sortImg'
							onClick={() => sortEmployees([...displayArray], sortingOrders.currentType)}
							src={orderDirection}
							alt={`${orderDirectionString} order`}
							width='60px'
							height='60px'
						/>
				</div>
			</div>
			{employeeList}
		</div>
	);
}

function convertSortName(sortType) {
	let convertedName = sortType;
	if (sortType === 'first' || sortType === 'last')
	{
		convertedName += 'name';
	}

	return convertedName;
}

function showSortList() {
	document.getElementById('sortContent').classList.toggle('show');
}

export default SearchEmployees;

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn'))
	{
    const sortContent = document.getElementById("sortContent");

		if (sortContent?.classList.contains('show')) {
			sortContent.classList.remove('show');
		}
  }
}