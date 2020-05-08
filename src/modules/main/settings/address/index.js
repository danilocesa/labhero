// @ts-nocheck
// LIBRARY
import React from 'react';
import { Select, Table,Row } from 'antd'; 
import PageTitle from 'shared_components/page_title';

const { Option } = Select;

const provinceColumns = [
	{
		title: 'PROVINCE ID',
		dataIndex: 'province_id',
		key: 1,
	},
	{
		title: 'PROVINCE CODE',
		dataIndex: 'province_code',
		key: 2,	
	},
	{
		title: 'PROVINCE NAME',
		dataIndex: 'province_name',
		key: 3,
    },
];

const cityColumns = [
	{
		title: 'CITY ID',
		dataIndex: 'city_id',
		key: 1,
	},
	{
		title: 'CITY CODE',
		dataIndex: 'city_code',
		key: 2,	
	},
	{
		title: 'CITY NAME',
		dataIndex: 'city_name',
		key: 3,
    }
	
];

const barangayColumns = [
	{
		title: 'BARANGAY ID',
		dataIndex: 'barangay_id',
		key: 1,
	},
	{
		title: 'BARANGAY CODE',
		dataIndex: 'barangay_code',
		key: 2,	
	},
	{
		title: 'BARANGAY NAME',
		dataIndex: 'barangay_name',
		key: 3,
    }
	
];

const provinceData = [
	{
		province_id: '1' ,
		province_code: '0001' ,
		province_name: 'Taguig' 
	},
	{
		province_id: '2' ,
		province_code: '0002' ,
		province_name: 'Taguig' 
	},
	{
		province_id: '3' ,
		province_code: '0003' ,
		province_name: 'Taguig' 
	},
];

const cityData = [
	{
		city_id: '1' ,
		city_code: '0001' ,
		city_name: 'Taguig' 
	},
	{
		city_id: '1' ,
		city_code: '0001' ,
		city_name: 'Taguig' 
	},
	{
		city_id: '1' ,
		city_code: '0001' ,
		city_name: 'Taguig' 
	},
];

const barangayData = [
	{
		barangay_id: '1' ,
		barangay_code: '0001' ,
		barangay_name: 'Taguig' 
	},
	{
		barangay_id: '2' ,
		barangay_code: '0002' ,
		barangay_name: 'Taguig' 
	},
	{
		barangay_id: '2' ,
		barangay_code: '0002' ,
		barangay_name: 'Taguig' 
	},
]

class Address extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addressType: '',
    }
	}
	      
	onAddressChange = (value) => {
		this.setState({addressType: value});
	}

	render() {

		// eslint-disable-next-line no-nested-ternary
		const selectedColumns = this.state.addressType === "Province" ? provinceColumns : (this.state.addressType === "City" ? cityColumns : barangayColumns);

		// eslint-disable-next-line no-nested-ternary
		const selectedData = this.state.addressType === "Province" ? provinceData : (this.state.addressType === "City" ? cityData : barangayData);

		return(
			<div>
				<section style={{ textAlign: 'center', marginTop: 30 }}>
					<PageTitle pageTitle="EXAM REQUEST" />
					<Row style={{ marginTop: 50 }}>
				<Select
						style={{ width: 120 }}
						onChange={this.onAddressChange}
				>
						<Option value="Barangay">Barangay</Option>
						<Option value="Province">Province</Option>
						<Option value="City">City</Option>
				</Select>
					</Row>
				</section>		
				<Table 
					dataSource={selectedData}
					// loading={loading}
					// size={tableSize}
					// scroll={{ y: tableYScroll }}
					columns={selectedColumns} 
					// pagination={pagination}
					rowKey={record => record.userID}
					onRow={(record) => {
						return {     
							onDoubleClick: () => {
								const rec = [];
								// eslint-disable-next-line no-restricted-syntax
								for(const [key, value] of Object.entries(record)){
									rec[key] = value;
								}
								this.displayDrawerUpdate(rec);
							}
						}
					}}
				/>		
			</div>
		)
	}
}


export default Address;