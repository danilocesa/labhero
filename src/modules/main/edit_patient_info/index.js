import React from 'react';
import { Form, Input, DatePicker, Row, Col, Radio, Button } from 'antd';

import './editprofile.css'; 


const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class EditProfile extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			casenum: '0006',
			lastname: 'DOE',
			firstname: 'JOHN',
			middlename: 'E',
		}
	}

	onChangePatientInfo = (event) => {
		this.setState({[event.target.name]: event.target.value})
	}
 
	render() {
		return(
			<div>
				<Form>
					<Row gutter={8}>
						
						<Col xs={24} sm={24} md={24} lg={24}>
							<Form.Item label="Case No.">
								<Input name="casenum" value={this.state.casenum} onChange={this.onChangePatientInfo} />
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label="Last Name">
								<Input name="lastname" value={this.state.lastname} onChange={this.onChangePatientInfo} />
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label="First Name">
								<Input name="firstname" value={this.state.firstname} onChange={this.onChangePatientInfo} />
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label="Middle Name">
								<Input name="middlename" value={this.state.middlename} onChange={this.onChangePatientInfo} />
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label="GENDER" className="gutter-box">
								<RadioGroup buttonStyle="solid" style={{ width:'100%', textAlign:'center' }}>
									<RadioButton style={{ width:'50%' }} value="a">MALE</RadioButton>
									<RadioButton style={{ width:'50%' }} value="b">FEMALE</RadioButton>
								</RadioGroup>
							</Form.Item>
						</Col>

						<Col xs={24} sm={24} md={24} lg={24}>
							<Row gutter={8}>
								<Col xs={24} sm={12} md={12} lg={12}>
									<Form.Item label="Date of Birth">
										<div className="customDatePickerWidth">
											<DatePicker />
										</div>
									</Form.Item>
								</Col>
								<Col xs={24} sm={12} md={12} lg={12}>
									<Form.Item label="Age">
										<Input disabled />
									</Form.Item>
								</Col>
							</Row>
						</Col>
						
					</Row>
				</Form>
				<div
					style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
				>
					<Button style={{ marginRight: 8 }}>
              Cancel
					</Button>
					<Button type="primary">
              Submit
					</Button>
				</div>
			</div>
		);
	}
}

export default EditProfile;