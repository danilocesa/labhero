// LIBRARY
import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { fetchRequestSpecimenToProcess } from 'services/phlebo/specimenTracking';
import PhleboPatientInfo from 'shared_components/patient_info';
import PatientName from './name';
import SpecimenList from './specimen';

class PhleboPatientResult extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			patientSpecimen: {},
			patientOtherInfo: {},
		};
	}

	componentDidMount() {
		const { patientInfo } = this.props;
		this.setState({ isFetchingData: true }, async () => {
			const patientSpecimens = await fetchRequestSpecimenToProcess(patientInfo.requestID);
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

			this.setState({ patientSpecimens, patientOtherInfo });
		});
	}

  render() {
		const { patientSpecimens, patientOtherInfo } = this.state;
		const { patientInfo } = this.props;

  	return (
			<Row>
				<Col 
					xs={24} 
					sm={6} 
					md={6} 
					lg={5} 
					xl={5}
				>
					<PhleboPatientInfo 
						patientInfo={patientInfo} 
						patientOtherInfo={patientOtherInfo}
						width="50%" 
					/>
				</Col>
				<Col 
					xs={24} 
					sm={18} 
					md={18} 
					lg={19} 
					xl={19} 
					style={{ padding: 25 }}
				>
					<PatientName patientInfo={patientInfo} />
					<SpecimenList 
						patientInfo={patientInfo} 
						patientSpecimens={patientSpecimens}
					/>
				</Col>
			</Row>
    );
  }
}

PhleboPatientResult.propTypes = {
	patientInfo: PropTypes.object
};

PhleboPatientResult.defaultProps = {
	patientInfo() { return null; }
}


export default PhleboPatientResult;