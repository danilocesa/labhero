// LIBRARY
import React from 'react';
import { Row, Form, Input, Button, Col, Select, Radio, DatePicker } from 'antd';
// import { withRouter } from 'react-router-dom';

const { Option } = Select;
const { RangePicker } = DatePicker;

class NotificationsSearch extends React.Component{
    render(){
        return(
            <Row>
                <Form id="searchNotifications">
                    <Row>
                    <Form.Item label="INVENTORY / NOTIFICATIONS">
                        <Radio.Group buttonStyle="solid">
                            <Radio.Button value="restock">RESTOCK</Radio.Button>
                            <Radio.Button value="takeout">TAKEOUT</Radio.Button>
                            <Radio.Button value="transactions">TRANSACTIONS</Radio.Button>
                            <Radio.Button value="notifications">NOTIFICATIONS</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    </Row>
                    SEARCH
                    <Row gutter={12}>
                        <Col span={6}>
                            <Form.Item label="FROM DATE - TO DATE">
                                <RangePicker />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Filter by:" className="gutter-box">
                                <Select>
                                    <Option value="transaction_date">Transaction Date</Option>
                                    <Option value="item">ITEM</Option>
                                    <Option value="description">DESCRIPTION</Option>
                                    <Option value="unit">UNIT</Option>
                                    <Option value="expiration_date">EXPIRATION DATE</Option>
                                    <Option value="location">LOCATION</Option>
                                    <Option value="section">SECTION</Option>
                                    <Option value="price">PRICE</Option>
                                    <Option value="quantity">QUANTITY</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <br />
                            <Form.Item>
                                <Input placeholder="Enter keyword here" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Row type="flex" align="bottom" gutter={8}>
                            <Col>
                                <br />
                                <Form.Item>
                                    <Button id="resetBtn" shape="round">CLEAR</Button>
                                </Form.Item>
                            </Col>
                            <Col>
                                <br />
                                <Form.Item>
                                    <Button type="primary" id="submit" shape="round">SEARCH</Button>
                                </Form.Item>
                            </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Row>
        );
    }
}

export default NotificationsSearch;