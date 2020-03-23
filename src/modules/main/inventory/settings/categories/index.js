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
    title: 'CATEGORIES ID',
    dataIndex: 'categories_id',
    key: 'categories_id'
  },
  {
    title: 'CATEGORIES NAME',
    dataIndex: 'categories_name',
    key: 'categories_name',
  }
];

const data = [
  {
    key: '1',
    categories_id: 1,
    categories_name: 'John Brown'
  },
  {
    key: '2',
    categories_id: 2,
    categories_name: 'Jim Green'
  },
  {
    key: '3',
    categories_id: 3,
    categories_name: 'Joe Black'
  },
];

class InventoryCategoriesTemplate extends React.Component {
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
            <Title level={4}>CATEGORIES SETUP</Title>
            <AntForm onSubmit={this.handleSubmit} >
              <AntForm.Item label="CATEGORY ID">
                {getFieldDecorator('category_id', {
                  rules: [{ required: true, message: 'Please input!' }],
                })(
                  <AntInput />,
                )}
              </AntForm.Item>
              <AntForm.Item label="CATEGORY NAME">
                {getFieldDecorator('category_name', {
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

const InventoryCategories = AntForm.create()(InventoryCategoriesTemplate);

export default InventoryCategories;