
import React, { useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'
import { Table, Input, Button, Form  } from 'antd';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import {fetchBloodStorageForLov, createBloodStorage} from 'services/blood_inventory/blood_storage'
import HttpCodeMessage from 'shared_components/message_http_status'
import messagePrompts from  './settings'
import fetchBloodComponents from  'services/blood_inventory/blood_components'
import moment from 'moment';
import Message from 'shared_components/message';
const EditableContext = React.createContext(null);


const EditableRow = ({ index, ...props }) => {
	const [form] = Form.useForm();
	return (
	  <Form form={form} component={false}>
		<EditableContext.Provider value={form}>
		  <tr {...props} />
		</EditableContext.Provider>
	  </Form>
	);
  };
  
const EditableCell = ({
	title,
	editable,
	children,
	dataIndex,
	record,
	handleSave,
	...restProps
	}) => {
	const [editing, setEditing] = useState(false);
	const inputRef = useRef(null);
	const form = useContext(EditableContext);
	useEffect(() => {
		if (editing) {
		inputRef.current.focus();
		}
	}, [editing]);

	const toggleEdit = () => {
		setEditing(!editing);
		form.setFieldsValue({
		[dataIndex]: record[dataIndex],
		});
	};

	const save = async () => {
		try {
		const values = await form.validateFields();
		toggleEdit();
		handleSave({ ...record, ...values });
		} catch (errInfo) {
		console.log('Save failed:', errInfo);
		}
};

let childNode = children;

if (editable) {
	childNode = editing ? (
	<Form.Item
		style={{
		margin: 0,
		}}
		name={dataIndex}
		rules={[
		{
			required: true,
			message: `${title} is required.`,
		},
		]}
	>
		<Input ref={inputRef} onPressEnter={save} onBlur={save} />
	</Form.Item>
	) : (
	<div
		className="editable-cell-value-wrap"
		style={{
		paddingRight: 24,
		}}
		onClick={toggleEdit}
	>
		{children}
	</div>
	);
}
  
	return <td {...restProps}>{childNode}</td>;
  };


class ProductDetailTable extends React.Component {
	
  state = {
    selectedRowKeys: [],
		disabled:true,
		bloodProductDetail: [],
		bloodComponentsData: []
  };
	
	
  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys,disabled:false });
  }

onClick = async () => {
	const { history } = this.props;
	const { dataSource } = this.state;
	// const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));

	const payload = dataSource[0];

		const createBloodProduct = await createBloodStorage(payload);
			// @ts-ignore
			if([201,200].includes(createBloodProduct.status)){
				const httpMessageConfig = {
					message: messagePrompts.successCreateUser,
					// @ts-ignore
					status: createBloodProduct.status,	
					duration: 3, 
					onClose: () => history.push('/bloodbank/blood_product')
				}
				HttpCodeMessage(httpMessageConfig);	
			}
			else
      		Message.error();
  }

	onChangeBloodStorage = (value) => {
		this.setState({BloodStorage:value})
  }

	onChangeBloodSize = (value) => {
		this.setState({BloodSize:value})
  }


  // @ts-ignore
  rowSelection  = async (selectedRowKeys, selectedRows) => {
	// const {  dataSource } = this.state;
	const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
	
	const blood_product = selectedRows.map(value =>{
		return({
			// ...dataSource,
			key: value.blood_processing_id,
			blood_type_name: value.blood_type_name,
			blood_processing_id: value.blood_processing_id,
			blood_bag_id: value.blood_bag_id,
			date_extracted: value.date_extracted,
			expiration_date: value.expiration_date,
			blood_storage: value.storage_name,
			storage_name: value.storage_name,
			storage_desc: value.storage_name,
			created_by: loggedinUser.userID,
			created_date: moment(),
			last_updated_by: loggedinUser.userID,
			last_updated_date: moment(),
			"child_sku": "string",
			"size": value.size  ,
			"remarks": value.remarks === null  ? "No Remarks" : value.remarks,
			
		})
	})

	this.setState({ disabled:false, dataSource: blood_product})
}
	async componentDidMount(){
		const { Data } = this.props;
		const dataSource = [Data];
		const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));

		const apiResponseBloodStorage = await fetchBloodStorageForLov();
		const bloodComponents = await fetchBloodComponents();

		const blood_product = dataSource.map(value =>{
			return({
				key: value.blood_processing_id,
				blood_type_name: value.blood_type_name,
				blood_processing_id: value.blood_processing_id,
				blood_bag_id: value.blood_bag_id,
				date_extracted: value.date_extracted,
				expiration_date: value.expiration_date,
				blood_storage: value.storage_name,
				storage_name: value.storage_name,
				storage_desc: value.storage_name,
				created_by: loggedinUser.userID,
				created_date: moment(),
				last_updated_by: loggedinUser.userID,
				last_updated_date: moment(),
				child_sku: "string",
				size: "Size",
				remarks: "Remarks"
				
			})
		})
	
    this.setState({
      	bloodStorageList:apiResponseBloodStorage,
	  	bloodComponentsData: bloodComponents,
		  dataSource: blood_product
    })

  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  onChange = (value) => {
    this.setState({
      getRemarks: value
      });
    
  }


  render() {
    
  const { disabled, dataSource } = this.state;
	
	const components = {
		body: {
			row: EditableRow,
			cell: EditableCell,
		},
	};
		
		
	this.columns = [
		{
			title: 'PRODUCT TYPE',
			dataIndex: 'blood_product',
		},
		{
			title: 'PRODUCT BAG ID',
			dataIndex: 'blood_bag_id',
		},
		{
			title: 'DATE PROCESSED',
			dataIndex: 'date_extracted',
		},
		{
			title: 'BEST BEFORE',
			dataIndex: 'expiration_date',
		}, 
		{
			title: 'Storage',
			dataIndex: 'storage_name',
			editable: true,
		}, 
		{
			title: 'SIZE',
			dataIndex: 'size',
			editable: true,
		}, 
		{
			title: 'REMARKS',
			dataIndex: 'remarks',
			editable: true,
		}, 
	]
	
	const rowSelection = {
		onChange: this.rowSelection
	};

	const columns = this.columns.map((col) => {
		if (!col.editable) {
			return col;
		}
	
		return {
			...col,
			onCell: (record) => ({
			record,
			editable: col.editable,
			dataIndex: col.dataIndex,
			title: col.title,
			handleSave: this.handleSave,
			}),
		};
		});
		
    return (

			<>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
		components={components}
        rowClassName={() => 'editable-row'}
      />
			<div style={{ textAlign: 'right', marginTop: 30 }}>
				<Button 
					type="ghost"
					style={{ width: 120, marginRight:10 }}
				>
					PRINT
				</Button>
				<Button 
					onClick={this.onClick}
					disabled={disabled}
					type="ghost"
					style={{ width: 120, marginRight:10 }}
				>
					PROCESS
				</Button>
				<Button 
					type="ghost"
					style={{ width: 120 }}
				>
					CANCEL
				</Button>
			</div>
			</>
    );
  }
}

ProductDetailTable.propTypes = {
	Data: PropTypes.object,
}

export default ProductDetailTable;