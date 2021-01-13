import React from 'react';
import PropTypes from 'prop-types';
import {  
	Form, 
	Input, 
	Select,
	Switch,
	Button 
} from 'antd';
import { buttonLabels,messagePrompts } from '../settings';
import HttpCodeMessage from 'shared_components/message_http_status'
import { createQuestionnareAPI , updateQuestionnareAPI} from 'services/blood_bank/questionnaire';

const { TextArea } = Input;
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
  };
class AddForm extends React.Component {
	constructor(props) {
		super(props);
	}

	onFinish = async values => {
		console.log(values.categories_id,"values")
		const { drawerButton } = this.props;
		const payload = {
			questionnare_id :values.questionnare_id,
			question_order :values.question_order,
			question :values.question,
			ques_type :values.ques_type,
			is_active: (values.is_active === true) ? 1 : 0,
			created_by:1
	};
	console.log(payload,"payload")
	if(drawerButton === 'ADD'){
		const createdUserResponse = await createQuestionnareAPI(payload);
		// @ts-ignore
		if(createdUserResponse.status === 201){
			const httpMessageConfig = {
				message: messagePrompts.successCreateUser,
				// @ts-ignore
				status: createdUserResponse.status,	
				duration: 3, 	
				onClose: () => window.location.reload() 
			}
			HttpCodeMessage(httpMessageConfig);	
		}	
		}else {
			payload.categories_id = values.categories_id;
			const updateUserResponse =  await updateQuestionnareAPI(payload).catch(reason => console.log('TCL->', reason));
			// @ts-ignore)
			if(updateUserResponse.status === 200){
				const httpMessageConfig = {
					message: messagePrompts.successUpdateUser,
					// @ts-ignore
					status: updateUserResponse.status,
					duration: 3, 
					onClose: () => window.location.reload() 
				}
				HttpCodeMessage(httpMessageConfig);
			}
		}
};

	
	render() {
		const { drawerButton,selectedCategories} = this.props;
		console.log(selectedCategories)
		return (
			<div>
				<Form 
					layout="vertical"
					onFinish={this.onFinish} 
					className="exam-item-add-form" 
					style={{marginTop: -20}}
					initialValues={{ 
						is_active:selectedCategories.is_active === true ,
						questionnare_id:selectedCategories.questionnare_id,
						question_order:selectedCategories.question_order,
						question:selectedCategories.question,
						ques_type:selectedCategories.ques_type,
					}}
				>
				{this.props.drawerButton == "UPDATE"? (
					<Form.Item 
						label="ACTIVE" 
						valuePropName='checked'
						name='is_active'
						style={{marginBottom:'-40px'}}
					>	 	
							<Switch />
					</Form.Item>
					)	
						:
						null
					}
				<div className="form-section">
					<Form.Item 
						name='questionnare_id'
					>
						<Input style={{ textTransform: 'uppercase', display:'none'}} />		
					</Form.Item>
					<Form.Item 
						label="QUESTION ORDER" 
						name='question_order'
						style={{ marginTop:'-15px'}}
					>									
							<Input style={{  textTransform: 'uppercase' }}  />
					</Form.Item>
					<Form.Item 
						label="QUESTION" 
						name='question'
						style={{ marginTop:'-25px'}}
					>
							<Input style={{ textTransform: 'uppercase'}} />
					</Form.Item>
					<Form.Item 
						label="QUESTION TYPE" 	
						name='ques_type'
						style={{ marginTop:'-20px'}}
					>
								<TextArea rows={5} />
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
	selectedCategories:PropTypes.object.isRequired,
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