import React from 'react';
import { Row, Col, Switch, Typography, Form, Input, Select, Checkbox, Table, Icon, Button } from 'antd';
import PropTypes from 'prop-types';

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
        deleteRow: ''
    }
]


class UserAccountForm extends React.Component {
    render() {
        return(
            <div>
                <Row gutter={40}>
                    <Col span={24} style={{ textAlign: "right" }}>
                        <Text style={{paddingRight: '10px'}}>ENABLE LOGIN</Text>
                        <Switch defaultChecked  />
                    </Col>
                    <div className="user-form">
                        <Form {...formItemLayout}>
                            <Col span={12}>
                                {/* PERSONAL INFORMATION */}
                                <div className="personalInfo">
                                    <div className="form-title">
                                        <Text strong>Personal Information</Text>
                                    </div>
                                    <Form.Item label="USERID">
                                        <Input value={this.props.patientInfo.userID} />
                                    </Form.Item>

                                    <Form.Item label="FIRST NAME">
                                        <Input value={this.props.patientInfo.firstName} />
                                    </Form.Item>

                                    <Form.Item label="MIDDLE NAME">
                                        <Input value={this.props.patientInfo.middleName} />
                                    </Form.Item>

                                    <Form.Item label="LAST NAME">
                                        <Input value={this.props.patientInfo.lastName} />
                                    </Form.Item>
                                </div>

                                {/* ACCOUNT INFORMATION */}
                                <div className="personalInfo">
                                    <div className="form-title">
                                        <Text strong>Account Information</Text>
                                    </div>

                                    <Form.Item label="USERNAME">
                                        <Input value={this.props.patientInfo.userName} />
                                    </Form.Item>

                                    <Form.Item label="PASSWORD">
                                        <Input.Password />
                                    </Form.Item>

                                    <Form.Item label="REPEAT PASSWORD">
                                        <Input.Password />
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="personalInfo">
                                    <div className="form-title">
                                        <Text strong>Other Information</Text>
                                    </div>

                                    <Form.Item label="AUTOLOCK (MINUTES)">
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label="REGISTRATION NO.">
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label="REGISTRATION VALIDITY">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="USER RIGHTS">
                                        <Select defaultValue="">
                                            <Option value="admin">Admin</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item className="checkboxUser" {...tailFormItemLayout}>
                                        <Checkbox>
                                            Allow to add and/or edit users
                                        </Checkbox>
                                    </Form.Item>
                                    <Form.Item className="checkboxUser" {...tailFormItemLayout}>
                                        <Checkbox>
                                            Allow printing
                                        </Checkbox>
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
                                <Button type="primary" shape="round" style={{ padding: '0px 20px' }}>
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

export default UserAccountForm;