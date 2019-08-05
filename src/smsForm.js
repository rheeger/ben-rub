import React, { Component } from 'react';
import './smsForm.css';

class SMSForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: {
				to: '',
				body: ''
			},
			submitting: false,
			error: false
		};
		this.onHandleChange = this.onHandleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onHandleChange(event) {
		const name = event.target.getAttribute('name');
		this.setState({
			message: { ...this.state.message, [name]: event.target.value }
		});
	}

	onSubmit(event) {
		event.preventDefault();
		this.setState({ submitting: true });
		fetch('/api/messages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state.message)
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					this.setState({
						error: false,
						submitting: false,
						message: {
							to: '',
							body: ''
						}
					});
				} else {
					this.setState({
						error: true,
						submitting: false
					});
				}
			});
	}
	render() {
		return (
			<form onSubmit={this.onSubmit} className={this.state.error ? 'error sms-form' : 'sms-form'}>
				<div>
					<label htmlFor="to">YOUR NUMBER:</label>
					<input type="tel" name="to" id="to" value={this.state.message.to} onChange={this.onHandleChange} />
				</div>
				<div>
					<label htmlFor="body">YOUR PITCH:</label>
					<textarea value={this.state.message.body} onChange={this.onHandleChange} name="body" id="body" />
				</div>
				<button type="submit" disabled={this.state.submitting}>
					{' '}
					SUBMIT{' '}
				</button>
			</form>
		);
	}
}

export default SMSForm;
