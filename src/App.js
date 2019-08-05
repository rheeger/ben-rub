import React, { Component } from 'react';
import BEN from './BEN.png';
import './App.css';
import SMSForm from './smsForm';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1>TEXT-UR-PITCH</h1>
					<img src={BEN} className="App-logo" alt="logo" />

					<SMSForm />
				</header>
			</div>
		);
	}
}

export default App;
