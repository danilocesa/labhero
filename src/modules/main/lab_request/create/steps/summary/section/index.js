import React from 'react';
import { Row, Col, Typography } from 'antd';

import './section.css';

const { Text } = Typography;

const sectionLayout = {
	sm: { span: 24 },
	lg: { span: 6 },
};

class SummarySection extends React.Component {
	state = {
		fields: {
			caseNumber: '',
			firstname: '',
			lastname: '',
			middlename: '',
			birthday: '',
			age: '',
			gender: '',
			ward: '',
			physicianId: '',
			classType: '',
			comment: '',
			amount: ''
		}
	}

	componentWillMount() {
		const fields = JSON.parse(sessionStorage.getItem('create_lab_request_fields'));
		
		Object.keys(fields).forEach(item => {
			return fields[item] = fields[item] ? fields[item] : '----';
		});

		this.setState({ fields });
	}

	render() {
		const { fields } = this.state;
		const {
			caseNumber,
			firstname,
			lastname,
			middlename,
			birthday,
			age,
			gender,
			ward,
			physicianId,
			classType,
			comment,
			amount
		} = fields;

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
									<Text>{`${firstname} ${middlename}. ${lastname}`}</Text>
								</div>
							</Col>
							<Col {...sectionLayout}>
								<div className="section">
									<Text strong>DATE OF BIRTH</Text>
									<br />
									<Text>{`${birthday} - ${age}`}</Text>
								</div>
							</Col>
							<Col {...sectionLayout}>
								<div className="section">
									<Text strong>GENDER</Text>
									<br />
									<Text>{gender}</Text>
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
