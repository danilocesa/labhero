import React from 'react';
import { Row, Col, Typography } from 'antd';
import hospitalLocationAPI from 'services/lab_request/hospitalLocation';
import hospitalPhysiciansAPI from 'services/lab_request/hospitalPhysicians';
import { CLR_PERSONAL_INFO, CLR_OTHER_INFO } from '../../constants';

import './section.css';

const { Text } = Typography;

const leftSectionLayout = {
	sm: { span: 24 },
	lg: { span: 4 },
};

const rightSectionLayout = {
	sm: { span: 24 },
	lg: { span: 20 },
};

class SummarySection extends React.Component {
	state = {
		personalInfo: {
			givenName: '',
			nameSuffix: '',
			lastName: '',
			middleName: '',
			dateOfBirth: '',
			sex: '',
		},
		otherInfo: {
			bed: '',
			chargeSlip: '',
			comment: '',
			locationID: '',
			locationName: '',
			officialReceipt: '',
			patientAge: '',
			patientID: '',
			physicianID: '',
			physicianName: '',
			visit: ''
		}
	}

	
	async componentDidMount() {
		const { personalInfo, otherInfo } = this.state;
		const sessPersInfo = JSON.parse(sessionStorage.getItem(CLR_PERSONAL_INFO)) || personalInfo;
		const sessOtherInfo = JSON.parse(sessionStorage.getItem(CLR_OTHER_INFO)) || otherInfo;
		
		const hospitalLocations = await hospitalLocationAPI();
		const physicians = await hospitalPhysiciansAPI();
		
		const location = hospitalLocations.find(loc => loc.locationID === sessOtherInfo.locationID);
		const physician = physicians.find(phys => phys.physicianID === sessOtherInfo.physicianID); 	
		
		this.setState(() => ({ 
			personalInfo: sessPersInfo,
			otherInfo: { 
				...sessOtherInfo, 
				locationName: location ? location.name : '',
				physicianName: physician 
					? `${physician.namePrefix} ${physician.givenName} ${physician.lastName}`
					: '' 
			} 
		}));
	}

	render() {
		const {
			givenName,
			nameSuffix,
			lastName,
			middleName,
			dateOfBirth,
			sex
		} = this.state.personalInfo;
		
		const {
			bed,
			chargeSlip,
			comment,
			locationName,
			patientAge,
			physicianName,
			visit
		} = this.state.otherInfo;

		return (
			<div className="request-summary">
				<Row>
					<Col sm={24} lg={{ span: 18, offset: 3 }}>
						<Row style={{ textAlign: 'center' }}>
							<Text strong style={{ fontSize: 18 }}>
								REQUEST SUMMARY
							</Text>
						</Row>
						<Row style={{ marginTop: 30 }}>
							<Col {...leftSectionLayout}>
								<Text strong>PATIENT NAME</Text>
							</Col>
							<Col {...rightSectionLayout}>
								<Text>{`${givenName} ${middleName} ${lastName} ${nameSuffix || ''}`}</Text>
							</Col>
						</Row>
						<Row>
							<Col {...leftSectionLayout}>
								<Text strong>DATE OF BIRTH</Text>
							</Col>
							<Col {...rightSectionLayout}>
								<Text>{`${dateOfBirth} - ${patientAge} YEARS OLD`}</Text>
							</Col>
						</Row>
						<Row>
							<Col {...leftSectionLayout}>
								<Text strong>GENDER</Text>
							</Col>
							<Col {...rightSectionLayout}>
								<Text>{sex.toString().toUpperCase()}</Text>
							</Col>
						</Row>
						<Row>
							<Col {...leftSectionLayout}>
								<Text strong>LOCATION</Text>
							</Col>
							<Col {...rightSectionLayout}>
								<Text>{locationName.toString().toUpperCase()}</Text>
							</Col>
						</Row>
						<Row>
							<Col {...leftSectionLayout}>
								<Text strong>PHYSICIAN</Text>
							</Col>
							<Col {...rightSectionLayout}>
								<Text>{physicianName ? physicianName.toString().toUpperCase() : '----'}</Text>
							</Col>
						</Row>
						<Row>
							<Col {...leftSectionLayout}>
								<Text strong>BED</Text>
							</Col>
							<Col {...rightSectionLayout}>
								<Text>{bed ? bed.toString().toUpperCase() : '----'}</Text>
							</Col>
						</Row>
						<Row>
							<Col {...leftSectionLayout}>
								<Text strong>VISIT</Text>
							</Col>
							<Col {...rightSectionLayout}>
								<Text>{visit ? visit.toString().toUpperCase() : '----'}</Text>
							</Col>
						</Row>
						<Row>
							<Col {...leftSectionLayout}>
								<Text strong>AMOUNT</Text>
							</Col>
							<Col {...rightSectionLayout}>
								<Text>{chargeSlip ? chargeSlip.toString().toUpperCase() : '----'}</Text>
							</Col>
						</Row>
						<Row>
							<Col {...leftSectionLayout}>
								<Text strong>COMMENT</Text>
							</Col>
							<Col {...rightSectionLayout}>
								<Text>{comment ? comment.toString().toUpperCase() : '----'}</Text>
							</Col>	
						</Row>
					</Col>
				</Row>
			</div>
		);
	}
}

export default SummarySection;
