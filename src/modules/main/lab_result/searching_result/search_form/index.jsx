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
	}
    
	onClickSubmit = (e) => {
		e.preventDefault();

		const { form, updateLabResults } = this.props;

		form.validateFieldsAndScroll((err, fieldsValue) => {
			if (!err) {
				const { dateSpan } = fieldsValue;
				const fromDate = dateSpan.length > 0 ? dateSpan[0].format('YYYYMMDD') : null;
				const toDate = dateSpan.length > 0 ? dateSpan[1].format('YYYYMMDD') : null;

				this.setState({ isLoading: true }, async() => {
					const labResults = await fetchLabResult({
						...fieldsValue,
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
		});
	}

	
	onClickClear = () => {
		const { updateLabResults } = this.props;
		const { resetFields } = this.props.form;

		resetFields();
		updateLabResults([]);
	}

	disabledDate = (current) => {
		// Prevent select days after today and today
		return current && current > moment().endOf('day');
	}

	render() {
		const { pageTitle } = this.props;
		const { getFieldDecorator } = this.props.form;
		const { isLoading } = this.state;

		return(
			<Row type="flex" justify="center" align="middle" style={{ paddingBottom: '1em' }}>
				<Col sm={22} xs={24}> 
					<Form 
						onSubmit={this.onClickSubmit} 
						id="searchlabtestresultform"
						className="labresult-search-form"
					> 
						<PageTitle pageTitle={pageTitle} />
						<Row type="flex" gutter={48}> 
							<Col lg={8} md={8} sm={10} xs={24}>
								<Form.Item label="SAMPLE ID">
									{getFieldDecorator('sampleSpecimenID', { initialValue: '' })(
										<AlphaNumInput allowClear />
									)}
								</Form.Item>
							</Col>
							<Col lg={8} md={8} sm={10} xs={24}>
								<Form.Item label="PATIENT NAME">
									{getFieldDecorator('patientName', { 
										rules: FIELD_RULES.patientName,
										initialValue: ''
									})(
										<RegexInput 
											regex={/[A-Za-z0-9 -]/} 
											allowClear 
											maxLength={100} 
										/>
									)}
								</Form.Item>
							</Col> 
							<Col lg={8} md={8} sm={10} xs={24}>   
								<Form.Item label="PATIENT ID">
									{getFieldDecorator('patientID', { 
										rules: FIELD_RULES.patientID,
										initialValue: '' 
									})(
										<AlphaNumInput allowClear />
									)}
								</Form.Item>
							</Col>
						</Row>
						<Row type="flex" align="bottom" gutter={48}>
							<Col lg={8} md={8} sm={10} xs={24}>
								<Form.Item label="FROM DATE - TO DATE">
									{getFieldDecorator('dateSpan', { 
										rules: FIELD_RULES.dateSpan,
										initialValue: [moment(new Date()), moment(new Date())]
									})(
										<RangePicker 
											allowClear 
											disabledDate={this.disabledDate}
											style={{ width:'100%' }} 
										/>
									)}
								</Form.Item>
							</Col>
							<Col lg={8} md={8} sm={10} xs={24}>
								<Form.Item label="STATUS">
									{getFieldDecorator('status', { 
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
									)}
								</Form.Item>
							</Col>
							<Col lg={8} md={8} sm={10} xs={24}>
								<Form.Item>
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

export default Form.create({ name: 'searchlabtestform' })(SearchForm);
