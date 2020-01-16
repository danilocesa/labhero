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
	state = {
		examItems: []
	};

	componentDidMount() {
	
	}

	async componentDidUpdate(prevProps) {
		const { sampleSpecimenId } = this.props;

		if(sampleSpecimenId !== prevProps.sampleSpecimenId) {
			const examItems = await fetchLabResultExamItems(sampleSpecimenId);
			
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ examItems });
		}
	}
	

	handleSave = row => {
		const { examItems } = this.state;
    const newData = [...examItems];
    const index = newData.findIndex(item => row.examItemID === item.examItemID);
		const item = newData[index];
		
		console.log('rowVal', row);
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ examItems: newData });
  };

	render() {
		const { examItems } = this.state;

    return (
	    <Row>
		    <Col xs={24} sm={7} md={7} lg={6} xl={6}>
			    <Information />
		    </Col>
		    <Col xs={24} sm={17} md={17} lg={18} xl={18} className="patient-info-content">
			    <Name />
					<TableResults 
						examItems={examItems} 
						handleSave={this.handleSave}
					/>
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
