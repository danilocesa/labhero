/* eslint-disable react/prop-types */
/* eslint-disable func-names */
// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Button, Row, Col, DatePicker } from 'antd';
import { AlphaNumInput, RegexInput } from 'shared_components/pattern_input';

// CUSTOM MODULES
import { axiosLabAPI } from 'services/axios';
import Message from 'shared_components/message';
import { 
	apiUrlPatientByID, 
	apiUrlPatientByName, 
	apiGetMethod
} from 'global_config/constant-global';
import { buttonNames, fieldLabels, FIELD_RULES } from './settings';

// CSS
import './search_patient_form.css';

const dateFormat = 'MM/DD/YYYY';

class SearchPatientForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false
		};

		this.formRef = React.createRef();
	}

	handleSubmit = async () => {  
		const { getFieldsValue } = this.formRef.current;

		const { patientID, patientName } = getFieldsValue();
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
			const response = await axiosLabAPI({
				method: apiGetMethod,
        url: (patientID ? `${apiUrlPatientByID}${patientID}` : `${apiUrlPatientByName}${patientName}`)
			});
			
			const { data } = await response;
			
			patients = data ? data.patient : [];
		}
		catch(error) {
			Message.error();
		}


		return patients;
	}

	clearInputs = async () => {
		const { populatePatients } = this.props;
		const { setFieldsValue } = this.formRef.current;
		let patients = [];
		
		setFieldsValue({ patientID: '', patientName: '' });
		patients = []; 

		populatePatients(patients);
	}

	handleFocus = (event) => {
		const { setFieldsValue } = this.formRef.current;

		if(event.target.name === 'patientID')
			setFieldsValue({ patientName: '' });
		
		if(event.target.name === 'patientName')	
			setFieldsValue({ patientID: '' });
	}

	render() {
		const { enableRequestDate } = this.props;
		const { loading } = this.state;
	

		return (
			<Form 
				className="search-patient-form" 
				onFinish={this.handleSubmit} 
				ref={this.formRef}
				layout="vertical"
			>
				<Row gutter={12} justify="center">
					{/* Patient id field */}
					<Col xs={24} sm={24} md={6} lg={4}>
						<Form.Item 
							name="patientID"
							label={fieldLabels.patientID}
							rules={FIELD_RULES.patientId}
						>
							<AlphaNumInput 
								onFocus={this.handleFocus}
								maxLength={20}
							/> 
							{/* {getFieldDecorator('patientID', { 
								rules: FIELD_RULES.patientId,
							})(
								<AlphaNumInput 
									name="patientID" 
									onFocus={this.handleFocus}
									maxLength={20}
								/> 
							)} */}
						</Form.Item>
					</Col>
					{/* Or */}
					<Col xs={24} sm={24} md={1} lg={1} style={{ textAlign: 'center', marginTop: 25 }}>
						OR
					</Col>
					{/* Patient Name */}
					<Col xs={24} sm={24} md={12} lg={7}>
						<Form.Item
							name="patientName"
							validateTrigger="onBlur"
							label={fieldLabels.patientName} 
							rules={FIELD_RULES.patientName}
						>
							<RegexInput 
								regex={/[A-Za-z0-9, -]/} 
								maxLength={100}
								onFocus={this.handleFocus}
								placeholder="Lastname, Firstname"
							/>
							{/* {getFieldDecorator('patientName', { 
								rules: FIELD_RULES.patientName,
								validateTrigger: 'onBlur'
							})(
								<RegexInput 
									regex={/[A-Za-z0-9, -]/} 
									name="patientName" 
									maxLength={100}
									onFocus={this.handleFocus}
									placeholder="Lastname, Firstname"
								/>
							)} */}
						</Form.Item>
					</Col>
					{/* Request date */}
					{ (enableRequestDate === true) ? 
						(
							<Col xs={24} sm={24} md={6} lg={4} style={{ marginTop: 20 }}>
								<Form.Item label={fieldLabels.requestDate}>
									<DatePicker 
										defaultValue={moment()} 
										format={dateFormat} 
										style={{ width: '100%' }}
									/>
								</Form.Item>
							</Col>
						) : null 
					}
					{/* Buttons */}
					<Col xs={24} sm={24} md={6} lg={6} style={{ marginTop: 20 }}>
						<Form.Item shouldUpdate>
							{({ getFieldsValue }) => {
								const { patientID, patientName } = getFieldsValue();
								const disabled = !(patientID || (patientName && patientName.length > 1));

								return (
									<Row>
										<Button 
											className="form-button"
											shape="round" 
											style={{ width: 120 }}
											onClick={this.clearInputs} 
										>
											{buttonNames.clear}
										</Button>
										<Button 
											className="form-button"
											shape="round" 
											type="primary" 
											htmlType="submit" 
											disabled={disabled}
											loading={loading}
											style={{ width: 120 }}
										>
											{buttonNames.search}
										</Button>
									</Row>
								);
							}}
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
	enableRequestDate: PropTypes.bool
};

SearchPatientForm.defaultProps = {
	storeSearchedVal() { return null; },
	enableRequestDate: true,
}

// export default Form.create()(SearchPatientForm);
export default SearchPatientForm;
