import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TablePager from 'shared_components/table_pager';
import { PlusOutlined } from '@ant-design/icons';
import fetchCategoriesList from 'services/general_settings/categories';
import {  Table, Input, Button,  Row, Col,  Drawer } from 'antd';

// CUSTOM
import CategoriesForm from '../categories_form'

// CSS
import './selected_table.css';

	const { Search } = Input;
	const columns = [
		// {
		// 	title: 'ID',
		// 	dataIndex: 'categories_id',
		// 	key: 'categories_id',
		// },
		{
			title: 'ORDER',
			dataIndex: 'categories_order',
			key: 'categories_order',
			sorter: (a, b) => a.categories_id - b.categories_id,
		},
		{
			title: 'CATEGORY NAME',
			dataIndex: 'categories_name',
			key: 'categories_name',
		},
		{
			title: 'DESCRIPTION',
			dataIndex: 'categories_desc',
			key: 'categories_desc',
		},
	];

class SelectedTable extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
				categoriesItem: [],
				isDrawerVisible	: false,
				actionType:'add',
				selectedCategories:{},
			}
	}

	async componentDidMount() {
		const response = await fetchCategoriesList();
		this.setState({ 
			categoriesItem: response,
			usersRef:response,
			pagination: response.length,
			loading:false
		});
	};

	onClose = () => {
		this.setState({
			isDrawerVisible: false,
		});
	};

	showDrawer = (record) => {
		//console.log("HARRY TEsT console")
		this.setState({
			isDrawerVisible: true ,
			drawerTitle: "ADD CATEGORY",
			drawerButton: "ADD",
			actionType : 'add',
			selectedCategories: record
		});
	};

	onSearch = (value) => {
		const searchedVal = value.toLowerCase();
		const { usersRef } = this.state;

		const filtered = usersRef.filter((item) => {
			// eslint-disable-next-line camelcase
			const { categories_name } = item;
			return (
				this.containsString(categories_name, searchedVal)
			);
		});
		this.setState({ 
			categoriesItem: filtered 
		});
	};

	onChangeSearch = (event) => {
		const { usersRef } = this.state;
		if (event.target.value === "") this.setState({ categoriesItem: usersRef });
	};

	containsString = (searchFrom, searchedVal) => {
		if (searchFrom === null || searchFrom === "") return false;
		return searchFrom.toString().toLowerCase().includes(searchedVal);
	};
	
	handleSelectChange = (value) => {
		// eslint-disable-next-line react/no-access-state-in-setstate
		const pagination = {...this.state.pagination};
		// eslint-disable-next-line radix
		pagination.pageSize = parseInt(value);
		this.setState({ pagination });
	};

	displayDrawerUpdate = (record) => {
		this.setState({
			isDrawerVisible: true,
			drawerTitle: "UPDATE CATEGORY",
			drawerButton: "UPDATE",
			actionType:'update',
			selectedCategories: record
		});
	}

	render() {
		const { loading = false } = this.props;
		const { 
			isDrawerVisible, 
			actionType, 
			drawerButton, 
			patientInfo,
			drawerTitle,
			pagination,
			selectedCategories 
		} = this.state;

		return (
			<div>
				<Row style={{ marginBottom: 10 }}>
					<Col span={12}>
						<Search
							placeholder="Search By Category Name"
							allowClear
							onSearch={(value) => this.onSearch(value)}
							onChange={this.onChangeSearch}
							style={{ width: 300 }}
							className="panel-table-search-input"
						/>
					</Col>
					<Col span={12} style={{ textAlign: 'right' }}>
						<Button 
							type="primary" 
							shape="round" 
							style={{ marginRight: '15px' }} 
							onClick={this.showDrawer}
							icon={<PlusOutlined />}
						>
							ADD CATEGORY
						</Button>
						<TablePager handleChange={this.handleSelectChange} />
					</Col>
				</Row>
				<DndProvider backend={HTML5Backend}>
					<Table
						style={{textTransform:'uppercase'}}
						loading={loading}
						columns={columns}
						dataSource={this.state.categoriesItem}
						pagination={pagination}
						onRow={(record) => ({
							onDoubleClick: () => { 
								this.displayDrawerUpdate(record);
							},
						})}
					/>
					<Drawer
						title={drawerTitle}
						width="30%"
						visible={isDrawerVisible}
						onClose={this.onClose}
						destroyOnClose
					>
						<CategoriesForm
							selectedCategories={selectedCategories} 
							actionType={actionType}
							drawerButton={drawerButton} 
							patientInfo={patientInfo}
							onClose={this.onClose}
						/>
					</Drawer>
				</DndProvider>	
			</div>
		);
	}
}

export default SelectedTable;

