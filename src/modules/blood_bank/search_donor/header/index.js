import React from 'react' 
import { Form, Input, Button, Row, Col, Select } from 'antd'

// CONSTANTS
const { Option } = Select;

class Header_Search_Donor extends React.Component{
  render(){
      return(
          <div>
            <Form className="search-patient-form" style={{marginLeft:'110px', marginTop:'50px'}}>
              <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                  <div>
                    <Form.Item label="DONOR'S I D">
                        <Input/>
                    </Form.Item>
                  </div>
                </Col>
                <Col className="gutter-row" span={6}>
                  <div>
                    <Form.Item label="BLOOD GROUP">
                      <Select placeholder="Select Your Blood Group" allowClear>
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
                  </div>
                </Col>
                <Col className="gutter-row" span={6}>
                  <div>
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
                  </div>
                </Col>
                <Col className="gutter-row" span={6}>
                  <div>
                    <Form.Item>
                      <Button 
                          type="primary" 
                          shape="round" 
                      > SEARCH 
                      </Button>
                    </Form.Item>
                  </div>
                </Col>
              </Row>  
            </Form>
        </div>
      );
  }
}

export default Header_Search_Donor;

