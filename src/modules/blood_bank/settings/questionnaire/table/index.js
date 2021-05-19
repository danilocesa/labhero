// @ts-nocheck
// LIBRARY
import React from 'react';
import TablePager from 'shared_components/table_pager';
import { Row, Col, Table, Button, Input, Icon, Drawer,Select,Divider } from 'antd';
import fetchQuestionnareList from 'services/blood_bank/questionnaire';

// CUSTOM
import QuestionTable from '../form'
import { 
	tableSize ,
} from '../settings';

const { Search } = Input;
const { Option } = Select;
const columns = [
	{
		title: 'ID',
		dataIndex: 'questionnare_id',
	},
	{
		title: 'CATEGORY',
		dataIndex: 'question_order',
  },
  {
		title: 'QUESTION',
		dataIndex: 'question',
	},
	{
		title: 'QUESTION TYPE',
		dataIndex: 'ques_type',
	},
];

class BloodBank extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			QuestionnareItem: [],
			actionType:'add',
			drawerTitle: '',
			selectedCategories:{},
		}
	}
	
	async componentDidMount() {
		const response = await fetchQuestionnareList();
		this.setState({ 
			QuestionnareItem: response,
			usersRef:response,
		});
	}

	showDrawer = (record) => {
		this.setState({
			visible: true,
			drawerTitle: "ADD QUESTION",
			drawerButton: "ADD",
			actionType : 'add',
			selectedCategories: record
		});
	};

	onClose = () => {
		this.setState({
			visible: false,
		});
	};

	displayDrawerUpdate = (record) => {
		this.setState({
			visible: true,
			drawerTitle: "UPDATE QUESTION",
			drawerButton: "UPDATE",
			actionType:'update',
			selectedCategories: record
		});
	};
	
	onSearch = (value) => {
		const searchedVal = value.toLowerCase();
		const { usersRef } = this.state;

		const filtered = usersRef.filter((item) => {
			// eslint-disable-next-line camelcase
			const { question_order } = item;

			return (
				this.containsString(question_order, searchedVal)
			);
		});
		this.setState({ QuestionnareItem: filtered });
	};

	onChangeSearch = (event) => {
		const { usersRef } = this.state;
		if (event.target.value === "") this.setState({ QuestionnareItem: usersRef });
	};

	// Private Function
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

	render() {
		const { pagination, visible, drawerTitle, loading,actionType,drawerButton,QuestionnareItem,selectedCategories } = this.state;
			return(
				<div>
					<div className="settings-user-table-action">
					<Divider plain>
						<Select style={{ width: 200 }}>
							<Option value="health">
								HEALTH
							</Option>
							<Option value="Categories">
								INNER
							</Option>
						</Select>
					</Divider>
					<Row>
						<Col span={12}>
							<Search
								allowClear
								onSearch={(value) => this.onSearch(value)}
								onChange={this.onChangeSearch}
								style={{ width: 200 }}
								className="panel-table-search-input"
							/>
						</Col>
						<Col span={12} style={{ textAlign: 'right' }}>
							<Button 
								type="primary" 
								shape="round" 
								style={{ marginRight: '15px' }} 
								onClick={this.showDrawer}
							>
								<Icon type="plus" /> ADD QUESTIONNAIRE
								
							</Button>
							<TablePager handleChange={this.handleSelectChange} />
						</Col>
					</Row>
					</div>
					<div className="settings-user-table">
						<Table 
							dataSource={QuestionnareItem}
							loading={loading}
							size={tableSize}
							columns={columns} 
							pagination={pagination}
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
					{/* DRAWER */}
						<Drawer
							title={drawerTitle}
							width="30%"
							visible={visible}
							onClose={this.onClose}
							destroyOnClose
						> 
							<QuestionTable 
								selectedCategories={selectedCategories}
								actionType={actionType}
								drawerButton={drawerButton} 
							/>	
						</Drawer>
				</div>
			)
	}
}


export default BloodBank;