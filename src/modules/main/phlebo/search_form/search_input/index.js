/* eslint-disable func-names */
// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Input, Button, Row, Col, DatePicker as AntDatePicker } from 'antd';

// CUSTOM MODULES
import axiosCall from 'services/axiosCall';
import CustomMessage from 'shared_components/message';
import HttpCodeMessage from 'shared_components/message_http_status';
import { apiUrlPhleboSearchPatient } from 'shared_components/constant-global';

// CSS
import './search_patient_form.css';

// CONSTANTS
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
		lg: { span: 6 },
	},
	{
		xs: { span: 24 },
		sm: { span: 24 },      
		md: { span: 4 },
		lg: { span: 4 },
	},
	{
		xs: { span: 24 },
		sm: { span: 24 },
		md: { span: 4 },
		lg: { span: 4 }, 
	},
];

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
		HttpCodeMessage({ status: patients.status});
			
	}

	fetchPatients = async (patientName, patientID) => {
		let apiResponse;
		try{
			// eslint-disable-next-line max-len
			const apiBaseUrl = `${apiUrlPhleboSearchPatient}${this.state.selectedDateValue}`;
			const apiUrl = (patientID ? `${apiBaseUrl}/patientid/${patientID}` : `${apiBaseUrl}/patientname/${patientName}`);
			apiResponse = await axiosCall({ method: 'GET', url: apiUrl });
		}
		catch(error) {
			CustomMessage.error();
		}
		return apiResponse.data;
	}

	clearInputs = async () => {
		this.setState({
			patientID: "",
			patientName: "",
			selectedDateValue: moment().format("YYYYMMDD")
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

	handleChangeDate = (value) => {
		this.setState({ selectedDateValue: (value == null ? moment().format("YYYYMMDD") : value.format('YYYYMMDD') ) });
	}

	render() {
		const { patientID, patientName, loading } = this.state;
		const disabled = !(patientID || patientName);

		return (
			<Form className="search-patient-form" onSubmit={this.handleSubmit}>
				<Row gutter={12}>
					<Col {...formItemLayout[0]}>
						<Form.Item label="PATIENT ID">
							<Input 
								// allowClear
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
								// allowClear
								name="patientName" 
								value={patientName} 
								onChange={this.handleInputChange} 
								onFocus={this.handleFocus}
								placeholder="Lastname,Firstname"
							/>
						</Form.Item>
					</Col>
					<Col {...formItemLayout[3]}>
						<Form.Item label="SELECT DATE">
							<AntDatePicker 
								allowClear={false}
								// @ts-ignore
								defaultValue={moment()} 
								onChange={this.handleChangeDate} 
							/>
						</Form.Item>
					</Col>
					<Col {...formItemLayout[4]}>
						<Form.Item style={{ marginTop: 22 }}>
							<Row gutter={12}>
								<Col span={12}>
									<Button 
										block 
										shape="round" 
										onClick={this.clearInputs} 
									>
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
										loading={loading}
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

SearchPatientHeaderForm.propTypes = {
	populateExtractedPatients: PropTypes.func.isRequired,
	populateForExtractionPatients: PropTypes.func.isRequired,
	displayLoading: PropTypes.func,
	sessionPatientName: PropTypes.string, 
	sessionPatientID: PropTypes.string,
	populatePatients: PropTypes.func
};

SearchPatientHeaderForm.defaultProps = {
	displayLoading() { return null; },
	sessionPatientName: '',
	sessionPatientID: '',
	populatePatients() { return null; }
}

export default SearchPatientHeaderForm;
