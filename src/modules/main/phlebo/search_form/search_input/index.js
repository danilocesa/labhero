/* eslint-disable func-names */
// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Button, Row, Col, DatePicker as AntDatePicker } from 'antd';

// CUSTOM MODULES
import { axiosLabAPI } from 'services/axios';
import CustomMessage from 'shared_components/message';
import HttpCodeMessage from 'shared_components/message_http_status';
import { RegexInput } from 'shared_components/pattern_input';
import { apiUrlPhleboSearchPatient } from 'global_config/constant-global';

// CSS
import './search_patient_form.css';

// CONSTANTS
class SearchPatientHeaderForm extends React.Component {
	state = {
		patientID: '',
		patientName: '',
		loading: false,
		selectedDateValue: moment().format("YYYYMMDD")
	};

	handleInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit = async (event) => {  
		event.preventDefault();

		const { patientName, patientID } = this.state;
		const { populateExtractedPatients, populateForExtractionPatients } = this.props;
		let patients = [];
		
		this.setState({ loading: true });
		patients = await this.fetchPatients(patientName, patientID); 
		// populate patient by extracted or for extraction
		this.setState({ loading: false });

		populateExtractedPatients(patients.extracted);
		populateForExtractionPatients(patients.forExtraction);

		if(patients.length < 1) 
			HttpCodeMessage({ status: 204 });
	}


	fetchPatients = async (patientName, patientID) => {
		let apiResponse;
		try{
			// eslint-disable-next-line max-len
			const apiBaseUrl = `${apiUrlPhleboSearchPatient}${this.state.selectedDateValue}`;
			const apiUrl = (patientID ? `${apiBaseUrl}/patientid/${patientID}` : `${apiBaseUrl}/patientname/${patientName}`);
			apiResponse = await axiosLabAPI({ method: 'GET', url: apiUrl });
		}
		catch(error) {
			CustomMessage.error();
		}

		return apiResponse.data;
	}

	clearItems = async () => {
		this.setState({
			patientID: "",
			patientName: "",
		});

		this.props.clearPatients();
	}

	handleFocus = (event) => {
		if(event.target.name === 'patientID')
			this.setState({ patientName: '' });
		
		if(event.target.name === 'patientName')	
			this.setState({ patientID: '' });
	}

	handleChangeDate = (value) => {
		this.setState({ selectedDateValue: (value == null ? moment().format("YYYYMMDD") : value.format('YYYYMMDD') ) });
	}

	render() {
		const { patientID, patientName, loading } = this.state;
		const disabled = !(patientID || (patientName && patientName.length > 1));

		return (
			<Form className="search-patient-form" onSubmit={this.handleSubmit}>
				<Row gutter={12} type="flex" justify="center">
					<Col xs={24} sm={24} md={6} lg={4}>
						<Form.Item label="PATIENT ID">
							<RegexInput 
								name="patientID" 
								value={patientID} 
								onChange={this.handleInputChange}
								onFocus={this.handleFocus}
								maxLength={20}
								regex={/[a-zA-Z0-9 -]/} 
							/> 
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={1} lg={1} style={{ textAlign: 'center', marginTop: 30 }}>
						OR
					</Col>
					<Col xs={24} sm={24} md={12} lg={7}>
						<Form.Item label="PATIENT NAME">
							<RegexInput 
								name="patientName" 
								value={patientName} 
								onChange={this.handleInputChange} 
								onFocus={this.handleFocus}
								placeholder="Lastname,Firstname"
								maxLength={100}
								regex={/[A-Za-z0-9, -]/} 
							/>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={6} lg={4}>
						<Form.Item label="SELECT DATE">
							<AntDatePicker 
								allowClear={false}
								// @ts-ignore
								defaultValue={moment()} 
								onChange={this.handleChangeDate} 
								style={{ width: '100%' }}
							/>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={6} lg={6}>
						<Form.Item style={{ marginTop: 20 }}>
							<Row>
								<Button 
									className="form-button"
									block 
									shape="round" 
									style={{ width: 120 }}
									onClick={this.clearItems} 
								>
									CLEAR
								</Button>
								<Button
									className="form-button" 
									block 
									shape="round" 
									type="primary" 
									htmlType="submit" 
									disabled={disabled}
									loading={loading}
									style={{ width: 120 }}
								>
									SEARCH
								</Button>
							</Row>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		);
	}
}

SearchPatientHeaderForm.propTypes = {
	populateExtractedPatients: PropTypes.func.isRequired,
	populateForExtractionPatients: PropTypes.func.isRequired,
	clearPatients: PropTypes.func.isRequired
};

export default SearchPatientHeaderForm;
