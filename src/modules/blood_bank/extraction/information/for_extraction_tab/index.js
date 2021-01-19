import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Input, Row, Col,Form , InputNumber, Button,DatePicker  } from 'antd';

// CUSTOM MODULES
import HttpCodeMessage from 'shared_components/message_http_status'
import { createExtraction, fetchExtractionById } from 'services/blood_bank/extraction'
import { messagePrompts } from './settings'


const { TextArea } = Input;

class ForExtractionTab extends React.Component {
  constructor(props){
    super(props);

    this.formRef = React.createRef();
    this.state = { isAlreadyExtracted: false };
  }

  async componentDidMount() {
    const extractionDetail = await fetchExtractionById(13);

    if(extractionDetail !== null) {
      const formFields = {
        ...extractionDetail,
        extracted_date: moment(extractionDetail.extracted_date),
        expiration_date: moment(extractionDetail.expiration_date)
      };

      this.formRef.current.setFieldsValue(formFields);

      this.setState({ isAlreadyExtracted: true })
    }
  }


  onSubmitForm = async (formValues) => {
    const { donorID } = this.props;

    const payload = {
      donor: donorID,
      health_info: 1,
			bag_count: formValues.bags,
			expiration_date: '2020-12-12',
      extracted_date: moment(new Date()).format('YYYY-MM-DD'),
      remark: formValues.remark,
      created_by: 1,
      extracted_by: 1
    };

    const APIresponse = await createExtraction(payload);
    // @ts-ignore
    if(APIresponse.status === 201){
      const httpMessageConfig = {
        message: messagePrompts.successCreateUser,
        // @ts-ignore
        status: APIresponse.status,	
        duration: 3, 
        onClose: () => window.location.reload() 
      }
      
      HttpCodeMessage(httpMessageConfig);	
    }	
  }

  render() {
    const { isAlreadyExtracted } = this.state;

    return (
      <div>
        <Form
          ref={this.formRef}
          layout="vertical"
          onFinish={this.onSubmitForm} 
        >   
          <Form.Item 
            name="bag_count"
            label="NO. OF BAGS" 
            initialValue={1}
          > 
            <InputNumber style={{ width: 80 }} disabled />
          </Form.Item>
          <Row gutter={12}>
            <Col span={6}>
              <Form.Item
                name="bag_id" 
                label="BAG ID"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item 
                name="expiration_date"
                label="EXPIRY DATE" 
              >
                <DatePicker 
                  disabled  
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item 
                name="extracted_date"
                label="EXTRACTED DATE" 
              >
                <DatePicker 
                  disabled  
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item 
                name="extracted_by"
                label="EXTRACTED BY" 
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item 
                name="remark"
                label="REMARKS" 
              >
                <TextArea 
                  rows={6} 
                  disabled={isAlreadyExtracted}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end"> 
            <Button 
              type="primary" 
              shape="round" 
              htmlType="submit"
              style={{ width: 120 }}
              disabled={isAlreadyExtracted}
            >
              EXTRACT
            </Button>
          </Row>
        </Form>    
      </div>
    )
  }
}


ForExtractionTab.propTypes = {
	donorID: PropTypes.number.isRequired
}

export default ForExtractionTab;
