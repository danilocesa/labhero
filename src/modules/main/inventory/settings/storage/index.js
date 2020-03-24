// LiBRARY
import StorageForm from '../storage/storage_form';
import React from 'react';
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
import { drawerUpdateTitle, drawerAddTitle, tablePageSize, tableSize, buttonLabels } from './settings';
// CUSTOM MODULES

//  CONSTANTS
const { Title } = Typography;
const { TextArea } = AntInput;
const columns = [
  {
    title: 'STORAGE ID',
    dataIndex: 'storage_id',
    key: 'storage_id'
  },
  {
    title: 'STORAGE NAME',
    dataIndex: 'storage_name',
    key: 'storage_name',
  },
  {
    title: 'STORAGE DESCRIPTION',
    dataIndex: 'storage_description',
    key: 'storage_description',
  }
];

const data = [
  {
    key: '1',
    storage_id: 1,
    storage_name: 'John Brown',
    storage_description: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    storage_id: 2,
    storage_name: 'Jim Green',
    storage_description: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    storage_id: 3,
    storage_name: 'Joe Black',
    storage_description: 'Sidney No. 1 Lake Park'
  },
];

class InventoryStorageTemplate extends React.Component {
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
            <Title level={4}>STORAGE SETUP</Title>
            <AntForm onSubmit={this.handleSubmit}>
            
              <AntForm.Item label="STORAGE NAME">
                {getFieldDecorator('storage_name', {
                  rules: [{ required: true, message: 'Please input!' }],
                })(
                  <AntInput />,
                )}
              </AntForm.Item>
              <AntForm.Item label="DESCRIPTION">
                {getFieldDecorator('description', {
                  rules: [{ required: true, message: 'Please input!' }],
                })(
                  <TextArea rows={6} />,
                )}
              </AntForm.Item>
              <AntRow>
                <AntCol span={24} style={{ textAlign: 'right' }}>
                  <AntButton onClick={this.handleReset} shape="round">
                    Clear
                  </AntButton>
                  <AntButton type="primary" htmlType="submit" style={{ marginLeft: 8 }} shape="round">
                    Add
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
					<StorageForm 
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

const InventoryStorage = AntForm.create()(InventoryStorageTemplate);

export default InventoryStorage;