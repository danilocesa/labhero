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
		patientID: '',
		patientName: ''
	};
	
	handleInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const { patientName, patientID } = this.state;
		const { populatePatients } = this.props;

		const patients = await this.fetchPatients(patientName, patientID) 

		if(patients.length > 0)
			populatePatients(patients);
		else
			message.info('No results found');
	}

	fetchPatients = async (name, id) => {
		let patients = [];
		
		try {
			const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
			const byIdURL = `----------lab/Patient/id/${id}`;
			const byNameURL = `----------lab/Patient/name/${name}`;
			const response = await LabApi.get(PROXY_URL + (id ? byIdURL : byNameURL));
			const { data } = await response;
		
			patients = data ? data.patient : [];
		}
		catch(error) {
			message.error(`Something went wrong, Please try again.`);
		}

		return patients;
	}
	
	clearInputs = () => {
		this.setState({
			patientID: '',
			patientName: ''
		});
	}

	handleFocus = (event) => {
		if(event.target.name === 'patientID')
			this.setState({ patientName: '' });
		
		if(event.target.name === 'patientName')	
			this.setState({ patientID: '' });
	}

	render() {
		const { patientID, patientName } = this.state;
		const disabled = !(patientID || patientName);

		return (
			<Form onSubmit={this.handleSubmit}>
				<Row gutter={12}>
					<Col {...formItemLayout[0]}>
						<Form.Item label="PATIENT ID">
							<Input 
								allowClear
								name="patientID" 
								value={patientID} 
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
