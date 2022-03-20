import { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchEmployees from './SearchEmployees/SearchEmployees';
import EmployeeProfile from './EmployeeProfile/EmployeeProfile';
import apiData from './Data/apiService';

class App extends Component
{
	constructor(props)
	{
		super(props);
		
		this.state = {
			employeeArray: []
		};
	}

	// Make API call to Random User API and send result to SearchEmployees()
	componentDidMount()
	{
		this.getData(15);
	}

	getData = async (value) =>
	{
		await apiData(value)
		.then((result) => {
			this.setState({employeeArray: result})
		});
	};
	
	render()
	{
		const arrayExists = this.state.employeeArray.length > 0;

		let searchComponent = arrayExists && <SearchEmployees employeeArray={this.state.employeeArray}/>;
		let employeeProfile = arrayExists && <EmployeeProfile employeeArray={this.state.employeeArray}/>;

		return (
			<BrowserRouter>
				<div className="App">
					<Routes>
						<Route
							path="*"
							element={searchComponent}
						/>
						<Route
							exact path="/Employee/:employeeId"
							element={employeeProfile}
							/>
					</Routes>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
