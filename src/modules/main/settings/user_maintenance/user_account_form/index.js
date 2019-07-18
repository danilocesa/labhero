import React from 'react';
import { Row, Col, Switch, Typography, Form, Input, Select, Checkbox, Table, Icon } from 'antd';

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
        key: 'section'
    },
    {
        title: 'SORT',
        dataIndex: 'sort',
        key: 'sort'
    },
    {
        title: 'INSTRUMENT',
        dataIndex: 'instrument',
        key: 'instrument'
    },
    {
        title: 'VIEW ONLY',
        dataIndex: 'viewOnly',
        key: 'viewOnly'
    },
    {
        title: <Icon type="delete" theme="filled" />,
        dataIndex: 'viewOnly',
        key: 'viewOnly'
    },
]

class UserAccountForm extends React.Component {
    render() {
        return(
            <div>
                <Row gutter={40}>
                    <Col span={24} style={{ textAlign: "right" }}>
                        <Text style={{paddingRight: '10px'}}>ENABLE LOGIN</Text>
                        <Switch />
                    </Col>
                    <div className="user-form">
                        <Form {...formItemLayout}>
                            <Col span={12}>
                                {/* PERSOANL INFORMATION */}
                                <div className="personalInfo">
                                    <div className="form-title">
                                        <Text strong>Personal Information</Text>
                                    </div>

                                    <Form.Item label="USERID">
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label="FIRST NAME">
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label="MIDDLE NAME">
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label="LAST NAME">
                                        <Input />
                                    </Form.Item>
                                </div>

                                {/* ACCOUNT INFORMATION */}
                                <div className="personalInfo">
                                    <div className="form-title">
                                        <Text strong>Account Information</Text>
                                    </div>

                                    <Form.Item label="USERNAME">
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label="PASSWORD">
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label="REPEAT PASSWORD">
                                        <Input />
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
                            <Col span={20} offset={2} className="user-table">
                                <Table columns={columns} />
                            </Col>
                        </Form>
                    </div>
                </Row>
            </div>
        );
    }
}

export default UserAccountForm;