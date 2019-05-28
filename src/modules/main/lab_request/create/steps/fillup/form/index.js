import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { Form, Input, Row, Col, Typography, DatePicker, Radio, Divider, Select } from 'antd';

// CUSTOM MODULES
import hospitalLocationAPI from 'services/hospitalLocation';
import hospitalPhysiciansAPI from 'services/hospitalPhysicians';
import { CLR_TESTS } from '../../constants';

// CSS
import './form.css';

// CONSTANTS
const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

class FillupForm extends React.Component { 
	state = {
		hospitalLocationList : [],
		hospitalPhysicianList : []
	}

	componentWillMount() {
		const { location, updateState } = this.props;
		const sessionFields = sessionStorage.getItem(CLR_TESTS);

		if(location.state) {
			const age = this.computeAge(location.state.record.dateOfBirth);

			updateState({ ...location.state.record, age });
		}

		else if(sessionFields) {
			updateState({ ...JSON.parse(sessionFields) });
		}

	}

	async componentDidMount() {
		const hospitalLocAPI = await hospitalLocationAPI;
		const hospitalPhyAPI = await hospitalPhysiciansAPI;
		
		this.setState({ 
			hospitalLocationList : hospitalLocAPI.data,
			hospitalPhysicianList : hospitalPhyAPI.data
		})
		console.log( this.state.hospitalLocationList);
	}

	onInputChange = (event) => {
		const { updateState } = this.props;
		
		updateState({
			[event.target.name]: event.target.value
		});
	}

	onDateChange = (date) => {
		const { updateState } = this.props;
		const age = this.computeAge(date);

		updateState({ dateOfBirth: date, age });
	}

	computeAge = (date) => {
		const formattedDate = moment(date, 'MM-DD-YYYY');
		const years = Math.floor(moment().diff(formattedDate, 'years', true));
		const age = years > 0 ? years : '-----';

		return age;
	}

