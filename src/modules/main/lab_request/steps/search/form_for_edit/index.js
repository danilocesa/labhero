/* eslint-disable react/prop-types */
/* eslint-disable func-names */
// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Button, Row, Col, DatePicker } from 'antd';
import { AlphaNumInput, RegexInput } from 'shared_components/pattern_input';
import Message from 'shared_components/message';
import { fetchPatientsByDate, fetchPatientsById, fetchPatientsByName } from 'services/lab_request/labRequest';
import { FIELD_RULES } from './constant';

// CSS
import './form_for_edit.css';


class SearchPatientForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false
		};

		this.formRef = React.createRef();
	}

	handleSubmit = async (formValue) => {  
    const { populatePatients } = this.props;
    const { patientID, patientName, requestDate } = formValue;
    const requestDateString = requestDate.format('YYYYMMDD');
    const isByDate = !patientID && !patientName;
    const isByName = patientName && requestDate;
    const isById = patientID && requestDate;

		let patients = [];
    let response = null;
    
    this.setState({ loading: true });
    
    if(isByDate)
      response = await fetchPatientsByDate(requestDateString); 

    if(isByName)
      response = await fetchPatientsByName({ name: patientName, date: requestDateString }); 

    if(isById)
      response = await fetchPatientsById({ id: patientID, date: requestDateString }); 

		this.setState({ loading: false });

    patients = response && response.map(item => ({ 
			...item.patientDemographics, 
			requestHeader: item.requestHeader 
		}));

    populatePatients(patients);
		// updateSearchCount();

		if(patients.length <= 0) 
			Message.info('No results found');
	}

	clearInputs = async () => {
		const { populatePatients } = this.props;
		const { setFieldsValue } = this.formRef.current;
		
		setFieldsValue({ 
      patientID: '', 
      patientName: '',
      requestDate: moment()
    });

		populatePatients([]);
	}

	handleFocusID = () => {
		const { setFieldsValue } = this.formRef.current;

		setFieldsValue({ patientName: '' });
	}

	handleFocusName = () => {
		const { setFieldsValue } = this.formRef.current;

		setFieldsValue({ patientID: '' });
	}

	render() {
		const { loading } = this.state;
	
		return (
			<Form 
				className="search-patient-form" 
				onFinish={this.handleSubmit} 
				ref={this.formRef}
				layout="vertical"
			>
				<Row gutter={12} justify="center">
					<Col xs={24} sm={24} md={6} lg={4}>
						<Form.Item 
							name="patientID"
							label="PATIENT ID"
							rules={FIELD_RULES.patientId}
						>
							<AlphaNumInput 
								onFocus={this.handleFocusID}
								maxLength={20}
							/> 
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={1} lg={1} style={{ textAlign: 'center', marginTop: 25 }}>
						OR
					</Col>
					<Col xs={24} sm={24} md={12} lg={7}>
						<Form.Item
							name="patientName"
							validateTrigger="onBlur"
							label="PATIENT NAME" 
							rules={FIELD_RULES.patientName}
						>
							<RegexInput 
								regex={/[A-Za-z0-9, -]/} 
								maxLength={100}
								onFocus={this.handleFocusName}
								placeholder="Lastname, Firstname"
							/>
						</Form.Item>
					</Col>
          <Col xs={24} sm={24} md={6} lg={4}>
            <Form.Item 
              name="requestDate" 
              label="DATE"
              initialValue={moment()}
            >
              <DatePicker 
                format="MM/DD/YYYY" 
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
					<Col xs={24} sm={24} md={6} lg={6} style={{ marginTop: 18 }}>
						<Form.Item shouldUpdate>
							{({ getFieldsValue }) => {
								const { requestDate } = getFieldsValue();

								return (
									<Row>
										<Button 
											className="form-button"
											shape="round" 
											style={{ width: 120 }}
											onClick={this.clearInputs} 
										>
											CLEAR
										</Button>
										<Button 
											className="form-button"
											shape="round" 
											type="primary" 
											htmlType="submit" 
											disabled={!requestDate}
											loading={loading}
											style={{ width: 120 }}
										>
											SEARCH
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
	// updateSearchCount: PropTypes.func.isRequired,
};



export default SearchPatientForm;
