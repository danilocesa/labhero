/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
/* eslint-disable array-callback-return */
// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Form, Input, Row, Col, Typography, DatePicker, Radio, Button, Select, Drawer, List } from 'antd';

// CUSTOM MODULES
import DrawerButton from './form2_button';

// IMAGES
import { PatientImgPlaceholder } from '../../../../../images';

// CSS
import './editprofile.css'; 

// OTHER FILES
// eslint-disable-next-line camelcase
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const dateFormat = 'MM/DD/YYYY';
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
const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

class EditDonorProfile extends React.Component {
	state= {showForm: false}

	showDrawer = () => {
		this.setState({
		visible: true,
		});
	};

	onClose = () => {
		this.setState({
		visible: false,
		});
	};

	render() {
		return(
			<div>
				<Form className="fillup-form">
						<p style={{ marginBottom: 24, fontWeight : 'bold', }}>DONOR'S PROFILE</p>
						<Row gutter={12}>
                            <Col span={6}>
                                <div>
									<Col>
										{' '}
										<img src={PatientImgPlaceholder} alt="logo" style={{ height: 100, width: 100, paddingBottom: '1em' }} />
									</Col>
									<Col>
										<DescriptionItem title="ID" content="000000" />
									</Col>
								</div>
							</Col>
							<Col span={9}>
                                <div>
									<Col>
										<DescriptionItem title="LAST NAME" content="DOE" />
									</Col>
									<Col>
										<DescriptionItem title="MIDDLE NAME" content="P." />
									</Col>
									<Col>
										<DescriptionItem title="BLOOD GROUP" content="AB POSITIVE" />
									</Col>
									<Col>
										<DescriptionItem title="DATE DONATED" content="01/01/2020" />
									</Col>
								</div>
							</Col>
							<Col span={9}>
                                <div>
									<Col>
										<DescriptionItem title="FIRST NAME" content="JOHN" />
									</Col>
									<Col>
										<DescriptionItem title="GENDER" content="M" />
									</Col>
									<Col>
										<DescriptionItem title="UNIT OF BLOOD" content="470 ML" />
									</Col>
									<Col>
										<DescriptionItem title="CONTACT DETAILS" content="01111111111" />
									</Col>
								</div>
							</Col>
							<Col xs={24} sm={12} md={24} lg={24}>
								<DrawerButton />
							</Col>
						</Row>
				</Form>
			</div>
		);
	}
}

EditDonorProfile.propTypes = {
	patientInfo: PropTypes.object
};

EditDonorProfile.defaultProps = {
	patientInfo() { return null; }
}

const UpdatePatientForm = Form.create()(withRouter(EditDonorProfile));

export default UpdatePatientForm;