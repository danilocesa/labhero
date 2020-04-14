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
  Table as AntTable,

} from 'antd';

// CUSTOM MODULES
import { drawerUpdateTitle, drawerAddTitle, tablePageSize, tableSize, buttonLabels } from './settings';
//  CONSTANTS
const { Title } = Typography;
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'BLOOD GROUP',
    dataIndex: 'blood_group',
    key: 'blood_group'
  },
  {
    title: 'DESCRIPTION',
    dataIndex: 'description',
    key: 'description',
  }
];

const data = [
  {
    key: '1',
    id: 1,
    blood_group: 'Joe Black',
    description:"sample"
  },
  {
    key: '2',
    id: 2,
    blood_group: 'Joe Black',
    description:"sample"
  },
  {
    key: '3',
    id: 3,
    blood_group: 'Joe Black',
    description:"sample"
  },
];


class blood_group extends React.Component {
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
            <Title level={4}>BLOOD GROUP</Title>
            <AntForm onSubmit={this.handleSubmit} >
              <AntForm.Item label="BLOOD GROUP">
                {getFieldDecorator('category_name', {
                  rules: [{ required: true, message: 'Please input!' }],
                })(
                  <AntInput />
                )}
              </AntForm.Item>
              <AntForm.Item label="DESCRIPTION">
                {getFieldDecorator('category_name', {
                  rules: [{ required: true, message: 'Please input!' }],
                })(
                  <AntInput />
                )}
              </AntForm.Item>
                  {/* BUTTON */}
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

            {/* onDoubleClick */}
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

const InventoryCategories = AntForm.create()(blood_group
    );

export default InventoryCategories;