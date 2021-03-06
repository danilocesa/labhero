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
import { UserAccessContext } from 'context/userAccess';
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

	componentDidMount() {
		// const userData = JSON.parse(sessionStorage.LOGGEDIN_USER_DATA);
		// const UserDatatype = userData.loginType
		// const jsonFormatAccessMatrix = JSON.parse(sessionStorage.ACCESS_MATRIX);
		// const settingsUpdateArray =  jsonFormatAccessMatrix.settings.update
		// if (settingsUpdateArray.some(data => data === UserDatatype))
		// {
		// 	this.setState({
		// 		buttonUpdateVisible:true
		// 	})
		// }
		this.getExamRequest();
		
		if(this.props.drawerButton === buttonLabels.update){
			// Get selected examrequest in db for update
			if(this.props.panelInfo){ 
				this.getSelectedExamRequest(this.props.panelInfo.key);
			}
		}
	}

	getExamRequest = async () => {
		// Get all exam request
		const examRequestListData = await fetchExamRequestList(); 
		if(examRequestListData.status !== 200){
			HttpCodeMessage({
				status: examRequestListData.status,
				message: messagePrompts.noExamFound
			});
		}

		// Assign to state
		const examRequestData = [];
		examRequestListData.data.map(function(valueExamRequest,indexExamRequest){
			examRequestData[indexExamRequest] = {
				key: valueExamRequest.examRequestID,
				title: valueExamRequest.examRequestName, 
				chosen: Math.random() * 2 > 1
			}
			return examRequestData;
		});
		this.setState({ examRequestData });
	};

	getSelectedExamRequest = async (iKey) => { 
		let dataPanel = null;
		
		try{
			dataPanel = await getPanelInfoAPI(iKey); 
		} 
		catch(e) {
			HttpCodeMessage({status:500, message: e});
		}

		const selectedExamRequest = [];
		// @ts-ignore
		// if(dataPanel.data.examRequests.length < 2 ){ return; } // Empty

		// @ts-ignore
		dataPanel.data.examRequests.map(function(valueSelectedExamRequest){
			selectedExamRequest.push(valueSelectedExamRequest.examRequestID);
			return selectedExamRequest;
		});


		this.setState({ selectedExamRequest });
	};
	
	transferFilterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

	handleSelectedExams = selectedExamRequest => {
    this.setState({ selectedExamRequest });
  };

  onSubmit = (values) => {
		// this.props.form.validateFields( (err, values) => {
			// if(err){ // Form validation error
			// 	return;
			// }

			if (this.state.selectedExamRequest === undefined || this.state.selectedExamRequest.length === 0) {
				this.setState({ examRequestValidation: true });

				return;
			}

			try{
				this.setState({ loading:true });
				// eslint-disable-next-line no-unused-expressions
				this.props.drawerButton === buttonLabels.update ? this.updatePanel(values) : this.createPanel(values);
			}	
			catch(errCatch) {
				HttpCodeMessage({ status: 500 });
			}
				
		// });
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
		const { buttonUpdateVisible } = this.state;
		const { panelInfo, drawerButton } = this.props;

		return(
			<div> 
				<AntForm 
					layout="vertical"
					onFinish={this.onSubmit}
				>
					<section style={{ marginBottom: 50 }}>
						<AntRow gutter={12}>
							<AntCol span={12}>
								<AntForm.Item 
									name="panel_id"
									label={fieldLabels.panel_id} 
									className={panelInfo ? null : "hide"}
									initialValue={panelInfo.key}
								>
									<AntInput disabled />
									{/* {getFieldDecorator('panel_id', {
										initialValue: panelInfo.key
									})(
										<AntInput disabled />
									)}	 */}
								</AntForm.Item>
							</AntCol>
							<AntCol span={12}>
								<AntForm.Item 
									name="panel_name"
									label={fieldLabels.panel_name}
									rules={fieldRules.panel_name}
									initialValue={panelInfo.panel_name}
								>
									<RegexInput	
										regex={/[A-Za-z0-9 -]/} 
										maxLength={254} 
									/>
									{/* {getFieldDecorator('panel_name', {
										initialValue: panelInfo.panel_name,
										rules: fieldRules.panel_name,
									})(
										<RegexInput	
											regex={/[A-Za-z0-9 -]/} 
										 	maxLength={254} 
										/>
									)}	 */}
								</AntForm.Item>
							</AntCol>
						</AntRow>
						<AntRow gutter={12}>
							<AntCol span={12}>
								<AntForm.Item 
									name="panel_code"
									label={fieldLabels.panel_code}
									rules={fieldRules.panel_code}
									initialValue={panelInfo.code}
								>
									<AlphaNumInput maxLength={50} />
									{/* {getFieldDecorator('panel_code', {
										initialValue: panelInfo.code,
										rules: fieldRules.panel_code,
									})(
										<AlphaNumInput maxLength={50} />
									)}	 */}
								</AntForm.Item>
							</AntCol>
							<AntCol span={12}>
								<AntForm.Item 
									name="panel_integration_code"
									label={fieldLabels.panel_integration_code}
									rules={fieldRules.panel_integration_code}
									initialValue={panelInfo.integration_code}
								>
									<AntInput maxLength={50} />
									{/* {getFieldDecorator('panel_integration_code', {
										initialValue: panelInfo.integration_code,
										rules: fieldRules.panel_integration_code,
									})(
										<AntInput maxLength={50} />
									)}	 */}
								</AntForm.Item>
							</AntCol>
						</AntRow>	
						<AntForm.Item 
							name="panel_status"
							label={fieldLabels.panel_status}
							valuePropName="checked"
							initialValue={panelInfo ? ( panelInfo.status === 1 ) : true}
						>
							<AntSwitch
								checkedChildren="ENABLE"
								unCheckedChildren="DISABLE"
							/>
							{/* {getFieldDecorator('panel_status', {
								valuePropName: 'checked',
								initialValue: panelInfo ? ( panelInfo.status === 1 ) : true
							})(
								<AntSwitch
									checkedChildren="ENABLE"
									unCheckedChildren="DISABLE"
									// checked={panelInfo ? panelInfo.status : true}
								/>
							)}	 */}
						</AntForm.Item>
						<AntForm.Item label="EXAM REQUESTS">
							{ this.state.examRequestValidation ? (
								<AntAlert
									message="Please select exam request!"
									type="error"
								/> 
								) : null
							}
							<div className="panel-infinite-container">
								<InfiniteScroll 
									initialLoad={false}
									loadMore={this.handleInfiniteOnLoad}
									pageStart={0}
									hasMore={!this.state.loading && this.state.hasMore}
									useWindow={false}
								>
									<AntCheckbox.Group 
										onChange={this.handleSelectedExams} 
										value={this.state.selectedExamRequest}
									>
										<AntList 
											size="small"
											itemLayout="vertical" 
											dataSource={this.state.examRequestData}
											renderItem={item=>(
												<AntList.Item key={item.key}>
													<AntCheckbox value={item.key}>
														{item.title}
													</AntCheckbox>
												</AntList.Item>
											)}
										>
											{this.state.loading && this.state.hasMore && (
												<div className="panel-loading-container">
													<AntSpin />
												</div>
											)}
										</AntList>
									</AntCheckbox.Group>
								</InfiniteScroll>
							</div>
						</AntForm.Item>
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
										<UserAccessContext.Consumer>
											{value => value.userAccess.settings.create && (
												<AntButton 
													type="primary" 
													shape="round" 
													htmlType="submit" 
													loading={this.state.loading} 
													style={{ margin: 10, width: 120 }}
												>
													{drawerButton}
												</AntButton>
												)}
										</UserAccessContext.Consumer>
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
	onCancel: PropTypes.func
}

PanelFormTemplate.defaultProps = {
	panelInfo: null,
	onCancel() { return null}
}

export default withRouter(PanelFormTemplate);