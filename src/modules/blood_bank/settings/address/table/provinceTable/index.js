import React, { Component } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import ProvinceForm from '../provinceForm'
import TablePager from 'shared_components/table_pager';
import fetchProvinceItems from 'services/blood_bank/address'
import { 
  Row, 
  Col, 
  Table, 
  Button, 
  Input, 
  Drawer 
} from 'antd';

const { Search } = Input;

const columns = [
  {
    title: 'PROVINCE',
    dataIndex: 'province_name',
  }
];

export default class ProvinceTable extends Component {
  constructor(props) {
		super(props);
		this.state = { 
      visible: false,
      ProvinceItems:[],
    }
	}

  async componentDidMount() {
		this.setState({loading:true});
		const response = await fetchProvinceItems();
    this.setState({ 
      ProvinceItems:response,
      usersRef:response,
      pagination: response.length,
		});
	}

  onSearch = (value) => {
		const searchedVal = value.toLowerCase();
		const { usersRef } = this.state;

		const filtered = usersRef.filter((item) => {
			// eslint-disable-next-line camelcase
			const { province_name } = item;
			return (
				this.containsString(province_name, searchedVal)
			);
		});
		this.setState({ 
			ProvinceItems: filtered 
		});
	};

	onChangeSearch = (event) => {
		const { usersRef } = this.state;
		if (event.target.value === "") this.setState({ ProvinceItems: usersRef });
	};

	containsString = (searchFrom, searchedVal) => {
		if (searchFrom === null || searchFrom === "") return false;
		return searchFrom.toString().toLowerCase().includes(searchedVal);
	};


  displayDrawer = (record) => {
		this.setState({
			visible: true,
			drawerTitle: "UPDATE PROVINCE",
			selecetedData:record,
      buttonNames:"UPDATE"
		});
	}

  onDrawerClose = () => {
		this.setState({ visible: false });
	};
  
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
		// eslint-disable-next-line radix
		pagination.pageSize = parseInt(value);
		this.setState({ pagination });
  }

  render() {
    const { 
      visible,
      drawerTitle, 
      buttonNames,
      ProvinceItems,
      selecetedData,
      pagination,
    } = this.state

    return (
      <div>
        <Row style={{ marginBottom: 10 }}>
          <Col span={12} >
            <Search style={{ width: 215 }}
                    placeholder="SEARCH BY PROVINCE"
                    allowClear
                    onSearch={(value) => this.onSearch(value)}
                    onChange={this.onChangeSearch}
            
            />
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button 
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
            selecetedData={selecetedData}
          />
        </Drawer>
      </div>
    )
  }
}
