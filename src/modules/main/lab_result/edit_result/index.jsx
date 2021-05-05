// @ts-nocheck
/* eslint-disable no-continue */
// LIBRARY
import React from 'react';
import { Row, Col, Spin } from 'antd';
import PropTypes from 'prop-types';
import { fetchLabResultExamItems } from 'services/lab_result/result';
import { fetchRequestSpecimenToProcess } from 'services/phlebo/specimenTracking';
import { UserAccessContext } from 'context/userAccess';

// CUSTOM MODULES
import PrintLabResult from 'modules/main/lab_result/print_result';
import LabRequestDetails from 'shared_components/patient_info';
import TableResults from './result_table';
import PatientName from './patientname';
import Actions from './actions';
import PatientComment from './patientcomment';


// CSS
import './edit_result.css';

class EditResult extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			results: {},
			formatedResults: [],
			patientOtherInfo: {},
			isDisplayPrint: false,
			isResultsTouched: false,
		};

		this.resultTable = React.createRef();
		this.resultRemarks = React.createRef();
	}

	componentDidMount() {
		const { examDetails, patientInfo } = this.props;

		this.setState({ isLoading: true }, async () => {
			const results = await fetchLabResultExamItems(examDetails.sampleSpecimenID);
			const patientSpecimens = await fetchRequestSpecimenToProcess(patientInfo.requestID);
			const formatedResults = this.recontructExamItems(results.resultValues);

			const { 
				hospitalRequestID, 
				physician, 
				bed, 
				visit, 
				chargeSlip, 
				officialReceipt, 
				comment, 
				location  
			} = patientSpecimens;
			
			const patientOtherInfo = {
				hospitalID: 	hospitalRequestID || '-',
				physician: 		physician
											? `${physician.namePrefix} ${physician.givenName} ${physician.lastName}`.toUpperCase() 
											: '-',
				bed: 					bed || '-',
				visit: 				visit || '-',
				chargeSlip: 	chargeSlip || '-',
				receipt:      officialReceipt || '-',
				comment:      comment || '-',
				location: 		location !== undefined ? location.name.toString().toUpperCase() : '-'
			};


			this.setState({ 
				results, 
				formatedResults,
				patientOtherInfo,
				isLoading: false 
			});
		});
		
	}

	async componentDidUpdate(prevProps) {
		const { examDetails  } = this.props;

		if(examDetails.sampleSpecimenID !== prevProps.examDetails.sampleSpecimenID) {
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ 
				isLoading: true,
				results: { resultValues: [], remarks: null }
			}, async () => {
				const results = await fetchLabResultExamItems(examDetails.sampleSpecimenID);
				const formatedResults = this.recontructExamItems(results.resultValues);
        console.log("file: index.jsx ~ line 95 ~ EditResult ~ componentDidUpdate ~ formatedResults", formatedResults)

				// eslint-disable-next-line react/no-did-update-set-state
				this.setState({ 
					results, 
					formatedResults,
					isLoading: false,
					isResultsTouched: false
				});
			});
		}
	}

	getFormValues = async () => {
		const remarks = await this.resultRemarks.getRemarks();
		const form = this.resultTable.getFormValues();
		
		return { form: { ...form }, remarks };
	}
	
	onChangeResult = () => {
		this.setState({ isResultsTouched: true });
	}

	onSaveSuccess = () => {
		const { examDetails  } = this.props;

		this.setState({ isLoading: true }, async () => {
			const results = await fetchLabResultExamItems(examDetails.sampleSpecimenID);
			const formatedResults = this.recontructExamItems(results.resultValues);

			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ 
				results, 
				formatedResults,
				isLoading: false ,
				isResultsTouched: false
			});
		});
	}

	onPrint = () => {
		this.setState({ isDisplayPrint: true });
	}

	// Private Function
	recontructExamItems = (results) => {
		const newExamItems = [];
		let currentHeader = null;
		
		if(results) {
			// eslint-disable-next-line no-plusplus
			for (let i = 0; i < results.length; i++) {
				if(results[i].examRequestItemGroup === '' || results[i].examRequestItemGroup === null) {
					newExamItems.push(results[i]);

					continue;
				}
					
				if(currentHeader !== results[i].examRequestItemGroup) {
					currentHeader = results[i].examRequestItemGroup;
					currentHeader === '1'? console.log('1') : newExamItems.push({ examItemName: currentHeader, examItemID: `header-${currentHeader}` })
					newExamItems.push({ ...results[i], isChild: true });

					continue;
				}
					
				newExamItems.push({ ...results[i], isChild: true });
			};
		}
		console.log(newExamItems,"newExamItems")
		return newExamItems;
	}

	render() {
		const { results, isLoading, formatedResults, isDisplayPrint, isResultsTouched, patientOtherInfo } = this.state;
		const { patientInfo, examDetails } = this.props;

    return (
	    <Row>
		    <Col xs={24} sm={7} md={7} lg={6} xl={6}>
			    <LabRequestDetails 
						patientInfo={patientInfo}
						patientOtherInfo={patientOtherInfo} 
					/>
		    </Col>
		    <Col xs={24} sm={17} md={17} lg={18} xl={18} className="patient-info-content">
					<PatientName 
						patientInfo={patientInfo} 
						sampleSpecimenID={examDetails.sampleSpecimenID || null}
						specimenStatus={examDetails.specimenStatus}
					/>
					<Spin spinning={isLoading}>
						<TableResults 
							// wrappedComponentRef={(inst) => this.resultTable = inst} 
							ref={(inst) => this.resultTable = inst} 
							results={results.resultValues || []} 
							resultStatus={results.status || ''}
							formatedResults={formatedResults}
							onChangeResult={this.onChangeResult}
						/>
					</Spin>
					<PatientComment 
						// wrappedComponentRef={(inst) => this.resultRemarks = inst} 
						ref={(inst) => this.resultRemarks = inst} 
						remarks={results.remarks || null} 
						resultStatus={results.status || ''}
						onChangeResult={this.onChangeResult}
					/>
					<UserAccessContext.Consumer>
						{({ userAccess }) => userAccess.result.update && 
							(
								<Actions 
									getLabResultFormValues={this.getFormValues} 
									onSaveSuccess={this.onSaveSuccess}
									onPrint={this.onPrint}
									resultStatus={results.status || ''}
									isResultsTouched={isResultsTouched}
								/>
							)
						}
					</UserAccessContext.Consumer>
					<PrintLabResult 
						sampleID={examDetails.sampleSpecimenID || null}
						requestID={patientInfo.requestID || null}
						visible={isDisplayPrint}
						onClose={() => this.setState({ isDisplayPrint: false })}
						resultStatus={results.status || ''}
					/>
		    </Col>
	    </Row>
    );
  }
}

EditResult.propTypes = {
	patientInfo: PropTypes.shape({
		requestID: PropTypes.string,
	}).isRequired,
	examDetails: PropTypes.shape({
		sampleSpecimenID: PropTypes.string,
		specimenStatus: PropTypes.string
	}).isRequired,
};

export default EditResult;
