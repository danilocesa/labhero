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
	state = {
		isLoading: false,
		examItems: []
	};

	componentDidMount() {
		const { examDetails } = this.props;
		this.setState({ isLoading: true }, async () => {
			const examItems = await fetchLabResultExamItems(examDetails.sampleSpecimenID);
			
			this.setState({ examItems, isLoading: false });
		});
	}

	async componentDidUpdate(prevProps) {
		const { examDetails  } = this.props;

		if(examDetails.sampleSpecimenID !== prevProps.examDetails.sampleSpecimenID) {
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ isLoading: true }, async () => {
				const examItems = await fetchLabResultExamItems(examDetails.sampleSpecimenID);
				
				// eslint-disable-next-line react/no-did-update-set-state
				this.setState({ examItems, isLoading: false });
			});
		}
	}
	
	render() {
		const { examItems, isLoading } = this.state;
		const { patientInfo } = this.props;

    return (
	    <Row>
		    <Col xs={24} sm={7} md={7} lg={6} xl={6}>
			    <LabRequestDetails patientInfo={patientInfo} />
		    </Col>
		    <Col xs={24} sm={17} md={17} lg={18} xl={18} className="patient-info-content">
			    <PatientName patientInfo={patientInfo} />
					<Spin spinning={isLoading}>
						<TableResults examItems={examItems} />
					</Spin>
			    <PatientComment />
			    <Actions />
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
