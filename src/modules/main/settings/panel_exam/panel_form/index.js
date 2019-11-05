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
	Alert as AntAlert
} from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

// CUSTOM MODULES
import HttpCodeMessage from 'shared_components/message_http_status';
import CustomMessage from 'shared_components/message';
import examRequestListAPI from 'services/examRequestList';
import createdPanelAPI from 'services/settings/panel/createdPanel';
import updatedPanelListAPI from 'services/settings/panel/updatePanelList';
import getPanelInfo from 'services/settings/panel/getPanelInfo';

// CSS
import './panel_form.css';

// CONSTANTS
  
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
		this.getExamRequest();
		
		if(this.props.drawerButton === "Update"){

			// Get selected examrequest in db for update
			if(this.props.panelInfo){ 
				this.getSelectedExamRequest(this.props.panelInfo.key);
			}
		}
	}

	getExamRequest = async () => {
		// Get all exam request
		const examRequestListData = await examRequestListAPI(); 
		if(examRequestListData.status !== 200){
			HttpCodeMessage({
				status: examRequestListData.status,
				message: 'No exam request found!'
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

	getSelectedExamRequest = async (i_key) => { 
		let dataPanel = null;
		try{
			dataPanel = await getPanelInfo(i_key); 
		} 
		catch(e) {
			CustomMessage.error(e);
			console.log("TCL: panelRequestDetailsAPI -> e", e);
		}
		const selectedExamRequest = [];
		if(dataPanel.data.examRequests.length < 2 ){ return; } // Empty
		dataPanel.data.examRequests.map(function(valueSelectedExamRequest){
			selectedExamRequest.push(valueSelectedExamRequest.examRequestID);
			return selectedExamRequest;
		});
		this.setState({selectedExamRequest});
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
				console.log(`thisis panel:`, this.props.panelInfo);
				// eslint-disable-next-line no-unused-expressions
				this.props.drawerButton === "Update" ? this.updatePanel(values): this.createPanel(values);
			}	
			catch(errCatch) {
				console.log("TCL: onSubmit -> errCatch", errCatch)
			}
				
		});
	};

	createPanel = async (fieldValues) => {
		console.log(1);
		const apiBody = {
			panelRequestName: fieldValues.panel_name,
			panelRequestCode: fieldValues.panel_code,
			panelRequestIntegrationCode: fieldValues.panel_integration_code,
			panelRequestActive: fieldValues.panel_status ? 1 : 0,
			examRequests: this.state.selectedExamRequest
		}

		const response = await createdPanelAPI(apiBody);
    console.log("TCL: PanelFormTemplate -> createPanel -> response", response)

		if(response.status === 201){
			this.setState({ loading:false });
			const httpMessageConfig = {
				message: 'Successfully created! Reloading page...',
				status: response.status,
				duration: 3, 
				onClose: () => window.location.reload() 
			}
			HttpCodeMessage(httpMessageConfig);
		}
	}

	updatePanel = async (fieldValues) => {
		const apiBody = {
			panelRequestID: fieldValues.panel_id,
			panelRequestName: fieldValues.panel_name,
			panelRequestCode: fieldValues.panel_code,
			panelRequestIntegrationCode: fieldValues.panel_integration_code,
			panelRequestActive: fieldValues.panel_status ? 1 : 0 ,
			examRequests: this.state.selectedExamRequest
		}

		console.log('apiBody', apiBody);

		const response = await updatedPanelListAPI(apiBody);

		console.log('fieldValues =>', typeof(fieldValues));

		if(response.status === 200){
			this.setState({ loading:false });
			const httpMessageConfig = {
				message: 'Update successful! Reloading page...',
				status: response.status,
				duration: 3, 
				onClose: () => window.location.reload() 
			}
			HttpCodeMessage(httpMessageConfig);
		}
		
	}

	handleInfiniteOnLoad = () => {
		let { data } = this.state;
		this.setState({
		  loading: true,
		});
		if (data.length > 14) {
		  console.log('Infinite List loaded all');
		  this.setState({
			hasMore: false,
			loading: false,
		  });
		  return;
		}
	  };

	render() {
		const { getFieldDecorator } = this.props.form;
		const { panelInfo } = this.props;

		return(
			<div className="panel-form"> 
				<AntForm onSubmit={this.onSubmit}>
					<AntForm.Item label="PANEL ID" className={panelInfo ? null : "hide"}>
						{getFieldDecorator('panel_id', {
							initialValue: panelInfo.key
						})(
							<AntInput disabled />
						)}	
					</AntForm.Item>
					<AntForm.Item label="PANEL NAME">
						{getFieldDecorator('panel_name', {
							initialValue: panelInfo.panel_name,
							rules: [{ required: true, message: 'Please input panel name!' }],
						})(
							<AntInput />
						)}	
					</AntForm.Item>
					<AntForm.Item label="PANEL CODE">
						{getFieldDecorator('panel_code', {
							initialValue: panelInfo.code,
							rules: [{ required: true, message: 'Please input panel code!' }],
						})(
							<AntInput />
						)}	
					</AntForm.Item>
					<AntForm.Item label="PANEL INTEGRATION CODE">
						{getFieldDecorator('panel_integration_code', {
							initialValue: panelInfo.integration_code,
							rules: [{ required: true, message: 'Please input panel integration code!' }],
						})(
							<AntInput />
						)}	
					</AntForm.Item>
					<AntForm.Item label="STATUS">
						{getFieldDecorator('panel_status', {
							valuePropName: 'checked',
							initialValue: panelInfo ? ( panelInfo.status === 1 ? true : false ) : true
						})(
							<AntSwitch
								checkedChildren="Enable"
								unCheckedChildren="Disable"
								// checked={panelInfo ? panelInfo.status : true}
							/>
						)}	
					</AntForm.Item>
					<AntForm.Item label="EXAM REQUESTS">
						{ this.state.examRequestValidation ? (
							<AntAlert
								message="Please select exam request!"
								type="error"
							/> 
							) : null
						}
						{/* <AntTransfer
							dataSource={this.state.examRequestData}
							titles={['Select', 'Selected']}
							targetKeys={this.state.selectedExamRequest}
							showSearch
							filterOption={this.transferFilterOption}
							onChange={this.transferHandleChange}
							render={item => item.title}
						/> */}
							<div className="panel-infinite-container">
							<InfiniteScroll 
							initialLoad = {false}
							loadMore={this.handleInfiniteOnLoad}
							pageStart={0}
							hasMore = {!this.state.loading && this.state.hasMore}
							useWindow = {false}
							>
								<AntCheckbox.Group onChange={this.handleSelectedExams} value={this.state.selectedExamRequest}>
									<AntList 
									itemLayout="vertical" 
									dataSource={this.state.examRequestData}
									renderItem={item=>(
										<AntList.Item key={item.key}>
											<AntCheckbox value={item.key}>
												{item.title}
											</AntCheckbox>
										</AntList.Item>
									)}>
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
					<div
						style={{
							position: 'absolute',
							left: 0,
							bottom: 0,
							width: '100%',
							borderTop: '1px solid #e9e9e9',
							padding: '10px 16px',
							background: '#fff',
							textAlign: 'right'
						}}
					>   
						<AntButton style={{ marginRight: 8 }} onClick={this.props.onCancel}>
							Cancel
						</AntButton>
						<AntButton type="primary" htmlType="submit" loading={this.state.loading}>
							{this.props.drawerButton}
						</AntButton>
					</div>
				</AntForm>
			</div>
		);
	}
}

PanelFormTemplate.propTypes = {
	panelInfo: PropTypes.object,
	drawerButton: PropTypes.string.isRequired
}

PanelFormTemplate.defaultProps = {
	panelInfo: null
}

const PanelForm = AntForm.create()(withRouter(PanelFormTemplate));

export default PanelForm;