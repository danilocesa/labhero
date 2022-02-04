import React from 'react';
import PropTypes from 'prop-types'
import { Button, Row, Col, Form, Select  } from 'antd';
import { fetchBloodProcessingSearch } from 'services/blood_inventory/blood_processing'

const { Option } = Select;

class FormSearch extends React.Component {

  constructor(props) {
    super(props); 
    this.state = {
      bloodType : '',
      loading:false,
      disable:true
    }
  }

  onFinish = async(payload) => {
    const { onFinish, selectedTabkey } = this.props
    payload.Blood_Components_Code = selectedTabkey
    const APIresponseBloodProcessing = await fetchBloodProcessingSearch(payload);
    onFinish(APIresponseBloodProcessing, payload)
  }

  onChange = (value) =>{
    this.setState({
      bloodType: value,
      disable:false
    })
  }

  render() {
    const { disable } = this.state
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
          <Col span={3}>
            <Form.Item name="BLOOD_TYPES">
              <Select 
                placeholder="Select Blood Types" 
                style={{ width: '100%' }} 
                allowClear={true} 
                onChange={this.onChange}
              > 
                {bloodTypesOption}
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="BLOOD_STORAGE">
              <Select 
                placeholder="Select Storage"
                style={{ width: '100%' }}
                allowClear={true}
                onChange={this.onChange}
              >
                {bloodStorageOption}
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
              disabled={disable}
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
	bloodTypesList: PropTypes.array,
  bloodStorageList:PropTypes.array,
  selectedTabkey:PropTypes.string
}

export default FormSearch;