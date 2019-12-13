import React from 'react';
import { Row, Col, Typography } from 'antd';
import hospitalLocationAPI from 'services/lab_request/hospitalLocation';
import hospitalPhysiciansAPI from 'services/lab_request/hospitalPhysicians';
import { CLR_PERSONAL_INFO, CLR_OTHER_INFO } from '../../constants';

import './section.css';

const { Text } = Typography;

const sectionLayout = {
	sm: { span: 24 },
	lg: { span: 6 },
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
							<Col {...sectionLayout}>
								<div className="section">
									<Text strong>PATIENT NAME</Text>
									<br />
									<Text>{`${givenName} ${middleName} ${lastName} ${nameSuffix || ''}`}</Text>
								</div>
							</Col>
							<Col {...sectionLayout}>
								<div className="section">
									<Text strong>DATE OF BIRTH</Text>
									<br />
									<Text>{`${dateOfBirth} - ${patientAge}`}</Text>
								</div>
							</Col>
							<Col {...sectionLayout}>
								<div className="section">
									<Text strong>GENDER</Text>
									<br />
									<Text>{sex}</Text>
								</div>
							</Col>
							<Col {...sectionLayout}>
								<div className="section">
									<Text strong>LOCATION</Text>
									<br />
									<Text>{locationName}</Text>
								</div>
							</Col>
						</Row>
						<Row style={{ marginTop: 10 }}>
							<Col {...sectionLayout}>
								<div className="section">
									<Text strong>PHYSICIAN</Text>
									<br />
									<Text>{physicianName || '----'}</Text>
								</div>
							</Col>
							<Col {...sectionLayout}>
								<div className="section">
									<Text strong>BED</Text>
									<br />
									<Text>{bed || '----'}</Text>
								</div>
							</Col>
							<Col {...sectionLayout}>
								<div className="section">
									<Text strong>VISIT</Text>
									<br />
									<Text>{visit || '----'}</Text>
								</div>
							</Col>
							<Col {...sectionLayout}>
								<div className="section">
									<Text strong>AMOUNT</Text>
									<br />
									<Text>{chargeSlip || '----'}</Text>
								</div>
							</Col>
						</Row>
						<Row style={{ marginTop: 10 }}>
							<Col span={24}>
								<div className="comment-section">
									<Text strong>COMMENT</Text>
									<br />
									<Text>{comment || '----'}</Text>
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		);
	}
}

export default SummarySection;
