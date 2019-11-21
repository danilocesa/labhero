/* eslint-disable react/prop-types */
// LIBRARY
import React from 'react';
import { Row, Form, Input, Button, Col, Select, Radio, DatePicker, message } from 'antd';
import PropTypes from 'prop-types';
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
		};
	}
    
	onClickSubmit = (e) => {
		e.preventDefault();

		const { form, updateLabResults } = this.props;

		form.validateFieldsAndScroll((err, fieldsValue) => {
			if (!err) {
				const { dateSpan } = fieldsValue;

				this.setState({ isLoading: true }, async() => {
					const labResults = await fetchLabResult({
						...fieldsValue,
						fromDate: dateSpan[0].format('YYYYMMDD'),
						toDate: dateSpan[1].format('YYYYMMDD')
					});

					if(labResults) {
						if(labResults.length <= 0) 
							message.info('No results found.');
						
						console.log(labResults);
						updateLabResults(labResults);
					}
					
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

	render() {
		const { getFieldDecorator } = this.props.form;
		const { isLoading } = this.state;

		return(
			<Row type="flex" justify="center" align="middle" style={{ paddingBottom: '1em' }}>
				<Col sm={22} xs={24}> 
					<Form onSubmit={this.onClickSubmit} id="searchlabtestresultform"> 
						<PageTitle pageTitle="SEARCH" />
						<Row type="flex" align="top" gutter={24}> 
							<Col className="gutter-row" lg={8} md={8} sm={10} xs={24}>
								<Form.Item label="DATE CATEGORY" className="gutter-box">
									{getFieldDecorator('dateCategory', { rules: FIELD_RULES.dateCategory })(
										<RadioGroup buttonStyle="solid" onChange={this.onClickDateCategory}>
											<RadioButton value="Request">
												REQUEST
											</RadioButton>
											<RadioButton value="Released">
												VERIFY
											</RadioButton>
											<RadioButton value="Check In">
												CHECK-IN
											</RadioButton>
										</RadioGroup>
									)}
								</Form.Item>
							</Col>
							<Col className="gutter-row" lg={8} md={8} sm={10} xs={24}>
								<Form.Item label="FROM DATE - TO DATE" className="gutter-box">
									{getFieldDecorator('dateSpan', { rules: FIELD_RULES.dateSpan })(
										<RangePicker 
											disabled={!this.state.enableDateRange}
											allowClear 
											style={{ width:'100%' }} 
										/>
									)}
								</Form.Item>
							</Col> 
							<Col className="gutter-row" lg={8} md={8} sm={10} xs={24}>   
								<Form.Item label="STATUS" className="gutter-box">
									{getFieldDecorator('status', { rules: FIELD_RULES.status })(
										<Select 
											placeholder="Please select a status" 
											style={{ width: "100%" }} 
											allowClear
										>
											<Option value="All">All</Option> 
											<Option value="Checked In">Checked In</Option> 
											<Option value="Instrument Result">Instrument Result</Option>
											<Option value="Preliminary">Preliminary</Option>
											<Option value="Released">Released</Option>
										</Select>
									)}
								</Form.Item>
							</Col>
						</Row>
						<Row type="flex" align="top" gutter={24}>
							<Col lg={8} md={8} sm={10} xs={24} className="gutter-row">
								<Form.Item label="PATIENT ID" className="gutter-box">
									{getFieldDecorator('patientID', { 
										rules: FIELD_RULES.patientID,
										initialValue: '' 
									})(
										<Input allowClear />
									)}
								</Form.Item>
							</Col>
							<Col lg={8} md={8} sm={10} xs={24}>
								<Form.Item label="PATIENT NAME" className="gutter-box">
									{getFieldDecorator('patientName', { 
										rules: FIELD_RULES.patientName,
										initialValue: ''
									})(
										<Input allowClear />
									)}
								</Form.Item>
							</Col>
							<Col lg={8} md={8} sm={10} xs={24} className="gutter-row">
								<Form.Item label="SAMPLE ID" className="gutter-box">
									{getFieldDecorator('sampleSpecimenID', { initialValue: '' })(
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
												// disabled={isDisableSubmit}
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

SearchLabTestForm.propTypes = {
	updateLabResults: PropTypes.func.isRequired
};

export default Form.create({ name: 'searchlabtestform' })(SearchLabTestForm);
