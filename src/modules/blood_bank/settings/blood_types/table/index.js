import React, { Component } from 'react'
import fetchBloodGroupItems from 'services/blood_bank/blood_group'
import {fetchBloodTypes} from 'services/blood_bank/blood_types'
import TablePager from 'shared_components/table_pager';
import { Table,Drawer,Row,Col,Button,Input,Divider,Select,Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BloodtypesForm from '../form'

const { Search } = Input;
const { Title } = Typography;


const columns = [
  {
    title: 'BLOOD TYPE',
    dataIndex: 'blood_type',
  },
  {
    title: 'DESCRIPTION',
    dataIndex: 'blood_desc',
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
        drawerButton:'',
        loading:false,
        tableData:[],
        AddButton:true,
        selectedBloodGroup:{},
			}
	}

  async componentDidMount(){
    const apiResponse = await fetchBloodGroupItems();
    this.setState({loading:true});
    const apiResponseBloodType = await fetchBloodTypes();
    this.setState({
      loading:false,
      Data:apiResponse,
      tableData:apiResponseBloodType
    })
  }

  showDrawer = (record) => {
    const {dropdownvalues} =this.state
		this.setState({
			isDrawerVisible: true ,
			drawerTitle: `ADD BLOOD TYPES - ${dropdownvalues}`,
			buttonNames: "ADD",
      selectedBloodTypes: record,
		});
	};

  handleChange = (value) =>{
    this.setState({
      dropdownvalues:value,
      AddButton:false
    })
  }

  displayDrawerUpdate = (record) => {
    console.log (record)
    const {dropdownvalues} =this.state
		this.setState({
			isDrawerVisible: true,
			drawerTitle:`UPDATE BLOOD TYPES - ${dropdownvalues}`,
			buttonNames: "UPDATE",
      selectedBloodTypes:record
		});
	}

  onClose = () => {
		this.setState({
			isDrawerVisible: false,
		});
	};

  render() {
    const {
      drawerTitle,
      isDrawerVisible,
      Data,
      buttonNames, 
      tableData,
      loading, 
      AddButton,
      dropdownvalues, 
      selectedBloodTypes,
    } = this.state
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
              <Select style={{ width: 200 }} onChange={this.handleChange} placeholder="Blood Group">
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
              disabled={AddButton }
            >
              ADD BLOOD TYPE
            </Button>
            <TablePager />
          </Col>
        </Row>
        <Table 
          loading={loading}
          style={{marginTop:10}}
          dataSource={tableData} 
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
          <BloodtypesForm 
            buttonNames={buttonNames} 
            dropdownvalues={dropdownvalues}
            selectedBloodTypes={selectedBloodTypes}
          />
				</Drawer>
      </div>
    )
  }
}