	render() {
		const { fields } = this.props;
		const { 
			hospitalID, 
			patientID,
			givenName, 
			nameSuffix,
			lastName, 
			middleName, 
			dateOfBirth, 
			age, 
			sex, 
			contactNo,
			emailAddress,
			address,
			visit,
			chargeSlip,
			officialReceipt,
			bed,
			comment
		} = fields;

		const dob = dateOfBirth ? moment(dateOfBirth, 'MM-DD-YYYY') : null;

		const LocationList = (
			this.state.hospitalLocationList.map((item) => (
					<Option value={item.locationID} key={item.locationID}>{item.name}</Option>
			))
		);

		const PhysicianList = (
			this.state.hospitalPhysicianList.map((item) => (
					<Option value={item.physicianID} key={item.physicianID}>{`${item.givenName} ${item.lastName}`}</Option>
			))
		);

		return (
			<div style={{ marginTop: 50 }}>
				<Form className="fillup-form">
					<Row gutter={12}>
						<Col sm={12} md={11}>
							<div className="left-form">
								<div style={{ padding: '10px 0px' }}>
									<Text strong>PERSONAL INFORMATION</Text>
								</div>
								<Form.Item label="HOSPITAL ID">
									<Input 
										name="hospitalID" 
										onChange={this.onInputChange} 
										value={hospitalID}
									/>
								</Form.Item>
								<Form.Item label="PATIENT ID">
									<Input 
										name="patientID" 
										disabled
										onChange={this.onInputChange} 
										value={patientID}
									/>
								</Form.Item>
								<Form.Item label="FIRST NAME">
									<Input 
										name="givenName" 
										onChange={this.onInputChange} 
										value={givenName}
									/>
								</Form.Item>
								<Form.Item label="MIDDLE NAME">
									<Input 
										name="middleName" 
										onChange={this.onInputChange} 
										value={middleName}
									/>
								</Form.Item>
								<Row gutter={12}>
									<Col span={18}>
										<Form.Item label="LAST NAME">
											<Input 
												name="lastName" 
												onChange={this.onInputChange} 
												value={lastName}
											/>
										</Form.Item>
									</Col>
									<Col span={6}>
										<Form.Item label="SUFFIX">
											<Input 
												name="suffix" 
												onChange={this.onInputChange} 
												value={nameSuffix}
											/>
										</Form.Item>
									</Col>
								</Row>
								<Row gutter={12}>
									<Col span={18}>
										<Form.Item label="DATE OF BIRTH">
											<DatePicker 
												name="dateOfBirth" 
												value={dob}
												onChange={this.onDateChange} 
												format="MM-DD-YYYY"
												style={{ width: '100%' }}
											/>
										</Form.Item>
									</Col>
									<Col span={6}>
										<Form.Item label="AGE">
											<Input
												name="age" 
												value={age} 
												disabled
												style={{ textAlign: 'center' }}
											/>
										</Form.Item>
									</Col>
								</Row>
								<Row>
									<Form.Item label="PATIENT'S GENDER">
										<Radio.Group 
											defaultValue={sex} 
											buttonStyle="solid"
											name="sex" 
											onChange={this.onInputChange} 
											value={sex}
										>
											<Radio.Button value="MALE">MALE</Radio.Button>
											<Radio.Button value="FEMALE">FEMALE</Radio.Button>
										</Radio.Group>
									</Form.Item>
								</Row>
								<Row>
									<Form.Item label="CONTACT NO.">
										<Input 
											name="contactNo" 
											onChange={this.onInputChange} 
											value={contactNo}
										/>
									</Form.Item>
								</Row>
								<Row>
									<Form.Item label="EMAIL ADDRESS">
										<Input 
											name="emailAddress" 
											onChange={this.onInputChange} 
											value={emailAddress}
										/>
									</Form.Item>
								</Row>
								<Row>
									<Form.Item label="ADDRESS">
										<Input 
											name="address" 
											onChange={this.onInputChange} 
											value={address}
										/>
									</Form.Item>
								</Row>
							</div>
						</Col>
						<Col md={{ span: 2 }} style={{ textAlign: 'center' }}>
							<Divider className="divider" type="vertical" style={{ height: 620 }} />
						</Col>
						<Col sm={{ span: 12 }} md={{ span: 11 }}>
							<div className="right-form">
								<div style={{ padding: '10px 0px' }}>
									<Text strong>OTHER INFORMATION</Text>
								</div>
								<Form.Item label="LOCATION">
									<Select placeholder="Select a location" allowClear>
										{LocationList}
									</Select>
								</Form.Item>
								<Form.Item label="PHYSICIAN ID">
									<Select placeholder="Select a physician" allowClear>
										{PhysicianList}
									</Select>
								</Form.Item>
								<Form.Item label="VISIT">
									<Input 
										name="visit" 
										onChange={this.onInputChange} 
										value={visit}
									/>
								</Form.Item>
								<Form.Item label="CHARGE SLIP">
									<Input 
										name="chargeSlip" 
										onChange={this.onInputChange} 
										value={chargeSlip}
									/>
								</Form.Item>
								<Form.Item label="OFFICIAL RECEIPT">
									<Input 
										name="officialReceipt" 
										onChange={this.onInputChange} 
										value={officialReceipt}
									/>
								</Form.Item>
								<Form.Item label="BED">
									<Input 
										name="bed" 
										onChange={this.onInputChange} 
										value={bed}
									/>
								</Form.Item>
								<Form.Item label="COMMENT">
									<TextArea 
										rows={3} 
										name="comment" 
										onChange={this.onInputChange} 
										value={comment}
									/>
								</Form.Item>
							</div>
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
}

FillupForm.propTypes = {
	fields: PropTypes.shape({
		// hospitalID: PropTypes.string.isRequired, 
		// patientID: PropTypes.string.isRequired,
		givenName: PropTypes.string.isRequired, 
		lastName: PropTypes.string.isRequired, 
		nameSuffix: PropTypes.string.isRequired,
		middleName: PropTypes.string.isRequired, 
		dateOfBirth: PropTypes.any.isRequired,
		age: PropTypes.any.isRequired,
		sex: PropTypes.string.isRequired, 
		// contactNo: PropTypes.string.isRequired,
		// emailAddress: PropTypes.string.isRequired,
		// address: PropTypes.string.isRequired,
		// location: PropTypes.string.isRequired, 
		physicianId: PropTypes.string.isRequired, 
		// visit: PropTypes.string.isRequired,
		// chargeSlip: PropTypes.string.isRequired,
		// officialReceipt: PropTypes.string.isRequired,
		// bed: PropTypes.string.isRequired,
		comment: PropTypes.string.isRequired, 
	}).isRequired,
	updateState: PropTypes.func.isRequired,
	location: ReactRouterPropTypes.location.isRequired
};


export default withRouter(FillupForm);
