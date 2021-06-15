
import React from 'react';
import PropTypes from 'prop-types'
import { Table, Select, Input, Button  } from 'antd';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import {fetchBloodStorageForLov, createBloodStorage} from 'services/blood_inventory/blood_storage'
import HttpCodeMessage from 'shared_components/message_http_status'
import messagePrompts from  './settings'
import fetchBloodComponents from  'services/blood_inventory/blood_components'

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
		const createBloodProduct = await createBloodStorage(bloodProductDetail);
			// @ts-ignore
			if(createBloodProduct.status === 200){
				const httpMessageConfig = {
					message: messagePrompts.successCreateUser,
					// @ts-ignore
					status: createBloodProduct.status,	
					duration: 3, 
					onClose: () => history.push('/bloodbank/blood_product')
					
				}
				HttpCodeMessage(httpMessageConfig);	
			}	
		
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
	const { BloodStorage, BloodSize, Remarks, bloodComponentsData } = this.state;
	const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
	
	const blood_product = selectedRows.map(value =>{
    console.log("🚀 ~ file: index.js ~ line 85 ~ ProductDetailTable ~ rowSelection= ~ value", value)
		return(
			{
			"blood_storage": BloodStorage,
			"blood_comp": 2,//value.blood_product,
			"blood_type": Data.blood_type_id,
			"extraction": Data.extraction_id,
			"expiration_date": Data.expiration_date,
			"parent_sku": Data.blood_bag_id,
			"child_sku": "string",
			"size": BloodSize  ,
			"remarks": "Remarks",//Remarks === undefined  ? "No Remarks" : Remarks,
			"created_by": loggedinUser.userID
			}
		)
	})

	this.setState({bloodProductDetail: blood_product, disabled:false})
}
	async componentDidMount(){
    const apiResponseBloodStorage = await fetchBloodStorageForLov();
	const bloodComponents = await fetchBloodComponents();

    // const bloodComponentsDetails = bloodComponents.map(value =>{
	// 	return(
	// 		{
	// 		"blood_comp_code": value.blood_comp_code,
	// 		"blood_comp_description": value.blood_comp_description,
	// 		"key": value.blood_comp_id,
	// 		"blood_comp_name": value.blood_comp_name
	// 		}
	// 	)
	// })
	
    this.setState({
      bloodStorageList:apiResponseBloodStorage,
	  bloodComponentsData: bloodComponents
    })

  }

  render() {
		
    // @ts-ignore
    const { selectedRowKeys, bloodStorageList,disabled, bloodComponentsData } = this.state;

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
	Data: PropTypes.object.isRequired,
}

export default ProductDetailTable;