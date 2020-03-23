/* eslint-disable no-continue */
// LIBRARY
import React from 'react';
import { Row, Col, Spin } from 'antd';
import PropTypes from 'prop-types';
import { fetchLabResultExamItems } from 'services/lab_result/result';

// CUSTOM MODULES
import LabRequestDetails from 'shared_components/patient_info';
import TableResults from "./result_table";
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
			examItems: [],
			formattedExamItems: []
		};

		this.resultTable = React.createRef();
	}

	componentDidMount() {
		const { examDetails } = this.props;
		this.setState({ isLoading: true }, async () => {
			const examItems = await fetchLabResultExamItems(examDetails.sampleSpecimenID);
			const formattedExamItems = this.recontructExamItems(examItems);

			this.setState({ 
				examItems, 
				formattedExamItems,
				isLoading: false 
			});
		});
	}

	async componentDidUpdate(prevProps) {
		const { examDetails  } = this.props;
		

		if(examDetails.sampleSpecimenID !== prevProps.examDetails.sampleSpecimenID) {
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ isLoading: true }, async () => {
				const examItems = await fetchLabResultExamItems(examDetails.sampleSpecimenID);
				const formattedExamItems = this.recontructExamItems(examItems);

				// eslint-disable-next-line react/no-did-update-set-state
				this.setState({ 
					examItems, 
					formattedExamItems,
					isLoading: false 
				});
			});
		}
	}

	getFormValues = () => {
		// @ts-ignore
		return this.resultTable.getFormValues();
	}
	

	// Private Function
	recontructExamItems = (examItems) => {
		const newExamItems = [];
		let currentHeader = null;

		// eslint-disable-next-line no-plusplus
		for (let i = 0; i < examItems.length; i++) {
			if(examItems[i].examRequestItemGroup === '' || examItems[i].examRequestItemGroup === null) {
				newExamItems.push(examItems[i]);

				continue;
			}
				
			if(currentHeader !== examItems[i].examRequestItemGroup) {
				currentHeader = examItems[i].examRequestItemGroup;

				newExamItems.push({ examItemName: currentHeader, examItemID: `header-${currentHeader}` });
				newExamItems.push({ ...examItems[i], isChild: true });

				continue;
			}
				
			newExamItems.push({ ...examItems[i], isChild: true });
		};

		return newExamItems;
	}

	render() {
		const { examItems, isLoading, formattedExamItems } = this.state;
		const { patientInfo } = this.props;

    return (
	    <Row>
		    <Col xs={24} sm={7} md={7} lg={6} xl={6}>
			    <LabRequestDetails patientInfo={patientInfo} />
		    </Col>
		    <Col xs={24} sm={17} md={17} lg={18} xl={18} className="patient-info-content">
			    <PatientName patientInfo={patientInfo} />
					<Spin spinning={isLoading}>
						<TableResults 
							wrappedComponentRef={(inst) => this.resultTable = inst} 
							examItems={examItems} 
							formattedExamItems={formattedExamItems}
						/>
					</Spin>
			    <PatientComment />
			    <Actions getLabResultFormValues={this.getFormValues} />
		    </Col>
	    </Row>
    );
  }
}

EditResult.propTypes = {
	patientInfo: PropTypes.shape({
		sampleSpecimenID: PropTypes.string,
		requestID: PropTypes.string,
	}).isRequired,
	examDetails: PropTypes.object.isRequired
};

export default EditResult;
