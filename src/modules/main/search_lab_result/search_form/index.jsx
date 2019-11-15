/* eslint-disable react/prop-types */
// LIBRARY
import React from 'react';
import { Row, Form, Input, Button, Col, Select, Radio, DatePicker } from 'antd';
import { withRouter } from 'react-router-dom';
import PageTitle from 'shared_components/page_title';

import fetchLabResult from './api_repo';
import FIELD_RULES from './constant';

import './searchform.css';


const { Option } = Select;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class SearchLabTestForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			enableDateRange: false,
			isLoading: false,
			isDisableSubmit: true
		};
	}
    
	onClickSubmit = (e) => {
		e.preventDefault();

		const { form } = this.props;

		form.validateFieldsAndScroll((err, fieldsValue) => {
			if (!err) {
				this.setState({ isLoading: true }, async() => {
					console.log('Received values of form: ', fieldsValue);
					const labResults = await fetchLabResult(fieldsValue);
					console.log('labresults', labResults);

					this.setState({ isLoading: false });
				});
			}
		});
	}

	
	onClickClear = () => {
		
	}
	
	onClickDateCategory = () => {
		this.setState({ enableDateRange: true });
	}

	onChangeRequiredFields = () => {
		const { getFieldsValue } = this.props.form;

		const fieldsValue = getFieldsValue();

		console.log(fieldsValue);

		if(fieldsValue.dateCategory &&
			 fieldsValue.dateSpan &&
			 fieldsValue.status)
			this.setState({ isDisableSubmit: false });
		else
			this.setState({ isDisableSubmit: true });
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { isLoading, isDisableSubmit } = this.state;

		return(
			<Row type="flex" justify="center" align="middle" style={{ paddingBottom: '1em' }}>
				<Col sm={22} xs={24}> 
					<Form onSubmit={this.onClickSubmit} id="searchlabtestresultform"> 
						<PageTitle pageTitle="SEARCH" />
						<Row type="flex" align="top" gutter={24}> 
							<Col className="gutter-row" lg={8} md={8} sm={10} xs={24}>
								<Form.Item label="DATE CATEGORY" className="gutter-box">
									{getFieldDecorator('dateCategory')(
										<RadioGroup buttonStyle="solid" onChange={this.onChangeRequiredFields}>
											<RadioButton value="a" onClick={this.onClickDateCategory}>
												REQUEST
											</RadioButton>
											<RadioButton value="b" onClick={this.onClickDateCategory}>
												VERIFY
											</RadioButton>
											<RadioButton value="c" onClick={this.onClickDateCategory}>
												CHECK-IN
											</RadioButton>
										</RadioGroup>
									)}
								</Form.Item>
							</Col>
							<Col className="gutter-row" lg={8} md={8} sm={10} xs={24}>
								<Form.Item label="FROM DATE - TO DATE" className="gutter-box">
									{getFieldDecorator('dateSpan')(
										<RangePicker 
											disabled={!this.state.enableDateRange} 
											onChange={this.onChangeRequiredFields}
											allowClear 
											style={{ width:'100%' }} 
										/>
									)}
								</Form.Item>
							</Col> 
							<Col className="gutter-row" lg={8} md={8} sm={10} xs={24}>   
								<Form.Item label="STATUS" hasFeedback className="gutter-box">
									<Select 
										onChange={this.onChangeRequiredFields}
										placeholder="Please select a status" 
										style={{ width: "100%" }} 
										allowClear
									>
										<Option value="Status 1" />
										<Option value="Status 2" />
									</Select>
								</Form.Item>
							</Col>
						</Row>
						<Row type="flex" align="top" gutter={24}>
							<Col lg={8} md={8} sm={10} xs={24} className="gutter-row">
								<Form.Item label="PATIENT ID" className="gutter-box">
									{getFieldDecorator('patientID', { rules: FIELD_RULES.patientID })(
										<Input allowClear />
									)}
								</Form.Item>
							</Col>
							<Col lg={8} md={8} sm={10} xs={24}>
								<Form.Item label="PATIENT NAME" className="gutter-box">
									{getFieldDecorator('patientName', { rules: FIELD_RULES.patientName })(
										<Input allowClear />
									)}
								</Form.Item>
							</Col>
							<Col lg={8} md={8} sm={10} xs={24} className="gutter-row">
								<Form.Item label="SAMPLE ID" className="gutter-box">
									{getFieldDecorator('sampleSpecimenID')(
										<Input allowClear />
									)}
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={24} type="flex" align="bottom">
							<Col lg={24} className="gutter-row">
								<Row gutter={6} type="flex" justify="end">
									<Col className="gutter-row">
										<Form.Item>
											<Button shape="round" onClick={this.onClickClear}> 
												CLEAR 
											</Button>
										</Form.Item>
									</Col>
									<Col className="gutter-row">
										<Form.Item>
											<Button 
												type="primary" 
												shape="round" 
												htmlType="submit"
												loading={isLoading}
												disabled={isDisableSubmit}
											> 
												SEARCH 
											</Button>
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

export default WrappedSearchLabTestForm;
