// LIBRARY
import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { fetchLabResultExamItems } from 'services/lab_result/result';

// CUSTOM MODULES
import Information from "./information";
import TableResults from "./tableresults";
import Name from './patientname';
import Actions from './actions';
import PatientComment from './patientcomment';

// CSS
import './layout.css';

class PatientInfo extends React.Component {
	
	async componentDidUpdate(prevProps) {
		const { sampleSpecimenId } = this.props;

		console.log('patient Info did update', sampleSpecimenId);
		console.log('prevprops', prevProps);

		if(sampleSpecimenId !== prevProps.sampleSpecimenId && sampleSpecimenId) {
			const examItems = await fetchLabResultExamItems(sampleSpecimenId);
			console.log(examItems);
		}
	}
	
	render() {
    return (
	    <Row>
		    <Col xs={24} sm={7} md={7} lg={6} xl={6}>
			    <Information />
		    </Col>
		    <Col xs={24} sm={17} md={17} lg={18} xl={18} className="patient-info-content">
			    <Name />
			    <TableResults />
			    <PatientComment />
			    <Actions />
		    </Col>
	    </Row>
    );
  }
}

PatientInfo.propTypes = {
	sampleSpecimenId: PropTypes.string.isRequired
};

export default PatientInfo;
