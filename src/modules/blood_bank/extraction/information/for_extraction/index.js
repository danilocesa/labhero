import React from "react"
import { Input, Row, Col,Form , InputNumber, Button  } from 'antd';


// CUSTOM MODULES


const { TextArea } = Input;


class ForExtraction extends React.Component {

  render() {
    return (
      <div>
        NO. OF BAGS: <InputNumber  style={{ width:80, marginLeft:20}} />
        <Form layout='vertical' style={{padding:30, marginBottom:-100 , marginLeft:-100}}>
        <Row>
          <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Form.Item label="DATE AND TIME EXTRACTED">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Form.Item label="EXPIRY DATE">
             <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Form.Item label="EXTRACTED DATE">
             <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
        </Row>
        </Form>
        <div style={{marginTop:20, padding:50 }}>
        REMARK
        <TextArea rows={6} style={{height:20}} />
            <Button type="primary" shape="round" style={{marginTop:50}}>EXTRACT</Button>
        </div>
        
      </div>
    )
  }
}

export default ForExtraction;
