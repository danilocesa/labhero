import React from 'react';
import { Row, Col, Switch, Typography, Form, Input, Select, Checkbox, Table, Icon, Button } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import axiosCall from 'services/axiosCall';
import { apiUserAccount, apiPOSTMethod, apiPutMethod, apiGetMethod } from 'shared_components/constant-global';
import './useraccountform.css';

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

const columns = [
    {
        title: 'SECTION',
        dataIndex: 'section',
        key: 'section',
        width: '25%'
    },
    {
        title: 'SORT',
        dataIndex: 'sort',
        key: 'sort',
        width: '25%'
    },
    {
        title: 'INSTRUMENT',
        dataIndex: 'instrument',
        key: 'instrument',
        width: '25%'
    },
    {
        title: 'VIEW ONLY',
        dataIndex: 'viewOnly',
        key: 'viewOnly',
        width: '13%'
    },
    {
        title: <Icon type="delete" theme="filled" />,
        dataIndex: 'deleteRow',
        key: 'deleteRow',
        width: '13%'
    },
]

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

    async fetchUserTypes(){
		await axiosCall({
            url: 'UserType',
            method: apiGetMethod,
        }).then(userType =>{
            this.setState({
                user_types: userType.data,
            });
        });
    }

    handleSubmit = (event) => {
        const { form } = this.props;

        event.preventDefault();  
        form.validateFields( (err, values) => {
            var v_method = '';
             if (!err) {
                 const v_data = {
                    userName : values.userName,
                    userTypeID : values.userTypeID,
                    givenName : values.givenName,
                    lastName : values.lastName,
                    middleName : values.middleName,
                    password : values.password,
                 };

                 if(this.props.drawerButton === 'Add'){
                    v_method = apiPOSTMethod;
                }else{
                    v_method = apiPutMethod;
                }
                this.handleApi({method: v_method, url: apiUserAccount, data: v_data});
             }else{
                 console.log(err);
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
            console.log(e);
        });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
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

    isUpdated = () =>{
        if(this.props.drawerButton === "Update"){
            return true;
        }else{
            return false;
        }
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
                                        <Text strong>Personal Information</Text>
                                    </div>
                                    <Form.Item label="USERID">
                                        {
                                            getFieldDecorator('userID',{
                                                initialValue: this.props.patientInfo.userID,
                                            })(<Input disabled />)
                                        }
                                    </Form.Item>

                                    <Form.Item label="FIRST NAME">
                                        {getFieldDecorator('givenName', {
                                            initialValue: this.props.patientInfo.givenName,
                                        	rules: [{ required: true, message: "This field is required" }]
                                        })(
                                        	<Input />
                                        )}	
                                    </Form.Item>

                                    <Form.Item label="MIDDLE NAME">
                                        {
                                            getFieldDecorator('middleName',{
                                                initialValue: this.props.patientInfo.middleName,
                                                rules: [{ required: true, message: "This field is required"}]
                                            })(<Input />)
                                        }
                                    </Form.Item>
                                    <Form.Item label="LAST NAME">
                                        {
                                            getFieldDecorator('lastName',{
                                                initialValue: this.props.patientInfo.lastName,
                                                rules: [{ required: true, message: "This field is required"}]
                                            })(<Input />)
                                        }
                                    </Form.Item>
                                </div>

                                {/* ACCOUNT INFORMATION */}
                                <div className="personalInfo">
                                    <div className="form-title">
                                        <Text strong>Account Information</Text>
                                    </div>

                                    <Form.Item label="USERNAME">
                                        {
                                            getFieldDecorator('userName',{
                                                initialValue: this.props.patientInfo.userName,
                                                rules: [{ required: true, message: "This field is required"}],
                                            })(
                                            <Input />)
                                        }
                                    </Form.Item>

                                    <Form.Item label="PASSWORD">
                                        {
                                            getFieldDecorator('password',{
                                                initialValue: patientInfo.password,
                                                rules: [
                                                    { required: true, message: "This field is required"},
                                                    { validator: this.validateToNextPassword}
                                                ]
                                            })(
                                            <Input.Password />)
                                        }
                                    </Form.Item>

                                    <Form.Item label="REPEAT PASSWORD">
                                        {
                                            getFieldDecorator('repeat_password',{
                                                initialValue: patientInfo.password,
                                                rules:[
                                                    { required: true, message: "This field is required" },
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
                                        <Text strong>Other Information</Text>
                                    </div>

                                    <Form.Item label="AUTOLOCK (MINUTES)">
                                        {
                                            getFieldDecorator('autolock_min')(
                                            <Input />)
                                        }
                                    </Form.Item>

                                    <Form.Item label="REGISTRATION NO.">
                                        {
                                            getFieldDecorator('registration_no')(
                                            <Input />)
                                        }
                                    </Form.Item>

                                    <Form.Item label="REGISTRATION VALIDITY">
                                        {
                                            getFieldDecorator('registration_validity')(
                                            <Input />)
                                        }
                                    </Form.Item>
                                    <Form.Item label="USER RIGHTS">
                                        {
                                            getFieldDecorator('userTypeID',{ 
                                                initialValue: this.props.patientInfo.userTypeID,
                                                rules: [{ required: true, message: "This field is required"}],
                                            })(<Select>
                                                <Option value={1}>Admin</Option>
                                                <Option value={2}>Lab Admin</Option>
                                                <Option value={3}>Med Tech</Option>
                                                <Option value={4}>Encoder</Option>
                                                <Option value={5}>Guest</Option>
                                                {/* {user_type_options} */}
                                            </Select>)
                                        }
                                    </Form.Item>
                                    <Form.Item className="checkboxUser" {...tailFormItemLayout}>
                                        {
                                            getFieldDecorator('allow_add_edit')(<Checkbox>
                                                Allow to add and/or edit users
                                            </Checkbox>)
                                        }
                                    </Form.Item>
                                    <Form.Item className="checkboxUser" {...tailFormItemLayout}>
                                        {
                                            getFieldDecorator('allow_printing')(
                                            <Checkbox>
                                                Allow printing
                                            </Checkbox>)
                                        }
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col span={24} style={{ marginTop: '25px' }}>
                                <div className="form-title" style={{ paddingLeft: '25px' }}>
                                    <Text strong>User Department</Text>
                                </div>
                            </Col>
                            <Col span={20} offset={2} className="user-table-drawer">
                                <Table columns={columns} dataSource={dataSource} pagination={false} />
                            </Col>
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
                                <Button shape="round" style={{ marginRight: 8 }}>
                                Cancel
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