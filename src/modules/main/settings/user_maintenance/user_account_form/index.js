import React from 'react';
import { Row, Col, Switch, Typography, Form, Input, Select, Checkbox, Table, Icon, Button } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import axiosCall from 'services/axiosCall';
import { apiUserAccount, apiUserType, apiPOSTMethod, apiPutMethod, apiGetMethod } from 'shared_components/constant-global';
import './useraccountform.css';
import { drawerAdd, drawerUpdate, labels as g_labels, errorMessages } from '../settings';

const { Text } = Typography;
const { Option } = Select;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
};

const selectSection = (
    <Select placeholder="Select Section">
        <Option value="hema">HEMA</Option>
        <Option value="chem">CHEM</Option>
        <Option value="immu">IMMU</Option>
    </Select>
)

const checkBoxViewOnly = (
    <Checkbox disabled />
)

const dataSource = [
    {
        section: selectSection,
        sort: '',
        instrument: '',
        viewOnly: checkBoxViewOnly,
        deleteRow: '',
        key: 0,
    }
]

const userTypes = (
    <Select>
        <Option value={1}>Admin</Option>
        <Option value={2}>Lab Admin</Option>
        <Option value={3}>Med Tech</Option>
        <Option value={4}>Encoder</Option>
        <Option value={5}>Guest</Option>
    </Select>
);

class UserAccountForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmDirty: false,
        };
    }

    componentWillUnmount(){
        const { form } = this.props;
        form.resetFields();
    }

    handleSubmit = (event) => {
        const { form, drawerButton } = this.props;
        const v_method = (drawerButton === drawerAdd ) ? apiPOSTMethod : apiPutMethod;

        event.preventDefault();
        form.validateFields( (err, values) => {
             if (!err) {
                 const v_data = {
                    userName : values.userName,
                    userTypeID : values.userTypeID,
                    givenName : values.givenName,
                    lastName : values.lastName,
                    middleName : values.middleName,
                    password : values.password,
                    registryNumber : values.registration_no,
                    registryValidityDate: values.registration_validity,
                 };

                 if(drawerButton === drawerUpdate ){
                     v_data.userID = values.userID;
                 }

                
                this.handleApi({method: v_method, url: apiUserAccount, data: v_data});
             }
          });
    }

    handleApi = async (param) => {

        await axiosCall({
            method: param.method,
            url: param.url,
            data: param.data,
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${process.env.LAB_API_SECREY_KEY}`
            }
        }).finally(function(){
            window.location.reload();
        }).catch(e=>{
            console.log('TCL -> userAccountForm -> submit -> error', e);
        });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback(errorMessages.password.doesNotMatch);
        } else {
          callback();
        }
      };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['repeat_password'], { force: true });
        }
        callback();
      };

    fetchUserTypes = () =>{
        const response = this.handleApi({method: apiGetMethod, data: null, url: apiUserType});
        console.log('TCL-> response', response);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { patientInfo } = this.props;
        return(
            <div>
                <Row gutter={40}>
                    <Col span={24} style={{ textAlign: "right" }}>
                        <Text style={{paddingRight: '10px'}}>ENABLE LOGIN</Text>
                        <Switch defaultChecked  />
                    </Col>
                    <div className="user-form">
                        <Form {...formItemLayout} onSubmit={this.handleSubmit} >
                            <Col span={12}>
                                {/* PERSONAL INFORMATION */}
                                <div className="personalInfo">
                                    <div className="form-title">
                                        <Text strong>{g_labels.personalInfoLabel}</Text>
                                    </div>
                                    <Form.Item label="USERID">
                                        {
                                            getFieldDecorator('userID',{
                                                initialValue: patientInfo.userID,
                                            })(<Input disabled />)
                                        }
                                    </Form.Item>

                                    <Form.Item label="FIRST NAME*">
                                        {getFieldDecorator('givenName', {
                                            initialValue: patientInfo.givenName,
                                        	rules: [{ required: true, message: errorMessages.requiredField }]
                                        })(
                                        	<Input />
                                        )}	
                                    </Form.Item>

                                    <Form.Item label="MIDDLE NAME*">
                                        {
                                            getFieldDecorator('middleName',{
                                                initialValue: patientInfo.middleName,
                                                rules: [{ required: true, message: errorMessages.requiredField}]
                                            })(<Input />)
                                        }
                                    </Form.Item>
                                    <Form.Item label="LAST NAME*">
                                        {
                                            getFieldDecorator('lastName',{
                                                initialValue: patientInfo.lastName,
                                                rules: [{ required: true, message: errorMessages.requiredField}]
                                            })(<Input />)
                                        }
                                    </Form.Item>
                                </div>

                                {/* ACCOUNT INFORMATION */}
                                <div className="personalInfo">
                                    <div className="form-title">
                                        <Text strong>{g_labels.accountInfoLabel}</Text>
                                    </div>

                                    <Form.Item label="USERNAME*">
                                        {
                                            getFieldDecorator('userName',{
                                                initialValue: patientInfo.userName,
                                                rules: [{ required: true, message: errorMessages.requiredField}],
                                            })(
                                            <Input />)
                                        }
                                    </Form.Item>

                                    <Form.Item label="PASSWORD*">
                                        {
                                            getFieldDecorator('password',{
                                                initialValue: patientInfo.password,
                                                rules: [
                                                    { required: true, message: errorMessages.requiredField},
                                                    { validator: this.validateToNextPassword}
                                                ]
                                            })(
                                            <Input.Password />)
                                        }
                                    </Form.Item>

                                    <Form.Item label="REPEAT PASSWORD*">
                                        {
                                            getFieldDecorator('repeat_password',{
                                                initialValue: patientInfo.password,
                                                rules:[
                                                    { required: true, message: errorMessages.requiredField },
                                                    { validator: this.compareToFirstPassword }
                                                ]
                                            })(
                                            <Input.Password />)
                                        }
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="personalInfo">
                                    <div className="form-title">
                                        <Text strong>{ g_labels.otherInfoLabel }</Text>
                                    </div>
                                    <Form.Item label="REGISTRATION NO.">
                                        {
                                            getFieldDecorator('registration_no',{
                                                initialValue: patientInfo.registryNumber
                                            })(
                                            <Input />)
                                        }
                                    </Form.Item>
                                    <Form.Item label="REGISTRATION VALIDITY">
                                        {
                                            getFieldDecorator('registration_validity',{
                                                initialValue: patientInfo.registryValidityDate
                                            })(
                                            <Input />)
                                        }
                                    </Form.Item>
                                    <Form.Item label="USER RIGHTS*">
                                        {
                                            getFieldDecorator('userTypeID',{ 
                                                initialValue: patientInfo.userTypeID,
                                                rules: [{ required: true, message: errorMessages.requiredField}],
                                            })(
                                                userTypes
                                            )
                                        }
                                    </Form.Item>
                                </div>
                            </Col>
                            <div
                                style={{
                                position: 'fixed',
                                left: 0,
                                bottom: 0,
                                width: '100%',
                                marginTop: '25px',
                                borderTop: '1px solid #e9e9e9',
                                padding: '10px 16px',
                                background: '#fff',
                                textAlign: 'right',
                                }}   
                            >
                                <Button shape="round" style={{ marginRight: 8 }}>
                                CANCEL
                                </Button>
                                <Button type="primary" shape="round" style={{ padding: '0px 20px' }} htmlType="submit">
                                {this.props.drawerButton}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Row>
            </div>
        );
    }
}

UserAccountForm.propTypes = {
    patientInfo: PropTypes.array.isRequired,
    drawerButton: PropTypes.string.isRequired
}

const UserAccount = Form.create()(withRouter(UserAccountForm));
// const UserAccount = Form.create()(UserAccountForm);

export default UserAccount;