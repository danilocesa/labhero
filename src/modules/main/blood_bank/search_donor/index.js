import React from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import SearchDonorTable from './donor_table';
//import UpdatePatientForm from './edit_donor_info';

// CONSTANTS
const { Option } = Select;

class SearchDonor extends React.Component{

    state = { visible: false };

	showForm = () => {
        return (
            <div>
                <Form className="search-patient-form">
                    <Row>
                        <Col style={{ marginTop: '20px' }}>
                            <SearchDonorTable />
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }

    render(){
        return(
            <div>
                <div>
                    <PageTitle pageTitle="SEARCH DONOR" />
                    <Form className="search-patient-form">
                        <Row gutter={12}>
                            <Col span={8} style={{ marginTop: '20px' }}>
                                <Form.Item label="DONOR'S ID">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8} style={{ marginTop: '20px' }}>
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
                            <Col span={8} style={{ marginTop: '20px' }}>
                                <Form.Item label="LOCATION">
                                    <Select placeholder="Select your location" allowClear>
                                        <Option value="Caloocan">Caloocan</Option>
                                        <Option value="Las Pinas">Las Pinas</Option>
                                        <Option value="Makati">Makati</Option>
                                        <Option value="Malabon">Malabon</Option>
                                        <Option value="Mandaluyong">Mandaluyong</Option>
                                        <Option value="City of Manila">City of Manila</Option>
                                        <Option value="Marikina">Marikina</Option>
                                        <Option value="Muntinlupa">Muntinlupa</Option>
                                        <Option value="Navotas">Navotas</Option>
                                        <Option value="Parañaque">Parañaque</Option>
                                        <Option value="Pasay">Pasay</Option>
                                        <Option value="Pasig">Pasig</Option>
                                        <Option value="Quezon City">Quezon City</Option>
                                        <Option value="San Juan">San Juan</Option>
                                        <Option value="Taguig">Taguig</Option>
                                        <Option value="Valenzuela">Valenzuela</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="gutter-row" style={{ marginTop: '20px' }}>
                                <Form.Item>
                                    <Button 
                                        type="primary" 
                                        shape="round" 
                                        style={{
                                            width: '10%',
                                            textAlign: 'center'
                                        }} 
                                        onClick={() => this.setState({showForm: true})}
                                    > 
                                        SEARCH 
                                    </Button>
                                    {this.state.showForm ? this.showForm() : null}
                                </Form.Item>
                            </Col>  
                        </Row>
                    </Form>
                </div>
            </div>
        );
    }
}

export default SearchDonor;