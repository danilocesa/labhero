/* eslint-disable react/jsx-closing-tag-location */
// LIBRARY
import React from "react";
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

// CUSTOM MODULES
// import computeAge from 'shared_components/age_computation';
// import patientPhleboSpecimensAPI from 'services/patientPhleboSpecimens';


// IMAGES
import { PatientImgPlaceholder } from 'images';

// CSS
import './patient_info.css';
import patientPhleboSpecimensAPI from "services/patientPhleboSpecimens";
import computeAge from "shared_components/age_computation";

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
		const patientInfoValue = await patientPhleboSpecimensAPI(patientInfo.requestID);
    console.log("TCL: PatientInfo -> componentDidMount -> patientInfoValue", patientInfoValue);
		
		this.setState({
			hospitalID: 	patientInfoValue ? patientInfoValue.hospitalRequestID : 0,
			physicianID: 	patientInfoValue ? patientInfoValue.physician.physicianID : 0,
			bed: 					patientInfoValue ? patientInfoValue.bed : 0,
			visit: 				patientInfoValue ? patientInfoValue.visit : 0,
			chargeSlip: 	patientInfoValue ? patientInfoValue.chargeSlip : 0,
			receipt:      patientInfoValue ? patientInfoValue.officialReceipt : 0,
			comment:      patientInfoValue ? patientInfoValue.comment : 0,
			location: 		patientInfoValue ? patientInfoValue.location.name : 0
		});
	}

  render() {
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
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-item-text">
							{this.props.patientInfo.dateOfBirth}
						</Col>
					</div>
				</Row>
				<Row>
					<div className="info-item">
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
							AGE
						</Col>
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-item-text">
							{computeAge(this.props.patientInfo.dateOfBirth)}
						</Col>
					</div>
				</Row>
				<Row>
					<div className="info-item">
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
							GENDER
						</Col>
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-item-text">
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
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-item-text">
							{this.state.hospitalID}
						</Col>
					</div>
				</Row>
				<Row>
					<div className="info-item">
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
							PHYSICIAN ID
						</Col>
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-item-text">
							{this.state.physicianID}
						</Col>
					</div>
				</Row>
				<Row>
					<div className="info-item">
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
							LOCATION
						</Col>
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-item-text">
							{this.state.location}
						</Col>
					</div>
				</Row>
				<Row>
					<div className="info-item">
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
							BED
						</Col>
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-item-text">
							{this.state.bed}
						</Col>
					</div>
				</Row>
				<Row>
					<div className="info-item">
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
							VISIT
						</Col>
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-item-text">
							{this.state.visit}
						</Col>
					</div>
				</Row>
				<Row>
					<div className="info-item">
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
							CHARGE SLIP
						</Col>
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-item-text">
							{this.state.chargeSlip}
						</Col>
					</div>
				</Row>
				<Row>
					<div className="info-item">
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-title">
							RECEIPT
						</Col>
						<Col lg={{ span: 12 }} sm={{ span: 24 }} md={{ span: 12 }} xs={{ span: 12 }} className="info-item-text">
							{this.state.receipt}
						</Col>
					</div>
				</Row>
				<Row>
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