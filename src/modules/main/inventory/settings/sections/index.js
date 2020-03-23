// LiBRARY
import React from 'react';
import { 
  Row as AntRow, 
  Col as AntCol, 
  Typography, 
  Form as AntForm, 
  Input as AntInput, 
  Button as AntButton,
  Table as AntTable
} from 'antd';

// CUSTOM MODULES

//  CONSTANTS
const { Title } = Typography;
const columns = [
  {
    title: 'SECTION ID',
    dataIndex: 'section_id',
    key: 'section_id'
  },
  {
    title: 'SECTIOn',
    dataIndex: 'section',
    key: 'section',
  }
];

const data = [
  {
    key: '1',
    section_id: 1,
    section: 'John Brown'
  },
  {
    key: '2',
    section_id: 2,
    section: 'Jim Green'
  },
  {
    key: '3',
    section_id: 3,
    section: 'Joe Black'
  },
];

class InventorySectionTemplate extends React.Component {
  state = { }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return ( 
			<div>
        <AntRow>
          <AntCol span={6}>
            <Title level={4}>SECTION SETUP</Title>
            <AntForm onSubmit={this.handleSubmit} >
              <AntForm.Item label="SECTION ID">
                {getFieldDecorator('section_id', {
                  rules: [{ required: true, message: 'Please input!' }],
                })(
                  <AntInput />,
                )}
              </AntForm.Item>
              <AntForm.Item label="SECTION">
                {getFieldDecorator('section', {
                  rules: [{ required: true, message: 'Please input!' }],
                })(
                  <AntInput />,
                )}
              </AntForm.Item>
              <AntRow>
                <AntCol span={24} style={{ textAlign: 'right' }}>
                  <AntButton onClick={this.handleReset}>
                    CLEAR
                  </AntButton>
                  <AntButton type="primary" htmlType="submit" style={{ marginLeft: 8 }}>
                    ADD
                  </AntButton>
                </AntCol>
              </AntRow>
            </AntForm>
          </AntCol>
          <AntCol span={2} />
          <AntCol span={16}>
            <AntTable columns={columns} dataSource={data} />
          </AntCol>
        </AntRow>
			</div>
    );
  }
}

const InventorySection = AntForm.create()(InventorySectionTemplate);

export default InventorySection;