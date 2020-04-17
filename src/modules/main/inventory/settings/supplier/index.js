/* eslint-disable react/prop-types */
// LiBRARY
import SupplierForm from '../supplier/supplier_form';
import { drawerUpdateTitle, drawerAddTitle, tablePageSize, tableSize, buttonLabels } from './settings';
import React from 'react';
import { 
  Drawer ,
  Row as AntRow, 
  Col as AntCol, 
  Typography, 
  Form as AntForm, 
  Input as AntInput, 
  Button as AntButton,
  Table as AntTable
} from 'antd';

// CUSTOM MODULES
import ClearFormFields from 'shared_components/form_clear_button';

const { Title } = Typography;
const { TextArea } = AntInput;
const columns = [
  {
    title: 'SUPPLIER ID',
    dataIndex: 'supplier_id',
    key: 'supplier_id'
	},
  {
    title: 'SUPLIER',
    dataIndex: 'supplier',
    key: 'supplier',
  },
  {
    title: 'SUPPLIER DETAILS',
    dataIndex: 'supplier_details',
    key: 'supplier_details',
  }
];

const data = [
  {
    key: '1',
    supplier_id: 1,
    supplier: 'John Brown',
    supplier_details: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    supplier_id: 2,
    supplier: 'Jim Green',
    supplier_details: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    supplier_id: 3,
    supplier: 'Joe Black',
    supplier_details: 'Sidney No. 1 Lake Park'
  },
];

class InventorySupplierTemplate extends React.Component {
  state = { }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
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
            <Title level={4}>SUPPLIER SETUP</Title>
            <AntForm onSubmit={this.handleSubmit}>
              <AntForm.Item label="SUPPLIER NAME">
                {getFieldDecorator('supplier', {
                  rules: [{ required: true, message: 'Please input!' }],
                })(
                  <AntInput />,
                )}
              </AntForm.Item>
              <AntForm.Item label="SUPPLIER DETAILS">
                {getFieldDecorator('supplier_details', {
                  rules: [{ required: true, message: 'Please input!' }],
                })(
                  <TextArea rows={6} />
                )}
              </AntForm.Item>
              <AntRow>
                <AntCol span={24} style={{ textAlign: 'right' }}>
                  <ClearFormFields form={this.props.form} />
                  <AntButton type="primary" htmlType="submit" style={{ marginLeft: 8 }} shape="round" >
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
					<SupplierForm 
				
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

const InventorySupplier = AntForm.create()(InventorySupplierTemplate);

export default InventorySupplier;