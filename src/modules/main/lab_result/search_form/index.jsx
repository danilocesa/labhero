/* eslint-disable react/prop-types */
// LIBRARY
import React from 'react';
import moment from 'moment';
import { Row, Form, Input, Button, Col, Select, DatePicker, message } from 'antd';
import PropTypes from 'prop-types';
import PageTitle from 'shared_components/page_title';

import fetchLabResult from 'services/lab_result/result';
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
				const fromDate = dateSpan ? dateSpan[0].format('YYYYMMDD') : null;
				const toDate = dateSpan ? dateSpan[1].format('YYYYMMDD') : null;

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
		const { resetFields } = this.props.form;

		resetFields();
	}

	render() {
		const { pageTitle } = this.props;
		const { getFieldDecorator } = this.props.form;
		const { isLoading } = this.state;
		const { resultType } = this.props;
		const title = (resultType === 1 ? "EDIT LAB RESULT" : "PRINT LAB RESULT");

		return(
			<Row type="flex" justify="center" align="middle" style={{ paddingBottom: '1em' }}>
				<Col sm={22} xs={24}> 
					<Form onSubmit={this.onClickSubmit} id="searchlabtestresultform"> 
						<PageTitle pageTitle={pageTitle} />
						<Row type="flex" align="top" gutter={24}> 
							<Col className="gutter-row" lg={8} md={8} sm={10} xs={24}>
								<Form.Item label="SAMPLE ID" className="gutter-box">
									{getFieldDecorator('sampleSpecimenID', { initialValue: '' })(
										<Input allowClear />
									)}
								</Form.Item>
							</Col>
							<Col className="gutter-row" lg={8} md={8} sm={10} xs={24}>
								<Form.Item label="PATIENT NAME" className="gutter-box">
									{getFieldDecorator('patientName', { 
										rules: FIELD_RULES.patientName,
										initialValue: ''
									})(
										<Input allowClear maxLength={100} />
									)}
								</Form.Item>
							</Col> 
							<Col className="gutter-row" lg={8} md={8} sm={10} xs={24}>   
								<Form.Item label="PATIENT ID" className="gutter-box">
									{getFieldDecorator('patientID', { 
										rules: FIELD_RULES.patientID,
										initialValue: '' 
									})(
										<Input allowClear />
									)}
								</Form.Item>
							</Col>
						</Row>
						<Row type="flex" align="top" gutter={24}>
							<Col lg={8} md={8} sm={10} xs={24} offset={4} className="gutter-row">
								<Form.Item label="FROM DATE - TO DATE" className="gutter-box">
									{getFieldDecorator('dateSpan', { 
										rules: FIELD_RULES.dateSpan,
										initialValue: [moment(new Date()), moment(new Date())]
									})(
										<RangePicker 
											allowClear 
											style={{ width:'100%' }} 
										/>
									)}
								</Form.Item>
							</Col>
							<Col lg={8} md={8} sm={10} xs={24}>
								<Form.Item label="STATUS" className="gutter-box">
									{getFieldDecorator('status', { 
										rules: FIELD_RULES.status,
										initialValue: 'All'
									})(
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
							<Col lg={8} md={8} sm={10} xs={24} className="gutter-row" />
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

SearchForm.propTypes = {
	pageTitle: PropTypes.string.isRequired,
	updateLabResults: PropTypes.func.isRequired
};

export default Form.create({ name: 'searchlabtestform' })(SearchForm);
