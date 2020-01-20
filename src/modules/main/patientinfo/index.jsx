// LIBRARY
import React from 'react';
import { Row, Col, Spin } from 'antd';
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
	state = {
		isLoading: false,
		examItems: []
	};

	componentDidMount() {
		const { sampleSpecimenId } = this.props;
		this.setState({ isLoading: true }, async () => {
			const examItems = await fetchLabResultExamItems(sampleSpecimenId);
			
			this.setState({ examItems, isLoading: false });
		});
	}

	async componentDidUpdate(prevProps) {
		const { sampleSpecimenId } = this.props;

		if(sampleSpecimenId !== prevProps.sampleSpecimenId) {
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ isLoading: true }, async () => {
				const examItems = await fetchLabResultExamItems(sampleSpecimenId);
				
				// eslint-disable-next-line react/no-did-update-set-state
				this.setState({ examItems, isLoading: false });
			});
		}
	}
	
	render() {
		const { examItems, isLoading } = this.state;

    return (
	    <Row>
		    <Col xs={24} sm={7} md={7} lg={6} xl={6}>
			    <Information />
		    </Col>
		    <Col xs={24} sm={17} md={17} lg={18} xl={18} className="patient-info-content">
			    <Name />
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

PatientInfo.propTypes = {
	sampleSpecimenId: PropTypes.string.isRequired
};

export default PatientInfo;
