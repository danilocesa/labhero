/* eslint-disable func-names */
// LIBRARY
import React from 'react';
import { 
	Input as AntInput, 
	Form as AntForm, 
	Button as AntButton,
	List as AntList,
	Spin as AntSpin,
	Checkbox as AntCheckbox,
	Switch as AntSwitch,
	Alert as AntAlert,
	Col as AntCol,
	Row as AntRow
} from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

// CUSTOM MODULES
import HttpCodeMessage from 'shared_components/message_http_status';
import { RegexInput, AlphaNumInput } from 'shared_components/pattern_input';
import { fetchExamRequestList } from 'services/shared/examRequest';
import { 
	createdPanelAPI, 
	updatePanelListAPI, 
	getPanelInfoAPI 
} from 'services/settings/panelExamRequesting';
import {messagePrompts, buttonLabels, fieldLabels, fieldRules} from '../settings';

// CSS
import './panel_form.css';
const { TextArea } = AntInput;
class PanelFormTemplate extends React.Component {
	// eslint-disable-next-line no-useless-constructor
	constructor(props){
		super(props);
	}

	state = {
		examRequestData: [],
		selectedExamRequest: [],
		loading: false,
		examRequestValidation: false,
	};

	

	
	
	transferFilterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

	handleSelectedExams = selectedExamRequest => {
    this.setState({ selectedExamRequest });
  };

  onSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields( (err, values) => {
			if(err){ // Form validation error
				return;
			}

			if (this.state.selectedExamRequest === undefined || this.state.selectedExamRequest.length === 0) {
					this.setState({examRequestValidation:true});
					return;
			}

			try{
				this.setState({ loading:true });
				// eslint-disable-next-line no-unused-expressions
				this.props.drawerButton === buttonLabels.update ? this.updatePanel(values): this.createPanel(values);
			}	
			catch(errCatch) {
				HttpCodeMessage({status:500, message: e});
			}
				
		});
	};

	createPanel = async (fieldValues) => {
		const payload = {
			panelRequestName: fieldValues.panel_name,
			panelRequestCode: fieldValues.panel_code,
			panelRequestIntegrationCode: fieldValues.panel_integration_code,
			panelRequestActive: fieldValues.panel_status ? 1 : 0,
			examRequests: this.state.selectedExamRequest
		}

		const response = await createdPanelAPI(payload);

		// @ts-ignore
		if(response.status === 201){
			this.setState({ loading:false });
			const httpMessageConfig = {
				message: messagePrompts.successCreatePanel,
				// @ts-ignore
				status: response.status,
				duration: 3, 
				onClose: () => window.location.reload() 
			}
			HttpCodeMessage(httpMessageConfig);
		}
	}

	updatePanel = async (fieldValues) => {
		const payload = {
			panelRequestID: fieldValues.panel_id,
			panelRequestName: fieldValues.panel_name,
			panelRequestCode: fieldValues.panel_code,
			panelRequestIntegrationCode: fieldValues.panel_integration_code,
			panelRequestActive: fieldValues.panel_status ? 1 : 0 ,
			examRequests: this.state.selectedExamRequest
		}

		const response = await updatePanelListAPI(payload);

		// @ts-ignore
		if(response.status === 200){
			this.setState({ loading:false });
			const httpMessageConfig = {
				message: messagePrompts.successUpdatePanel,
				// @ts-ignore
				status: response.status,
				duration: 3, 
				onClose: () => window.location.reload() 
			}
			HttpCodeMessage(httpMessageConfig);
		}
		
	}

	handleInfiniteOnLoad = () => {
		const { data } = this.state;
		this.setState({
		  loading: true,
		});
		if (data.length > 14) {
		  this.setState({
				hasMore: false,
				loading: false,
		  });
		}
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const { panelInfo, drawerButton } = this.props;

		return(
			<div> 
				<AntForm onSubmit={this.onSubmit}>
					<section style={{ marginBottom: 50 }}>
						<AntRow gutter={12}>

								<AntForm.Item label={fieldLabels.id} className={panelInfo ? null : ""}>
									{getFieldDecorator('id', {
										initialValue: panelInfo.key
									})(
										<AntInput disabled />
									)}	
								</AntForm.Item>
							
								<AntForm.Item label={fieldLabels.order} className={panelInfo ? null : ""}>
									{getFieldDecorator('order', {
										initialValue: panelInfo.key
									})(
										<AntInput  />
									)}	
								</AntForm.Item>

								<AntForm.Item label={fieldLabels.categories_description} className={panelInfo ? null : ""}>
									{getFieldDecorator('order', {
										initialValue: panelInfo.key
									})(
										<AntInput  />
									)}	
								</AntForm.Item>
							
								
										
						</AntRow>
						
						
					</section>	
					<section className="drawerFooter">
						<div>
							<AntButton 
								shape="round" 
								style={{ marginRight: 10, width: 120 }} 
								onClick={this.props.onCancel}
							>
								{buttonLabels.cancel}
							</AntButton>
							<AntButton 
								type="primary" 
								shape="round" 
								htmlType="submit" 
								loading={this.state.loading} 
								style={{ margin: 10, width: 120 }}
							>
								{drawerButton}
							</AntButton>
						</div>
					</section>
				</AntForm>
			</div>
		);
	}
}

PanelFormTemplate.propTypes = {
	panelInfo: PropTypes.object,
	drawerButton: PropTypes.string.isRequired,
	form: PropTypes.object,
	onCancel: PropTypes.func
}

PanelFormTemplate.defaultProps = {
	panelInfo: null,
	form() { return null},
	onCancel() { return null}
}

const PanelForm = AntForm.create()(withRouter(PanelFormTemplate));

export default PanelForm;