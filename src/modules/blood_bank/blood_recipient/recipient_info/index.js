/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
/* eslint-disable array-callback-return */
// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Form, Row, Col, Divider } from 'antd';

// CUSTOM MODULES
// import DrawerButton from './form2_button';

// IMAGES
import { PatientImgPlaceholder } from '../../../../images';

// CSS
import './editprofile.css'; 

// OTHER FILES
// eslint-disable-next-line camelcase

const DescriptionItem = ({ title, content }) => (
	<div
	  style={{
		fontSize: 14,
		lineHeight: '22px',
		marginBottom: 7,
		color: 'rgba(0,0,0,0.65)',
	  }}
	>
	  <p
		style={{
		  marginRight: 8,
		  display: 'inline-block',
		  color: 'rgba(0,0,0,0.85)',
		  fontWeight : 'bold',
		}}
	  >
		{title}:
	  </p>
	  {content}
	</div>
);

// CONSTANTS

class RecipientProfile extends React.Component {

	render() {
		return(
			<div>
				<Form className="fillup-form">
						<p style={{ marginBottom: 24, fontWeight : 'bold', }}>RECIPIENT PROFILE</p>
						<Row gutter={12}>
                            <Col span={6}>
                                <div>
									<Col>
										<img src={PatientImgPlaceholder} alt="logo" style={{ height: 100, width: 100, paddingBottom: '1em' }} />
									</Col>
									<Col>
										<DescriptionItem title="ID" content="000000" />
									</Col>
								</div>
							</Col>
                            <Col md={2} style={{ textAlign: 'center' }}>
                                <Divider className="divider" type="vertical" style={{ height: 500 }} />
                            </Col>
							<Col span={16}>
                                <div>
									<Col>
										<DescriptionItem title="LAST NAME" content="DOE" />
									</Col>
									<Col>
										<DescriptionItem title="MIDDLE NAME" content="C." />
									</Col>
                                    <Col>
										<DescriptionItem title="FIRST NAME" content="JANE" />
									</Col>
									<Col>
										<DescriptionItem title="REQUESTED TIME" content="26/01/2020 11:45:56 A.M." />
									</Col>
                                    <Col>
										<DescriptionItem title="REQUIRED DATE" content="27/06/2020" />
									</Col>
									<Col>
										<DescriptionItem title="GENDER" content="F" />
									</Col>
                                    <Col>
										<DescriptionItem title="AGE" content="32" />
									</Col>
									<Col>
										<DescriptionItem title="BLOOD GROUP" content="AB POSITIVE" />
									</Col>
									<Col>
										<DescriptionItem title="NO. OF BAGS" content="4" />
									</Col>
                                    <Col>
										<DescriptionItem title="HOSPITAL" content="St. Luke's Hospital" />
									</Col>
                                    <Col>
										<DescriptionItem title="CONTACT DETAILS" content="022222222222" />
									</Col>
								</div>
							</Col>
							<Col xs={24} sm={12} md={24} lg={24}>
								{/* <DrawerButton /> */}
							</Col>
						</Row>
				</Form>
			</div>
		);
	}
}

RecipientProfile.propTypes = {
	patientInfo: PropTypes.object
};

RecipientProfile.defaultProps = {
	patientInfo() { return null; }
}

const RecipientInfo = Form.create()(withRouter(RecipientProfile));

export default RecipientInfo;