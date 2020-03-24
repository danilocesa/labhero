// LiBRARY
import React from 'react';
import CategoriesForm from '../categories/categories_form';
import { 
  Drawer,
  Row as AntRow, 
  Col as AntCol, 
  Typography, 
  Form as AntForm, 
  Input as AntInput, 
  Button as AntButton,
  Table as AntTable
} from 'antd';

// CUSTOM MODULES
import { drawerUpdateTitle, drawerAddTitle, tablePageSize, tableSize, buttonLabels } from './settings';
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

  displayDrawerUpdate = (record) => {
		this.setState({
			isDrawerVisible: true,
			drawerTitle: drawerUpdateTitle,
			drawerButton: buttonLabels.update,
			panelInfo: record
		});
  }
  onClose = () => {
		this.setState({
			isDrawerVisible: false,
		});
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
                  <AntInput />
                )}
              </AntForm.Item>
              <AntForm.Item label="CATEGORY NAME">
                {getFieldDecorator('category_name', {
                  rules: [{ required: true, message: 'Please input!' }],
                })(
                  <AntInput />
                )}
              </AntForm.Item>
              <AntRow>
                <AntCol span={24} style={{ textAlign: 'right' }} >
                  <AntButton onClick={this.handleReset} shape="round">
                    CLEAR
                  </AntButton>
                  <AntButton type="primary" htmlType="submit" style={{ marginLeft: 8 }}shape="round"> 
                    ADD
                  </AntButton>
                </AntCol>
              </AntRow>
            </AntForm>
          </AntCol>
          <AntCol span={2} />
          <AntCol span={16}>
          <AntTable 
					className="settings-panel-table"
					size={tableSize}
					dataSource={data}
					pagination={this.state.pagination}
					loading={this.state.loading} 
          columns={columns}
          
					rowKey={record => record.key}
					onRow={(record) => {
						return {
							onDoubleClick: () => {
								this.displayDrawerUpdate(record);
							}
						}
					}}
				/>
        <Drawer 
					title={this.state.drawerTitle}
					visible={this.state.isDrawerVisible}
					onClose={this.onClose}
					width="40%"
					destroyOnClose
				>
					<CategoriesForm 
						drawerButton={this.state.drawerButton} 
						panelInfo={this.state.panelInfo}
						onCancel={this.onClose}
					/>
				</Drawer>
          </AntCol>
        </AntRow>
			</div>
    );
  }
}

const InventoryCategories = AntForm.create()(InventoryCategoriesTemplate);

export default InventoryCategories;