import React from 'react';
import PropTypes from 'prop-types'
import { Input, Button, Row, Col, Form, Select  } from 'antd';
import { fetchBloodProessingSearch } from 'services/blood_inventory/blood_processing'

const { Option } = Select;

class FormSearch extends React.Component {

  onFinish = async(payload) => {
    const { onFinish } = this.props
    payload.Blood_Components_Code = 'WB'
    const APIresponseBloodProcessing = await fetchBloodProessingSearch(payload);
    onFinish(APIresponseBloodProcessing, payload)
  }

  render() {
    const { bloodTypesList, bloodStorageList } = this.props
 
    const bloodTypesOption = bloodTypesList === undefined ? null : bloodTypesList.map((item,i) => {
      return (<Option key={i} value={item.blood_type}>{item.blood_type}</Option>)
    });
    
    const bloodStorageOption = bloodStorageList === undefined ? null : bloodStorageList.map((item,i) => {
      return (<Option key={i} value={item.storage_name}>{item.storage_name}</Option>)
    });

    return (
      <Form onFinish={this.onFinish}>
        <Row 
          justify="center"
          gutter={16}
          style={{ marginTop: 20 }}
        >
          {/* <Col span={2}>
            <Form.Item name="STATUS">
              <Input placeholder="STATUS" />
            </Form.Item>
          </Col> */}
          <Col span={2}>
            <Form.Item name="BLOOD_TYPES">
              <Select defaultValue="Blood Types" style={{ width: '100%' }}>
                {bloodTypesOption}
              </Select>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item name="BLOOD_STORAGE">
              <Select defaultValue="Storage" style={{ width: '100%' }}>
                {bloodStorageOption}
              </Select>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item name="STATUS">
              <Select defaultValue="Status" style={{ width: '100%' }}>
                <Option value="AVAILABLE">AVAILABLE</Option>
                <Option value="INVALID">INVALID</Option>
                <Option value="EXPIRED">EXPIRED</Option>
                <Option value="PROCESSED">PROCESSED</Option>
                <Option value="DELIVERED">DELIVERED</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col>
            <Button
              shape="round"
              style={{ width: 120 }}
            >
              CLEAR
            </Button>
          </Col>
          <Col>
            <Button
              htmlType="submit"
              shape="round"
              type="primary"
              style={{ width: 120 }}
            >
              SEARCH
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}


FormSearch.propTypes = {
	bloodTypesList: PropTypes.object.isRequired,
  bloodStorageList:PropTypes.object.isRequired,
}

export default FormSearch;