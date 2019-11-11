// LIBRARY
import React from 'react';
import { Row, Form, Input, Button, Col, Select, Radio, DatePicker } from 'antd';
import { withRouter } from 'react-router-dom';
import ReactDatePicker from '../../../../shared_components/date_picker';

// CUSTOM MODULES
import PageTitle from '../../../../shared_components/page_title';

// CSS
import './searchform.css';

// CONSTANTS
const { Option } = Select;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class SearchLabTestForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			enableDateRange: false,
			patientID: "",
			patientName: ""
		};
		this.onClickClear = this.onClickClear.bind(this);
		this.handlePatientIdChange=this.handlePatientIdChange.bind(this);
		this.handlePatientNameChange=this.handlePatientNameChange.bind(this);
	}
    
	onClickSubmit = (e) => {
		e.preventDefault();
		this.props.form.validatesFields((err, fieldsValue) => {
			if (!err) {
				// this.props.history.push('/dashboard');
				console.log('Received values of form: ', fieldsValue);
				return;
			}
			const values = {
				'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
			};
			console.log('Received values of form: ', values);
		});
	}

	
	onClickClear = () => {
		// console.log("Clear form");
		// document.getElementById("searchlabtestresultform").reset();
		// this.setState({
		// 	patientID: "",
		// 	patientName: ""
		// });
		this.setState({ 
			patientID: "",
			patientName: ""
		// eslint-disable-next-line func-names
		}, function() { console.log("setState completed", this.state) })
	}
	
	onClickDateCategory = () => {
		this.setState({
			enableDateRange: true
		});
	}

	handlePatientIdChange = (event) => {
		this.setState({patientID : event.target.value});
		console.log(this.state.patientID);
	}

	handlePatientNameChange = (event) => {
		this.setState({patientName : event.target.value});
		console.log(this.state.patientName);
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		// const { patientID, patientName } = this.state;
		return(
			<Row type="flex" justify="center" align="middle" style={{ paddingBottom: '1em' }}>
				<Col sm={22} xs={24}> 
					<Form onSubmit={this.onClickSubmit} id="searchlabtestresultform"> 
						<PageTitle pageTitle="SEARCH" />
						<Row type="flex" align="top" gutter={24}> 
							<Col className="gutter-row" lg={8} md={8} sm={10} xs={24}>
								<Form.Item label="DATE CATEGORY" className="gutter-box">
									<RadioGroup buttonStyle="solid">
										<RadioButton value="a" onClick={this.onClickDateCategory}>REQUEST</RadioButton>
										<RadioButton value="b" onClick={this.onClickDateCategory}>VERIFY</RadioButton>
										<RadioButton value="c" onClick={this.onClickDateCategory}>CHECK-IN</RadioButton>
									</RadioGroup>
								</Form.Item>
							</Col>
							<Col className="gutter-row" lg={8} md={8} sm={10} xs={24}>
								<Form.Item label="FROM DATE - TO DATE" className="gutter-box">
									<RangePicker disabled={!this.state.enableDateRange} allowClear style={{ width:'100%' }} />
								</Form.Item>
							</Col> 
							<Col className="gutter-row" lg={8} md={8} sm={10} xs={24}>   
								<Form.Item label="STATUS" hasFeedback className="gutter-box">
									<Select placeholder="Please select a status" style={{ width: "100%" }} allowClear>
										<Option value="Status 1" />
										<Option value="Status 2" />
									</Select>
								</Form.Item>
							</Col>
						</Row>
						<Row type="flex" align="top" gutter={24}>
							<Col lg={8} md={8} sm={10} xs={24} className="gutter-row">
								<Form.Item label="PATIENT ID" className="gutter-box">
									{getFieldDecorator('PatientID', {
										rules: [
											{ pattern: '^[0-9]+$',
												message: 'Numbers only!'
											}
										],
									})(
										<Input name="patientID" onChange={this.handlePatientIdChange} allowClear />
									)}
								</Form.Item>
							</Col>
							<Col lg={8} md={8} sm={10} xs={24}>
								<Form.Item label="PATIENT NAME" className="gutter-box">
									{getFieldDecorator('PatientName', {
									rules: [
										{ max: 100, message: 'Less than 100 characters only!' },
										{ pattern: 
											'^[a-zA-Z0-9äöüÄÖÜ]*$', 
											message: 'Special character not allowed!'
										}
									],
									})(
										<Input name="patientName" onChange={this.handlePatientNameChange} id="PatientName" allowClear />
									)}
									{/* <Input name="patientName" onChange={this.handleChange} value={patientName} id="PatientName" allowClear /> */}
								</Form.Item>
							</Col>
							<Col lg={8} md={8} sm={10} xs={24} className="gutter-row">
								<Form.Item label="SAMPLE ID" className="gutter-box">
									<Input allowClear />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={24} type="flex" align="bottom">
							<Col lg={24} className="gutter-row">
								<Row gutter={6} type="flex" justify="end">
									<Col className="gutter-row">
										<Form.Item>
											<Button id="resetBtn" shape="round" onClick={this.onClickClear}> CLEAR </Button>
										</Form.Item>
									</Col>
									<Col className="gutter-row">
										<Form.Item>
											<Button type="primary" shape="round" htmlType="submit"> SEARCH </Button>
										</Form.Item>
									</Col>
								</Row>
							</Col>
						</Row>
					</Form> 
				</Col>   
			</Row>
		);
	}
}

const WrappedSearchLabTestForm = Form.create({ name: 'searchlabtestform' })(SearchLabTestForm);

export default withRouter(WrappedSearchLabTestForm);
