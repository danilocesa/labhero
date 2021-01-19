import React from "react";
import PropTypes from 'prop-types';
import { Input, Row, Col,Form , InputNumber, Button, Card, Tag, List } from 'antd';

// CUSTOM MODULES
import HttpCodeMessage from 'shared_components/message_http_status'
import { createExtraction } from 'services/blood_bank/extraction'
import { messagePrompts } from './settings'

import './index.css';

const { TextArea } = Input;

class ForExtractionTab extends React.Component {
  constructor(props){
    super(props);

    this.formRef = React.createRef();
  }

  onFinish = async (values) => {
    const payload = {
      bag_id: 1,
			no_of_bag: values.bags,
			date_time_extracted: values.date_and_time_extracted,
			expiration_date: values.expriry_date.format('YYYY-MM-DD'),
      extracted_date: values.extracted_date,
      remark: values.remark,
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
    return (
      <div className="bloodbank-for-extract-tab">
        <Form
          ref={this.formRef}
          layout="vertical"
          onFinish={this.onFinish} 
        >   
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item 
                name="bag_count"
                label="NO. OF BAGS" 
                initialValue={1}
              > 
                <InputNumber style={{ width: '100%' }} disabled />
              </Form.Item>
              
              <Form.Item 
                name="remark"
                label="REMARKS" 
              >
                <TextArea rows={6} />
              </Form.Item>
              <Button type="primary" shape="round" htmlType="submit" style={{ width: 120 }}>
                EXTRACT
              </Button>
            </Col>
            <Col span={12}>
              <div className="right-pane">
                <List
                  header={<div>EXTRACTED BAGS</div>}
                  grid={{ column: 1 }}
                  dataSource={[1,2,3,4,5]}
                  renderItem={item => (
                    <List.Item>
                      <Card 
                        title={<Tag color="magenta">BAG ID: {item}</Tag>}
                        size="small"
                      >
                        <Row>
                          <Col span={8}>
                            EXPIRY DATE: 
                          </Col>
                          <Col span={16}>
                            <Input value="12-12-2021" disabled />
                          </Col>
                        </Row>
                        <Row style={{ marginTop: 5 }}>
                          <Col span={8}>
                            EXTRACTED DATE: 
                          </Col>
                          <Col span={16}>
                            <Input value="12-12-2020" disabled />
                          </Col>
                        </Row>
                        <Row style={{ marginTop: 5 }}>
                          <Col span={8}>
                            EXTRACTED BY:
                          </Col>
                          <Col span={16}>
                            <Input value="EIGO ROBLES" disabled />
                          </Col>
                        </Row>
                        <Row style={{ marginTop: 5 }}>
                          <Col span={8}>
                            REMARKS: 
                          </Col>
                          <Col span={16}>
                            <TextArea value="Lorem Ipsum Dolor Sit Amet" disabled />
                          </Col>
                        </Row>
                      </Card>
                    </List.Item>
                  )}
                />
              </div>
            </Col>
          </Row>
        </Form>    
      </div>
    )
  }
}


ForExtractionTab.propTypes = {
	data: PropTypes.string.isRequired
}

export default ForExtractionTab;
