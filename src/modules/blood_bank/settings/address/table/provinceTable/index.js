import React, { Component } from 'react';
import PropTypes from 'prop-types'
import fetchProvinceItems from 'services/blood_bank/address' 
import { PlusOutlined } from '@ant-design/icons';
import TablePager from 'shared_components/table_pager';
import ProvinceForm from '../provinceForm'
import { 
  Row, 
  Col, 
  Table, 
  Button, 
  Drawer,  } from 'antd';

	const columns = [
		{
			title: 'PROVINCE',
			dataIndex: 'province_name',
		}
	];

export default class c extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: true };
	} 

	async componentDidMount() {
		this.setState({loading:true});
		const response = await fetchProvinceItems();
    this.setState({ 
      ProvinceItems:response,
      pagination: response.length,
		});
	}

	showDrawer = (record) => {
		this.setState({
			visible: true,
			drawerTitle: "ADD PROVINCE",
			selecetedData: record,
      buttonNames:"ADD"
		});
	}

	handleChange = (value) =>{
    // eslint-disable-next-line react/no-access-state-in-setstate
		const pagination = {...this.state.pagination};
		pagination.pageSize = parseInt(value);
		this.setState({ pagination });
  }

	displayDrawer = (record) => {
		this.setState({
			visible: true,
			drawerTitle: "UPDATE CITY",
			selecetedData:record,
      buttonNames:"UPDATE"
		});
	}

	onDrawerClose = () => {
		this.setState({ visible: false });
	};


  render() {
		const { 
      visible,
      drawerTitle, 
      buttonNames,
      ProvinceItems,
      selecetedData,
      buttonDisable,
      pagination,
    } = this.state

    return (
			<div>
				<Row style={{marginTop:12, marginBottom: 12}}>
          <Col span={9} >
      

            
          </Col> 
          <Col span={4}>
          
          </Col>
          <Col span={11} style={{ textAlign: 'right' }}>
						<Button 
							disabled={buttonDisable}
							type="primary" 
							shape="round" 
							onClick={this.showDrawer}
							style={{ marginRight: '15px' }} 
							icon={<PlusOutlined />}
						>
							ADD PROVINCE
						</Button >
						<TablePager handleChange={this.handleChange}/>
          </Col>
				</Row>
				<Table  
					style={{textTransform:'uppercase'}}
					dataSource={ProvinceItems} 
					columns={columns} 
					pagination={pagination}
					onRow={(record) => {
						return {     
							onDoubleClick: () => {
								this.displayDrawer(record);
							}
						}
					}}/>
				<Drawer
					title={drawerTitle}
					width="30%"
					visible={visible}
					onClose={this.onDrawerClose}
					destroyOnClose
				>
					<ProvinceForm  
						buttonNames={buttonNames} 
						//Province={Province} 
						selecetedData={selecetedData}
					/>
				</Drawer>
			</div>
    )
  }
}

ProvinceForm.propTypes = {
	buttonNames: PropTypes.string.isRequired,
  selecetedData:PropTypes.object.isRequired,
}