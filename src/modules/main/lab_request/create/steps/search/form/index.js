import React from 'react';
import LabApi from 'services/api';
import PropTypes from 'prop-types';
import { Form, Input, Button, Row, Col, message } from 'antd';

import './form.css';

const formItemLayout = [
	{
		xs: { span: 24 },
		sm: { span: 24 },
		md: { span: 6,  offset: 3 },
		lg: { span: 4,  offset: 3 },
	},
	{
		xs: { span: 24 },
		sm: { span: 24 },
		md: { span: 1 },
		lg: { span: 1 }
	},
	{
		xs: { span: 24 },
		sm: { span: 24 },
		md: { span: 6 },
		lg: { span: 8 },
	},
	{
		xs: { span: 24 },
		sm: { span: 24 },
		md: { span: 6 },
		lg: { span: 5 },
	},
];

class SearchForm extends React.Component {
	state = {
		patientId: '',
		patientName: ''
	};
	
	handleInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const { patientName } = this.state;
		const { populatePatients } = this.props;

		try {
			// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6InJvb3QiLCJleHAiOjE1NTc4MjEzMjIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDQzODciLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQ0Mzg3In0.fbIB7Kxc087zQfkD-Hgln__Plr3VwPrEHo1lQCAWlgY`;
			
			const url = `/lab/Patient/name/${patientName}`;
			const response = await LabApi.get(url);
			const data = await response;

			console.log(data);
			populatePatients(data);
		}
		catch(error) {
			message.error(`Something went wrong, Please try again.`);
		}
	}

	clearInputs = () => {
		this.setState({
			patientId: '',
			patientName: ''
		});
	}

	handleFocus = (event) => {
		if(event.target.name === 'patientId')
			this.setState({ patientName: '' });
		
		if(event.target.name === 'patientName')	
			this.setState({ patientId: '' });
	}

	render() {
		const { patientId, patientName } = this.state;
		const disabled = !(patientId || patientName);

		return (
			<Form onSubmit={this.handleSubmit}>
				<Row gutter={12}>
					<Col {...formItemLayout[0]}>
						<Form.Item label="PATIENT ID">
							<Input 
								allowClear
								name="patientId" 
								value={patientId} 
								onChange={this.handleInputChange}
								onFocus={this.handleFocus}
							/>
						</Form.Item>
					</Col>
					<Col 
						{...formItemLayout[1]} 
						style={{textAlign: 'center', marginTop: 30}}
					>
						OR
					</Col>
					<Col {...formItemLayout[2]}>
						<Form.Item label="PATIENT NAME">
							<Input 
								allowClear
								name="patientName" 
								value={patientName} 
								onChange={this.handleInputChange} 
								onFocus={this.handleFocus}
							/>
						</Form.Item>
					</Col>
					<Col {...formItemLayout[3]}>
						<Form.Item style={{ marginTop: 22 }}>
							<Row gutter={12}>
								<Col span={12}>
									<Button block shape="round" onClick={this.clearInputs}>
										CLEAR
									</Button>
								</Col>
								<Col span={12}>
									<Button 
										block 
										shape="round" 
										type="primary" 
										htmlType="submit" 
										disabled={disabled}
									>
										SEARCH
									</Button>
								</Col>
							</Row>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		);
	}
}

SearchForm.propTypes = {
	populatePatients: PropTypes.func.isRequired
};

export default SearchForm;
