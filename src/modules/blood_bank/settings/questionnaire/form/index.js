import React from 'react';
import PropTypes from 'prop-types';
import {  Form, Input, InputNumber,Button,Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

class AddForm extends React.Component {
	render() {
		const { drawerButton} = this.props;
			return (
				<div>
					<Form 
						layout="vertical"
						className="exam-item-add-form" 
						style={{marginTop: -20}}
					>
					<div className="form-section">
						<Form.Item 
							label="QUESTION ORDER" 
							name='question_order'
						>									
								<InputNumber  style={{  textTransform: 'uppercase' , width: '100%'}}  />
						</Form.Item>
						<Form.Item 
							label="QUESTION" 
							name='question'
						>
								<TextArea style={{ textTransform: 'uppercase'}} />
						</Form.Item>
						<Form.Item 
							label="QUESTION TYPE" 	
							name='ques_type'
						>
							<Select style={{ width: '100%' }} placeholder="SELECT QUESTION TYPE">
								<Option value="combo_box">
									COMBO BOX
								</Option>
							</Select>	
						</Form.Item>
					</div>			
						<section className="drawerFooter">
							<Button shape="round" style={{ marginRight: 8, width: 120 }} onClick={this.props.onClose}>
								CANCEL
							</Button>
							<Button type="primary" shape="round" style={{ margin: 10, width: 120 }} htmlType="submit">
								{drawerButton}
							</Button>
						</section>
					</Form>
				</div>
			);
	}
}

AddForm.propTypes = {
	drawerButton: PropTypes.string.isRequired,
	onSuccess: PropTypes.func.isRequired,
	selectedSectionId: PropTypes.number,
  selectedSpecimenId: PropTypes.number,
	actionType: PropTypes.string
};

AddForm.defaultProps = {
	selectedSectionId: null,
	selectedSpecimenId: null,
};

// export default Form.create()(AddForm);
export default AddForm;