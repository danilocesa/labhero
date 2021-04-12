/* eslint-disable react/prop-types */
// LIBRARY
import React from 'react';
import moment from 'moment';
import { Row, Form, Button, Col, Select, DatePicker, message } from 'antd';
import PropTypes from 'prop-types';
import PageTitle from 'shared_components/page_title';
import { RegexInput, AlphaNumInput } from 'shared_components/pattern_input';
import { fetchLabResult } from 'services/lab_result/result';
import FIELD_RULES from './constant';

import './searchform.css';


const { Option } = Select;
const { RangePicker } = DatePicker;

class SearchForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
		};

		this.formRef = React.createRef();
	}
    
	search = () => {
		const { updateLabResults } = this.props;
		const fieldsValue = this.formRef.current.getFieldsValue();
		const { dateSpan, ...restProps } = fieldsValue;
		const fromDate = dateSpan ? dateSpan[0].format('YYYYMMDD') : null;
		const toDate = dateSpan ? dateSpan[1].format('YYYYMMDD') : null;

		this.setState({ isLoading: true }, async() => {
			const labResults = await fetchLabResult({
				...restProps,
				dateCategory: null,
				fromDate,
				toDate
			});

			if(labResults) {
				if(labResults.length <= 0) 
					message.info('No results found.');
				
				updateLabResults(labResults);
			}
			
			this.setState({ isLoading: false });
		});
	}

	
	onClickClear = () => {
		const { updateLabResults } = this.props;
		const { resetFields } = this.formRef.current;

		resetFields();
		updateLabResults([]);
	}

	disabledDate = (current) => {
		// Prevent select days after today and today
		return current && current > moment().endOf('day');
	}

	render() {
		const { pageTitle } = this.props;
		// const { getFieldDecorator } = this.props.form;
		const { isLoading } = this.state;

		return(
			<Row justify="center" align="middle" style={{ paddingBottom: '1em' }}>
				<Col sm={22} xs={24}> 
					<Form 
						ref={this.formRef}
						onFinish={this.search} 
						initialValues={{
							dateSpan: [moment(new Date()), moment(new Date())],
							status: 'All'
						}}
						id="searchlabtestresultform"
						className="labresult-search-form"
						layout="vertical"
					> 
						<PageTitle pageTitle={pageTitle} />
						<Row gutter={48}> 
							<Col lg={8} md={8} sm={10} xs={24}>
								<Form.Item name="sampleSpecimenID" label="SAMPLE ID">
									<AlphaNumInput allowClear />
									{/* {getFieldDecorator('sampleSpecimenID', { initialValue: '' })(
										<AlphaNumInput allowClear />
									)} */}
								</Form.Item>
							</Col>
							<Col lg={8} md={8} sm={10} xs={24}>
								<Form.Item 
									name="patientName" 
									label="PATIENT NAME"
									rules={FIELD_RULES.patientName}
								>
									<RegexInput 
										regex={/[A-Za-z0-9, -]/} 
										allowClear 
										maxLength={100} 
										placeholder="Lastname,Firstname"
									/>
									{/* {getFieldDecorator('patientName', { 
										rules: FIELD_RULES.patientName,
										initialValue: ''
									})(
										<RegexInput 
											regex={/[A-Za-z0-9 -]/} 
											allowClear 
											maxLength={100} 
										/>
									)} */}
								</Form.Item>
							</Col> 
							<Col lg={8} md={8} sm={10} xs={24}>   
								<Form.Item 
									name="patientID"
									label="PATIENT ID"
									rules={FIELD_RULES.patientID}
								>
									<AlphaNumInput allowClear />
									{/* {getFieldDecorator('patientID', { 
										rules: FIELD_RULES.patientID,
										initialValue: '' 
									})(
										<AlphaNumInput allowClear />
									)} */}
								</Form.Item>
							</Col>
						</Row>
						<Row align="top" gutter={48}>
							<Col lg={8} md={8} sm={10} xs={24}>
								<Form.Item 
									name="dateSpan" 
									label="FROM DATE - TO DATE"
									rules={FIELD_RULES.dateSpan}
								>
									<RangePicker 
										allowClear 
										disabledDate={this.disabledDate}
										style={{ width:'100%' }} 
									/>
									{/* {getFieldDecorator('dateSpan', { 
										rules: FIELD_RULES.dateSpan,
										initialValue: [moment(new Date()), moment(new Date())]
									})(
										<RangePicker 
											allowClear 
											disabledDate={this.disabledDate}
											style={{ width:'100%' }} 
										/>
									)} */}
								</Form.Item>
							</Col>
							<Col lg={8} md={8} sm={10} xs={24}>
								<Form.Item 
									name="status" 
									label="STATUS"
									rules={FIELD_RULES.status}
								>
									<Select 
										placeholder="Please select a status" 
										style={{ width: "100%" }} 
										allowClear
									>
										<Option value="All">ALL</Option> 
										<Option value="Checked In">CHECKED IN</Option> 
										<Option value="Instrument Result">INSTRUMENT RESULT</Option>
										<Option value="Preliminary">PRELIMINARY</Option>
										<Option value="Released">RELEASED</Option>
									</Select>
									{/* {getFieldDecorator('status', { 
										rules: FIELD_RULES.status,
										initialValue: 'All'
									})(
										<Select 
											placeholder="Please select a status" 
											style={{ width: "100%" }} 
											allowClear
										>
											<Option value="All">ALL</Option> 
											<Option value="Checked In">CHECKED IN</Option> 
											<Option value="Instrument Result">INSTRUMENT RESULT</Option>
											<Option value="Preliminary">PRELIMNARY</Option>
											<Option value="Released">RELEASED</Option>
										</Select>
									)} */}
								</Form.Item>
							</Col>
							<Col lg={8} md={8} sm={10} xs={24}>
								<Form.Item style={{ marginTop: 31 }}>
									<Button 
										shape="round" 
										onClick={this.onClickClear} 
										style={{ width: 120, marginRight: 10 }}
									> 
										CLEAR 
									</Button>
									<Button 
										type="primary" 
										shape="round" 
										htmlType="submit"
										loading={isLoading}
										style={{ width: 120 }}
										// disabled={isDisableSubmit}
									> 
										SEARCH 
									</Button>
								</Form.Item>
							</Col>
						</Row>
					</Form> 
				</Col>   
			</Row>
		);
	}
}

SearchForm.propTypes = {
	pageTitle: PropTypes.string.isRequired,
	updateLabResults: PropTypes.func.isRequired
};

// export default Form.create({ name: 'searchlabtestform' })(SearchForm);
export default SearchForm;
