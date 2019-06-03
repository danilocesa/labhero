import React from 'react';
import { Row, Col, Typography } from 'antd';

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
			caseNumber: '',
			givenName: '',
			nameSuffix: '',
			lastName: '',
			middleName: '',
			dateOfBirth: '',
			age: '',
			sex: '',
		},
		otherInfo: {
			ward: '',
			physicianId: '',
			classType: '',
			comment: '',
			amount: ''
		}
	}

	componentWillMount() {
		const { personalInfo, otherInfo } = this.state;
		const sessPersInfo = JSON.parse(sessionStorage.getItem(CLR_PERSONAL_INFO)) || personalInfo;
		const sessOtherInfo = JSON.parse(sessionStorage.getItem(CLR_OTHER_INFO)) || otherInfo;
	
		this.setState(() => ({ 
			personalInfo: sessPersInfo,
			otherInfo: sessOtherInfo
		}));
	}

	render() {
		const {
			caseNumber,
			givenName,
			nameSuffix,
			lastName,
			middleName,
			dateOfBirth,
			age,
			sex
		} = this.state.personalInfo;
		
		const {
			ward,
			physicianId,
			classType,
			comment,
			amount
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
									<Text>{`${givenName} ${middleName}. ${lastName} ${nameSuffix}`}</Text>
								</div>
							</Col>
							<Col {...sectionLayout}>
								<div className="section">
									<Text strong>DATE OF BIRTH</Text>
									<br />
									<Text>{`${dateOfBirth} - ${age}`}</Text>
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
									<Text strong>CASE NO.</Text>
									<br />
									<Text>{caseNumber}</Text>
								</div>
							</Col>
						</Row>
						<Row style={{ marginTop: 10 }}>
							<Col {...sectionLayout}>
								<div className="section">
									<Text strong>PHYSICIAN ID</Text>
									<br />
									<Text>{physicianId}</Text>
								</div>
							</Col>
							<Col {...sectionLayout}>
								<div className="section">
									<Text strong>WARD</Text>
									<br />
									<Text>{ward}</Text>
								</div>
							</Col>
							<Col {...sectionLayout}>
								<div className="section">
									<Text strong>CLASS</Text>
									<br />
									<Text>{classType}</Text>
								</div>
							</Col>
							<Col {...sectionLayout}>
								<div className="section">
									<Text strong>AMOUNT</Text>
									<br />
									<Text>{amount}</Text>
								</div>
							</Col>
						</Row>
						<Row style={{ marginTop: 10 }}>
							<Col span={24}>
								<div className="comment-section">
									<Text strong>COMMENT</Text>
									<br />
									<Text>{comment}</Text>
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
