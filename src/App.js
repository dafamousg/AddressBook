import { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchEmployees from './SearchEmployees/SearchEmployees';
import EmployeeProfile from './EmployeeProfile/EmployeeProfile';
import apiData from './Data/apiService';

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			employeeArray: [],
			selectedEmployee: null
		};
	}

	// Make API call to Random User API and send result to SearchEmployees()
	componentDidMount() {
		this.getData(15);
	}

	getData = async (value) => {
		console.log("API Call");
		const res = await apiData(value);
		console.log("API ANSWER: ", res);
		this.setState({employeeArray: res});
	};
	
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Routes>
						<Route
							exact path="/"
							element={<SearchEmployees employeeArray={this.state.employeeArray}/>}
						/>
						<Route
							exact path="/Employee/:employeeId"
							element={<EmployeeProfile employeeArray={this.state.employeeArray}/>}
							/>
					</Routes>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
