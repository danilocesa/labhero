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

// import SearchPatientTableHeader from 'shared_components/search_patient_table_header';
// import SearchPatientHeaderForm from './search_patient/header_input'; // Search form input
// import SearchPatientTable from './phlebotable';
// import PhleboPatientResult from './phlebopatient';

//  CONSTANTS
const { Title } = Typography;
const { TextArea } = AntInput;
const columns = [
  {
    title: 'Supplier ID',
    dataIndex: 'supplier_id',
    key: 'supplier_id'
  },
  {
    title: 'Supplier',
    dataIndex: 'supplier',
    key: 'supplier',
  },
  {
    title: 'supplier details',
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

  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return ( 
			<div>
        <AntRow>
          <AntCol span={6}>
            <Title level={4}>SUPPLIER SETUP</Title>
            <AntForm onSubmit={this.handleSubmit} >
              <AntForm.Item label="SUPPLIER ID">
                {getFieldDecorator('supplier_id', {
                  rules: [{ required: true, message: 'Please input!' }],
                })(
                  <AntInput />,
                )}
              </AntForm.Item>
              <AntForm.Item label="SUPPLIER">
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
                  <TextArea rows={6} />,
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

const InventorySupplier = AntForm.create()(InventorySupplierTemplate);

export default InventorySupplier;