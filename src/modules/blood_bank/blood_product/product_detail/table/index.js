
import React from 'react';
import PropTypes from 'prop-types'
import { Table, Select, Input, Button  } from 'antd';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import {fetchBloodStorageForLov, createBloodStorage} from 'services/blood_inventory/blood_storage'
import HttpCodeMessage from 'shared_components/message_http_status'
import messagePrompts from  './settings'
import fetchBloodComponents from  'services/blood_inventory/blood_components'
import moment from 'moment';
import Message from 'shared_components/message';


const { Option } = Select;

const data = [
  {
		key: '1',
    blood_product: 'Red Blood Cell'
  },
  {
		key: '2',
    blood_product: 'White Blood Cell'
  },
  {
		key: '3', 
    blood_product: 'Plasma'
  },
	{
		key: '4',
    blood_product: 'Platelet'
  },
];


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
		const { bloodProductDetail } = this.state;
		const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));

	const payloadbloodProductDetail = bloodProductDetail.map(dtl => ({
		storage_name: dtl.storage_name,
		storage_desc: dtl.storage_name,
		created_by: dtl.created_by,
		created_date: moment(),
		last_updated_by: loggedinUser.userID,
		last_updated_date: moment()
	}));

	const payload = payloadbloodProductDetail[0];
    console.log("🚀 ~ file: index.js ~ line 64 ~ ProductDetailTable ~ onClick= ~ payload", payload)

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

	Remarks = (value) => {
		this.setState({Remarks:value.target.value})
  }

  // @ts-ignore
  rowSelection  = async (selectedRowKeys, selectedRows) => {
	const { Data } = this.props;
	const { BloodStorage, BloodSize, Remarks } = this.state;
	const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
	
	const blood_product = selectedRows.map(value =>{
		return({
			...Data,
			"blood_storage": BloodStorage,
			"child_sku": "string",
			"size": BloodSize  ,
			"remarks": Remarks === undefined  ? "No Remarks" : Remarks,
			"created_by": loggedinUser.userID
		})
	})

	this.setState({bloodProductDetail: blood_product, disabled:false})
}
	async componentDidMount(){
		const apiResponseBloodStorage = await fetchBloodStorageForLov();
		const bloodComponents = await fetchBloodComponents();
	
    this.setState({
      bloodStorageList:apiResponseBloodStorage,
	  	bloodComponentsData: bloodComponents
    })

  }

  render() {
    // @ts-ignore
    const {  bloodStorageList,disabled } = this.state;

		const bloodStorageOption = bloodStorageList === undefined ? null : bloodStorageList.map((item,i) => {
			return (<Option key={i} value={item.storage_name}>{item.storage_name}</Option>)
		});
		
		const columns = [
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
				render: () => 
				<>
					<Select defaultValue="Storage" onChange={this.onChangeBloodStorage} style={{ width: 120 }} allowClear>
						{bloodStorageOption}
					</Select>
				</>,
			}, 
			{
				title: 'SIZE',
				dataIndex: 'size',
				render: () => 
				<>
					<Select defaultValue="Size" onChange={this.onChangeBloodSize} style={{ width: 120 }} allowClear>
						{bloodStorageOption}
					</Select>
				</>,
			}, 
			{
				title: 'REMARKS',
				dataIndex: 'remarks',
				render: () => <Input placeholder="Remarks" onChange={this.Remarks}/>,
			}, 
		]
		
		const rowSelection = {
			onChange: this.rowSelection
		};
		
    return (

			<>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
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