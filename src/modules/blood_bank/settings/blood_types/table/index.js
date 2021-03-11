import React, { Component } from 'react'
import fetchBloodGroupItems from 'services/blood_bank/blood_group'
import TablePager from 'shared_components/table_pager';
import { Table,Drawer,Row,Col,Button,Input,Divider,Select,Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BloodtypesForm from '../form'

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

const dataSource = [
  {
    BT: '1',
    DES: 'Mike'
  },
  {
    BT: '2',
    DES: 'John'
  },
];

const columns = [
  {
    title: 'BLOOD TYPE',
    dataIndex: 'BT',
  },
  {
    title: 'DESCRIPTION',
    dataIndex: 'DES',
  },
  
];

export default class BloodTypesTable extends Component {
  constructor(props) {
		super(props);
			this.state = {
				drawerTitle:"",
				isDrawerVisible	: false,
        Data: [],
        dropdownvalues:'',
        drawerButton:''
			}
	}

  async componentDidMount(){
    const apiResponse = await fetchBloodGroupItems();
    this.setState({
      Data:apiResponse
    })
  }

  showDrawer = (record) => {
    const {dropdownvalues} =this.state
		this.setState({
			isDrawerVisible: true ,
			drawerTitle: `ADD BLOOD TYPES - ${dropdownvalues}`,
			buttonNames: "ADD",
		});
	};

  handleChange = (value) =>{
    this.setState({
      dropdownvalues:value
    })
  }

  displayDrawerUpdate = (record) => {
    const {dropdownvalues} =this.state
		this.setState({
			isDrawerVisible: true,
			drawerTitle:`UPDATE BLOOD TYPES - ${dropdownvalues}`,
			buttonNames: "UPDATE",
		});
	}

  onClose = () => {
		this.setState({
			isDrawerVisible: false,
		});
	};

  render() {
    const {drawerTitle,isDrawerVisible,Data,buttonNames} = this.state
    const BloodGroupOption = Data.map((item,i) => {
      return (<option key={i} value={item.blood_group}>{item.blood_group}</option>)
    });


    return (
      <div>
        <Divider plain>
          <Row>
            <Col span={12}>
              <Title level={5}>BLOOD GROUP</Title>
            </Col>
            <Col span={12}>
              <Select style={{ width: 200 }} onChange={this.handleChange}>
                {BloodGroupOption}
              </Select>
            </Col>
          </Row>
        </Divider>
        <Row style={{marginTop:10}}>
          <Col span={12}>
            <Search
              allowClear
              style={{ width: 200 }}
              className="panel-table-search-input"
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
              ADD BLOOD TYPE
            </Button>
            <TablePager />
          </Col>
        </Row>
        <Table 
          style={{marginTop:10}}
          dataSource={dataSource} 
          columns={columns} 
          onRow={(record) => ({
            onDoubleClick: () => { 
              this.displayDrawerUpdate(record);
            },
          })}
        />
        <Drawer
          title={drawerTitle}
          visible={isDrawerVisible}
          onClose={this.onClose}
          width="30%"
          destroyOnClose
				>
          <BloodtypesForm buttonNames={buttonNames}/>
				</Drawer>
      </div>
    )
  }
}
