/* eslint-disable func-names */
// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Row, Col } from 'antd';

// CUSTOM MODULES
import axiosCall from 'services/axiosCall';
import Message from 'shared_components/message';
import { 
	apiUrlPatientByID, 
	apiUrlPatientByName, 
} from 'shared_components/constant-global';

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
		lg: { span: 8 },
	},
	{
		xs: { span: 24 },
		sm: { span: 24 },
		md: { span: 6 },
		lg: { span: 5 }, 
	},
];

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
						style={{textAlign: 'center', marginTop: 45}}
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
								placeholder="Lastname, Firstname"
							/>
						</Form.Item>
					</Col>
					<Col {...formItemLayout[3]}>
						<Form.Item style={{ marginTop: 33 }}>
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

SearchPatientForm.propTypes = {
	populatePatients: PropTypes.func.isRequired,
	storeSearchedVal: PropTypes.func,
	displayLoading: PropTypes.func,
	sessionPatientName: PropTypes.string, 
	sessionPatientID: PropTypes.string,
	apiProfile: PropTypes.string
};

SearchPatientForm.defaultProps = {
	storeSearchedVal() { return null; },
	displayLoading() { return null; },
	sessionPatientName: '',
	sessionPatientID: '',
	apiProfile: ''
}

export default SearchPatientForm;
