/* eslint-disable func-names */
// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Input, Button, Row, Col, DatePicker } from 'antd';


// CUSTOM MODULES
import axiosCall from 'services/axiosCall';
import Message from 'shared_components/message';
import { 
	apiUrlPatientByID, 
	apiUrlPatientByName, 
} from 'shared_components/constant-global';
import {buttonNames, fieldLabels} from './settings';

// CSS
import './search_patient_form.css';

const dateFormat = 'MM/DD/YYYY';

class SearchPatientForm extends React.Component {
	state = {
		patientID: '',
		patientName: '',
		loading: false
	};

	handleInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit = async (event) => {  
		event.preventDefault();

		const { patientName, patientID } = this.state;
		const { populatePatients, storeSearchedVal } = this.props;
		let patients = [];
		
		this.setState({ loading: true });
		patients = await this.fetchPatients(patientName, patientID); 
		this.setState({ loading: false });

		populatePatients(patients);
		storeSearchedVal(patientName, patientID);

		if(patients.length <= 0) 
			Message.info('No results found');
	}

	fetchPatients = async (patientName, patientID) => {
		let patients = [];
		try{
			const response = await axiosCall({
				method: 'GET',
        url: (patientID ? `${apiUrlPatientByID}${patientID}` : `${apiUrlPatientByName}${patientName}`)
			});
			
			const { data } = await response;
      console.log("TCL: SearchPatientForm -> fetchPatients -> data", data)
			
			patients = data ? data.patient : [];
		}
		catch(error) {
			Message.error();
		}


		return patients;
	}

	clearInputs = async () => {
		this.setState({
			patientID: "",
			patientName: ""
		});

		const { populatePatients } = this.props;
		let patients = [];
		
		this.setState({ loading: true });
		patients = []; 
		this.setState({ loading: false });

		populatePatients(patients);
	}

	handleFocus = (event) => {
		if(event.target.name === 'patientID')
			this.setState({ patientName: '' });
		
		if(event.target.name === 'patientName')	
			this.setState({ patientID: '' });
	}

	render() {
		const { patientID, patientName, loading } = this.state;
		const disabled = !(patientID || patientName);

		return (
			<Form className="search-patient-form" onSubmit={this.handleSubmit}>
				<Row gutter={12}>
					{/* Patient id field */}
					<Col xs={24} sm={24} md={6} lg={4} offset={3}>
						<Form.Item label={fieldLabels.patientID}>
							<Input 
								// allowClear
								name="patientID" 
								value={patientID} 
								onChange={this.handleInputChange}
								onFocus={this.handleFocus}
							/> 
						</Form.Item>
					</Col>
					{/* Or */}
					<Col xs={24} sm={24} md={1} lg={1} style={{textAlign: 'center', marginTop: 45}}>
						OR
					</Col>
					{/* Patient Name */}
					<Col xs={24} sm={24} md={6} lg={4}>
						<Form.Item label={fieldLabels.patientName}>
							<Input 
								// allowClear
								name="patientName" 
								value={patientName} 
								onChange={this.handleInputChange} 
								onFocus={this.handleFocus}
								placeholder="Lastname, Firstname"
							/>
						</Form.Item>
					</Col>
					{/* Request date */}
					<Col xs={24} sm={24} md={6} lg={4}>
					{ (this.props.moduleProfile === "editRequest") ? 
						(
							<Form.Item label={fieldLabels.requestDate}>
								<DatePicker defaultValue={moment()} format={dateFormat}	 />
							</Form.Item>
						) : null 
					}
					</Col>
					{/* Buttons */}
					<Col xs={24} sm={24} md={6} lg={4}>
						<Form.Item style={{ marginTop: 33 }}>
							<Row gutter={12}>
								<Col span={12}>
									<Button 
										block 
										shape="round" 
										onClick={this.clearInputs} 
									>
										{buttonNames.clear}
									</Button>
								</Col>
								<Col span={12}>
									<Button 
										block 
										shape="round" 
										type="primary" 
										htmlType="submit" 
										disabled={disabled}
										loading={loading}
									>
										{buttonNames.search}
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

SearchPatientForm.propTypes = {
	populatePatients: PropTypes.func.isRequired,
	storeSearchedVal: PropTypes.func,
	moduleProfile: PropTypes.string.isRequired
};

SearchPatientForm.defaultProps = {
	storeSearchedVal() { return null; }
}

export default SearchPatientForm;
