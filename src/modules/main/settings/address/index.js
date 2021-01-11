// @ts-nocheck
// LIBRARY
import React from 'react';
import { Select, Table,Row, Drawer, Col,Icon, Button, Input,Form } from 'antd'; 
import { withRouter } from 'react-router-dom';
import PageTitle from 'shared_components/page_title';
import TablePager from 'shared_components/table_pager';
import CityList from './city'
import ProvinceList from './province'


const { Option } = Select;
const { Search } = Input;


const provinceColumns = [
	{
		title: 'PROVINCE ID',
		dataIndex: 'province_id',
		key: 1,
		width:210
	},
	{
		title: 'PROVINCE CODE',
		dataIndex: 'province_code',
		key: 2,	
		width:250
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
		width:210
	},
	{
		title: 'CITY CODE',
		dataIndex: 'city_code',
		key: 2,	
		width:250
	},
	{
		title: 'CITY NAME',
		dataIndex: 'city_name',
		key: 3,
		width:200
	},
	{
		title: 'PROVINCE',
		dataIndex: 'province',
		key: 3,
	}
];

const barangayColumns = [
	{
		title: 'BARANGAY ID',
		dataIndex: 'barangay_id',
		key: 1,
		width:210
	},
	{
		title: 'BARANGAY CODE',
		dataIndex: 'barangay_code',
		key: 2,	
		width:250
	},
	{
		title: 'BARANGAY NAME',
		dataIndex: 'barangay_name',
		key: 3,
		width:200
	},
	{
		title: 'CITY',
		dataIndex: 'city',
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

const barangayLabel = {
	id:"BARANGAY ID",
	code:"BARANGAY CODE",
	name:"BARANGAY NAME"
};

const cityLabel = {
	id:"CITY ID",
	code:"CITY CODE",
	name:"CITY NAME"
}

const provinceLabel = {
	id:"PROVINCE ID",
	code:"PROVINCE CODE",
	name:"PROVINCE NAME"
}

const provincetitle = {
	title:"ADD PROVINCE",
}

const citytitle = {
	title:"ADD CITY",
}

const barangaytitle = {
	title:"ADD BARANGAY",
}



class Address extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addressType: '',
			label:'',
			title:'',
			address:'',
   		}
	}
	      
	onAddressChange = (value) => {
		this.setState({addressType: value});
		this.setState({label: value});
		this.setState({title: value});
	};

	onClose = () => {
		this.setState({
			visible: false,
		});
	};

	showDrawer = () => {
		this.setState({
			visible: true,
			drawerTitle: "ADD",
			drawerButton: "ADD",
		});
	};
	
	displayDrawerUpdate = () => {
		this.setState({
			visible: true,
			drawerTitle: "UPDATE ",
			drawerButton: "UPDATE",
            
		});
  };

	render() {
		const { visible, drawerTitle,drawerButton, addressType, label, title } = this.state
		// eslint-disable-next-line no-nested-ternary
		const selectedColumns = addressType === "Province" 
				? provinceColumns : (addressType === "City" 
				? cityColumns : barangayColumns);
		// eslint-disable-next-line no-nested-ternary
		const selectedlabel = label === "Province" 
				? provinceLabel : (label === "City" 
				? cityLabel : barangayLabel);
		// eslint-disable-next-line no-nested-ternary
		const selectedData = addressType === "Province" 
				? provinceData : (addressType === "City" 
				? cityData : barangayData);
		// eslint-disable-next-line no-nested-ternary
		const selectedtitle = title === "Province" 
				? provincetitle : (addressType === "City" 
				? citytitle : barangaytitle);

		return(
			<div>
				<section style={{ textAlign: 'center', marginTop: 5 }}>
					<PageTitle pageTitle="ADDRESS" />
						<Row style={{ marginTop: 30 }}>
								<Select
										style={{ width: 300 }}
										onChange={this.onAddressChange}
								>
										<Option value="Barangay">Barangay</Option>
										<Option value="Province">Province</Option>
										<Option value="City">City</Option>
								</Select>
						</Row>
				</section>	
					<div className="settings-user-table-action">
						<Row style={{ marginTop: 80 }}>
							<Col span={12}>
								<Search
									placeholder="input search text"
									onSearch={value => value}
									style={{ width: 200 }}
								/>
							</Col>
							<Col span={12} style={{ textAlign: 'right' }}>
								<Button 
									type="primary" 
									shape="round" 
									style={{ marginRight: '15px' }} 
									onClick={this.showDrawer}
								>
									<Icon type="plus" /> {selectedtitle.title}
								</Button>
								<TablePager handleChange={this.handleSelectChange} />
							</Col>
						</Row>
					</div>	
					<Table 
						dataSource={selectedData}
						columns={selectedColumns} 
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
						<Drawer
								title={drawerTitle}
								width="30%"
								visible={visible}
								onClose={this.onClose}
								destroyOnClose
						> 
							<Form name="basic" initialValues={{ remember: true }}>
									<Form.Item label={selectedlabel.id} style={{marginTop:-10}}>
										<Input />
									</Form.Item>
									<Form.Item label={selectedlabel.code} style={{marginTop:-20}}>
										<Input />
									</Form.Item>
									<Form.Item label={selectedlabel.name} style={{marginTop:-20}}>
										<Input />
									</Form.Item>
									<Form.Item style={{marginTop:-20}}>
										
								{title === "Province" 
									? "": (title === "City" 
									? <ProvinceList form={this.props.form} placeholder="Province" />  : <CityList form={this.props.form} placeholder="City" /> )
								}
									</Form.Item>
							</Form>
							<section className="drawerFooter">
									<Button 
										shape="round" 
										style={{ marginRight: 8, width: 120 }} 
										onClick={this.onClose}
									>
										CANCEL
									</Button>
									<Button 
										type="primary" 
										shape="round" 
										style={{ margin: 10, width: 120 }} 
										htmlType="submit"
									>
										{drawerButton}
									</Button>
							</section>
						</Drawer>	
			</div>
		)
	}
}

export default withRouter(Address);