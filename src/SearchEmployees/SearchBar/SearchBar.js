import { useEffect, useState } from 'react';
import './SearchBar.css';

function SearchBar(props) {

	const [searchInput, setInput] = useState('');

	useEffect(() => {
		props.filtering(searchInput);
	}, [searchInput])

	return (
		<div className="SearchBar">
			<p>Search employee here</p>
			<input type='text' onChange={(e) => setInput(e.target.value)} className='searchTerm' placeholder='Search for employee'/>
		</div>
	);
}

export default SearchBar;