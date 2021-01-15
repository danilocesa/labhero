import React from "react"
import PropTypes from 'prop-types'
import { Input, Row, Col,Form , InputNumber, Button,DatePicker  } from 'antd';

// CUSTOM MODULES
import HttpCodeMessage from 'shared_components/message_http_status'
import { createExtractionAPI } from 'services/blood_bank/extraction'
import { messagePrompts } from './settings'


const { TextArea } = Input;
class ForExtraction extends React.Component {

  onFinish = async values => {
    const { data } = this.props
    console.log("ForExtraction -> data", data.data.record.gender)
    const dateFormat = values.expriry_date.format('YYYY-MM-DD')
    const payload = {
      
      bag_id:1,
			no_of_bag :values.bags,
			date_time_extracted :values.date_and_time_extracted,
			expiration_date :dateFormat,
      extracted_date : values.extracted_date,
      remark:values.remark,
      created_by:1,
      extracted_by:1
    };
    const createdUserResponse = await createExtractionAPI(payload);
    // @ts-ignore
    if(createdUserResponse.status === 201){
      const httpMessageConfig = {
        message: messagePrompts.successCreateUser,
        // @ts-ignore
        status: createdUserResponse.status,	
        duration: 3, 
        onClose: () => window.location.reload() 
      }
      HttpCodeMessage(httpMessageConfig);	
    }	
  }

render() {
  return (
    <div>
      <Form
      onFinish={this.onFinish} 
      layout="vertical"
      >   
        <Form.Item label="NO. OF BAGS" name='bags'> 
          <InputNumber style={{ width:80 ,marginLeft:20 }} />
        </Form.Item>
        <Row style={{marginRight:90}}>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <Form.Item label="DATE AND TIME EXTRACTED" name='date_and_time_extracted'>
            <DatePicker placeholder="input placeholder" style={{width:220}} disabled  />
          </Form.Item>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <Form.Item label="EXPIRY DATE" name='expriry_date'>
            <DatePicker style={{width:220}} disabled  />
          </Form.Item>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <Form.Item label="EXTRACTED DATE" name='extracted_date'>
            <DatePicker style={{width:220}} disabled />
          </Form.Item>
        </Col>
        </Row>
        <Form.Item label="REMARK" name='remark' style={{padding:20}}>
          <TextArea rows={6}  />
        </Form.Item>

        <Button type="primary" shape="round" style={{float: 'right', marginTop:-20}} htmlType="submit">
          EXTRACT
        </Button>
       
      </Form>    
      
      
    </div>
  )
}
}


ForExtraction.propTypes = {
	data: PropTypes.string.isRequired
}

export default ForExtraction;
