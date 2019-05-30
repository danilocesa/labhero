/* eslint-disable react/jsx-closing-tag-location */
// LIBRARY
import React from "react";
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

// CUSTOM MODULES
import computeAge from 'shared_components/age_computation';
import patientPhleboSpecimensAPI from 'services/patientPhleboSpecimens';


// IMAGES
import { PatientImgPlaceholder } from 'images';

// CSS
import './patient_info.css';

class PatientInfo extends React.Component {

	state = {
		hospitalID: '',
		physicianID: '',
		bed: '',
		visit: '',
		chargeSlip: '',
		receipt: '',
		comment: '',
		location: ''
	};

	async componentDidMount(){
		const {patientInfo} = this.props
		const patientInfoValue = await patientPhleboSpecimensAPI(patientInfo.requestID)
		this.setState({
			hospitalID: patientInfoValue.hospitalRequestID,
			physicianID: patientInfoValue.physician.physicianID,
			bed: patientInfoValue.bed,
			visit: patientInfoValue.visit,
			chargeSlip: patientInfoValue.chargeSlip,
			receipt: patientInfoValue.officialReceipt,
			comment: patientInfoValue.comment,
			location: patientInfoValue.location.name
		});
	}

  render() {
<<<<<<< HEAD
=======
		// const { patientInfo } = this.props; 
>>>>>>> 32eb74c494779df4a7ee8de411c4257efd93e275
    return (
	    <div>
		    {/* Patient Image Placeholder */}
		  	<div className="patient-img">
			    <img src={PatientImgPlaceholder} className="image-placeholder" alt="patient" />
      	</div>

				{/* Personal Information */}
				<div className="info-container">
					<span className="main-title">Personal Information</span>
					<Row>
						<div className="info-item">
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
											BIRTHDATE
							</Col>
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
											{this.props.patientInfo.dateOfBirth}
							</Col>
						</div>
						<div className="info-item">
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
											AGE
							</Col>
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
											{computeAge(this.props.patientInfo.dateOfBirth)}
							</Col>
						</div>
						<div className="info-item">
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
											GENDER
							</Col>
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
											{this.props.patientInfo.sex}
							</Col>
						</div>
					</Row>
  </div>
		{/* Other Information */}
		<div className="info-container">
					<span className="main-title">Other Information</span>
					<Row>
						<div className="info-item">
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
								HOSPITAL ID
							</Col>
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
								{this.state.hospitalID}
							</Col>
						</div>
						<div className="info-item">
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
								PHYSICIAN ID
							</Col>
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
							{this.state.physicianID}
							</Col>
						</div>
						<div className="info-item">
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
								LOCATION
							</Col>
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
								{this.state.location}
							</Col>
						</div>
						<div className="info-item">
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
								BED
							</Col>
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
								{this.state.bed}
							</Col>
						</div>
						<div className="info-item">
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
								VISIT
							</Col>
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
								{this.state.visit}
							</Col>
						</div>
						<div className="info-item">
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
								CHARGE SLIP
							</Col>
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
								{this.state.chargeSlip}
							</Col>
						</div>
						<div className="info-item">
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
								RECEIPT
							</Col>
							<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }}>
								{this.state.receipt}
							</Col>
						</div>
						<br />
						<div className="info-item">
							<Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} className="info-title">
								COMMENT
							</Col>
							<Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }}>
								{this.state.comment}
							</Col>
						</div>
					</Row>
  </div>
     </div>
    );
  }
}    

PatientInfo.propTypes = {
	patientInfo: PropTypes.object
};

PatientInfo.defaultProps = {
	patientInfo() { return null; }
}

export default PatientInfo;