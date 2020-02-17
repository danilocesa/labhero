// /* eslint-disable react/prop-types */
// // LIBRARY
import React from 'react';
import { Drawer, Form, Input, Button, Select, Switch, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import {
	// Exam Item Type Codes
	EITC_NUMERIC,
} from 'global_config/constant-global';
import { RegexInput } from 'shared_components/pattern_input';

// import DynamicForm from '../dynamic_form';
import { getUnitOfMeasures, getInputTypeCode } from '../../exam_item/api_repo';
import {fieldRules, drawerTitle, fieldLabels, buttonNames} from '../settings';

import './fillup_form.css';

const { Option } = Select;
const { TextArea } = Input;

class AddForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			selectedRsType: null,
			unitOfMeasures: [],
			inputTypeCodes: []
		}

		this.dynamicForm = React.createRef();
	}
	
	async componentDidMount() {
		const unitOfMeasures = await getUnitOfMeasures();
		const inputTypeCodes = await getInputTypeCode();
		
		this.setState({ unitOfMeasures, inputTypeCodes });
	}

	onChangeItemTypeCode = (itemTypeCode) => {
		const { setFieldsValue } = this.props.form;

		if(itemTypeCode === EITC_NUMERIC)
			setFieldsValue({ examItemTypeDefault: '' });

		this.setState({ selectedRsType: itemTypeCode });
	}

	onSubmit = (event) => {
		event.preventDefault();
	}

	resetForm = () => {
		// eslint-disable-next-line react/prop-types
		const { resetFields } = this.props.form;

		resetFields();

		this.setState({ selectedRsType: null });
	}

	render() {
		const { isLoading, selectedRsType, unitOfMeasures, inputTypeCodes } = this.state;
		// eslint-disable-next-line react/prop-types
		const { onClose, visible, form } = this.props;
		// eslint-disable-next-line react/prop-types
		const { getFieldDecorator } = form;
	
		const UnitMeasureOptions = unitOfMeasures.map(unit => {
			return (
				<Option value={unit.unitOfMeasureCode} key={unit.unitOfMeasureCode}>
					{`${unit.unitOfMeasureCode} - ${unit.unitOfMesureBase}`}
				</Option>
			);
		});

		const InputTypeCodeOptions = inputTypeCodes.map(typeCode => (
			<Option value={typeCode.inputTypeCode} key={typeCode.inputTypeCode}>
				{typeCode.inputTypeName}
			</Option>
		));

		const breadCrumb = (
			<span>HEMA/BLOOD</span>
		);

		return (
			<Drawer
				title={drawerTitle.add}
				width="600"
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
			>
				{breadCrumb}
				<Form onSubmit={this.onSubmit} className="exam-item-add-form">
					<section style={{ marginBottom: 50 }}>
						<section style ={{ borderBlockColor: 'black' }} >
							<Form.Item label={fieldLabels.examItemName}>
								{getFieldDecorator('examItemName', { rules: fieldRules.examItemName })(
									<RegexInput 
										regex={/[A-Za-z0-9 -]/} 
										maxLength={200} 
									/>
								)}
							</Form.Item>
							<Form.Item label={fieldLabels.examItemGeneralName}>
								{getFieldDecorator('examItemGeneralName', { rules: fieldRules.examItemGeneralName })(
									<RegexInput 
										regex={/[A-Za-z0-9 -]/} 
										maxLength={50} 
									/>
								)}
							</Form.Item>
							<Form.Item label={fieldLabels.examItemUnitCode}>
								{getFieldDecorator('examItemUnitCode', { rules: fieldRules.unitOfMeasure })(
									<Select>{UnitMeasureOptions}</Select>
								)}
							</Form.Item>
						</section>
						<Row type="flex" justify="end">
							<Col span={5}>
								<Form.Item label={fieldLabels.print} labelCol={{span: 12}}>
									{getFieldDecorator('print', {
										initialValue: true,
										valuePropName: 'checked'
									})(
										<Switch />
									)}
								</Form.Item>
							</Col>
							<Col span={6}>
								<Form.Item label={fieldLabels.release} labelCol={{ span:12}} wrapperCol={{ span:1 }}>
									{getFieldDecorator('release',{
										initialValue: true,
										valuePropName: 'checked'
									})(
										<Switch />
									)}
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={24}>
							<Col span={10}>
								<Form.Item label={fieldLabels.gender}>
								{getFieldDecorator('gender', {
									initialValue: 0,
								})(
									<Select>
										<Option value="0">Please Select</Option>
										<Option value="1">Female</Option>
										<Option value="2">Male</Option>
									</Select>
								)}
								</Form.Item>
							</Col>
							<Col span={14}>						
								<Form.Item label={fieldLabels.ageBracket}>
									{getFieldDecorator('ageBracket')(
										<Select>
											<Option value="0">Please Select</Option>
											<Option value="1">1</Option>
											<Option value="2">2</Option>
										</Select>
									)}
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={14}>
								<Form.Item label={fieldLabels.machine}>
								{getFieldDecorator('machine')(
									<Input />
								)}
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={14}>
								<Form.Item label={fieldLabels.labelOfRange}>
								{getFieldDecorator('labelOfRange')(
									<Input />
								)}
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={14}>							
								<Form.Item label={fieldLabels.displayValue}>
								{getFieldDecorator('displayValue')(
									<Input />
								)}
								</Form.Item>						
							</Col>
						</Row>
						<Row gutter={24}>
							<Col span={6}>
								<Form.Item label={fieldLabels.low}>
								{getFieldDecorator('low')(
									<Input />
								)}
								</Form.Item>
							</Col>
							<Col span={18}>
								<Form.Item label={fieldLabels.displayFlag}>
								{getFieldDecorator('lowFlag')(
									<Input />
								)}
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={24}>
							<Col span={6}>
								<Form.Item label={fieldLabels.high}>
								{getFieldDecorator('high')(
									<Input />
								)}
                        		</Form.Item>
							</Col>
							<Col span={18}>
								<Form.Item label={fieldLabels.displayFlag}>
								{getFieldDecorator('highFlag')(
									<Input />
								)}
		                        </Form.Item>
							</Col>
						</Row>
					</section>
					<section className="drawerFooter">
						<div>
							<Button 
								shape="round" 
								style={{ margin: 10, width: 120 }}
								onClick={onClose}
							>
								{buttonNames.cancel}
							</Button>
							<Button 
								shape="round" 
								type="primary" 
								htmlType="submit"
								loading={isLoading}
								style={{ margin: 10, width: 120 }}
							>
								{buttonNames.create}
							</Button>
						</div>
					</section>
				</Form>
			</Drawer>
		);
	}
}

AddForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
	onSuccess: PropTypes.func.isRequired,
	selectedSectionId: PropTypes.number,
	selectedSpecimenId: PropTypes.number
};

AddForm.defaultProps = {
	selectedSectionId: null,
	selectedSpecimenId: null
};

export default Form.create()(AddForm);