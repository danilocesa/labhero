import React from 'react';
import { Form, Input, Row, Col, Typography, DatePicker, Radio, Button, Select } from 'antd';

// CUSTOM MODULES
import FormButtons from './form_buttons';

// CSS
import './editprofile.css'; 

// OTHER FILES
// eslint-disable-next-line camelcase
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const dateFormat = 'MM/DD/YYYY';

// CONSTANTS
const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
class DrawerButton extends React.Component {

	state = { visible: false };
	showForm = () => {
		return (
			<div style={{ marginTop: '5%' }}> 
				<Form id= "add-app" className="fillup-form">
					<Row gutter={8}>
						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label="LAST NAME">
								<Input />
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label="FIRST NAME">
								<Input/>
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label="MIDDLE NAME">
								<Input />
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={12} lg={12}>
							<Form.Item label="GENDER" className="gutter-box">
								<RadioGroup buttonStyle="solid" style={{ width:'100%', textAlign:'center' }}>
									<RadioButton style={{ width:'50%' }} value="MALE">MALE</RadioButton>
									<RadioButton style={{ width:'50%' }} value="FEMALE">FEMALE</RadioButton>
								</RadioGroup>
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={24} lg={24}>
							<Form.Item label="CONTACT NUMBER">
								<Input addonBefore="+ 63" maxLength={10} />
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={24} lg={24}>
							<Form.Item label="EMAIL">
								<Input />
							</Form.Item>
						</Col>

						<Col xs={24} sm={24} md={24} lg={24}>
							<Form.Item label="ADDRESS" className="gutter-box">
								<div className="treeselect-address">
									<Input />
								</div>
							</Form.Item>
						</Col>

						<Col xs={24} sm={24} md={24} lg={24}>
							<Row gutter={8}>
								<Col xs={24} sm={12} md={12} lg={12}>
									<Form.Item label="BIRTH DATE">
										<div className="customDatePickerWidth">
											<DatePicker 
												format={dateFormat}
												style={{ width: '100%' }}
												// @ts-ignore
												onChange={this.onDateChange}
											/>
										</div>
									</Form.Item>
								</Col>
								<Col xs={24} sm={12} md={12} lg={12}>
									<Form.Item label="AGE">
										<Input disabled />
									</Form.Item>
								</Col>
							</Row>
						</Col>

						<Col xs={24} sm={24} md={24} lg={24}>
							<Row gutter={8}>
								<Col xs={24} sm={12} md={12} lg={12}>
									<Form.Item label="BLOOD GROUP">
										<Select placeholder="Select your blood group" allowClear>
											<Option value="A+">A+</Option>
											<Option value="O+">O+</Option>
											<Option value="B+">B+</Option>
											<Option value="AB+">AB+</Option>
											<Option value="A-">A-</Option>
											<Option value="O-">O-</Option>
											<Option value="B-">B-</Option>
											<Option value="AB-">AB-</Option>
										</Select>
									</Form.Item>
								</Col>
								<Col xs={24} sm={12} md={12} lg={12}>
									<Form.Item label="UNIT OF BLOOD">
										<Input />
									</Form.Item>
								</Col>
							</Row>
						</Col>

						<Col xs={24} sm={12} md={24} lg={24}>
							<Form.Item label="DATE COLLECTED">
								<DatePicker 
									format="MM-DD-YYYY"
									style={{ width: '100%' }}
								/>
							</Form.Item>
						</Col>

						<Col xs={24} sm={12} md={24} lg={24}>
							<FormButtons />
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
	render() {
		return (
			<div
				style={{
					position: 'absolute',
					left: 0,
					width: '100%',
					borderTop: '1px solid #e9e9e9',
					padding: '10px 16px',
					background: '#fff',
					textAlign: 'left',
					marginTop: '5%'
            	}}
			>
				<Button onClick={() => this.setState({showForm: true}) }>EDIT PROFILE</Button>
                {this.state.showForm ? this.showForm() : null}
			</div>
		);
	}
}


export default DrawerButton;