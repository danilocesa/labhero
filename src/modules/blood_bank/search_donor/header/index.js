import React from 'react' 
import Message from 'shared_components/message'
import { Form, Input, Button, Row, Col, Select,Table } from 'antd'
import { fetchPatients,fetchCityList } from 'services/blood_bank/search_donor'
import fetchbloodgroupitems from 'services/blood_bank/blood_group';
import TablePager from 'shared_components/table_pager';

// CONSTANTS
const { Option } = Select;

const columns = [
  {
    title: 'ID',
    dataIndex: 'donor_id',
    width: '15%'
  },
  {
    title: 'LAST NAME',
    dataIndex: 'last_name',
    width: '15%'
  },
  {
    title: 'FIRST NAME',
    dataIndex: 'first_name',
    width: '15%'
  },
  {
    title: 'MIDDLE NAME',
    dataIndex: 'middleName',
    width: '15%'
  }, 
  {
    title: 'DATE OF BIRTH',
    dataIndex: 'birth_date',
    width: '14%'
  },
  {
    title: 'GENDER',
    dataIndex: 'gender',
    width: '12%'
  },
  {
    title: 'ADDRESS',
    dataIndex: 'barangay',
  },
];

class Header_Search_Donor extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      Item: [],
      bloodgroupItem: [],
      Cityitem:[],
      lastresponse:[]
    };
    this.formRef = React.createRef();
  } 

  async componentDidMount() {
    const CityList = await fetchCityList();
    this.setState({loading:true});
    const response = await fetchbloodgroupitems();
		this.setState({ 
      Cityitem:CityList,
      bloodgroupItem: response,
		});
  }

  handleSubmit = async () => {
    const { getFieldsValue } = this.formRef.current;
    const { donors_id,Blood_group,location } = getFieldsValue();
		this.setState({ loading: true });
    const patients = await fetchPatients(donors_id, Blood_group,location); 
    console.log("Patients", patients)
    this.setState({ 
        loading: false,
        Item: patients  
    });

		if(patients.length <= 0) 
      Message.info('No results found');
  }

  
  render(){
    
    const { bloodgroupItem , Item, Cityitem} = this.state
    console.log(Cityitem,"responseCity")
    let bloodgroupList = bloodgroupItem.length > 0
		&& bloodgroupItem.map((item, i) => {
		return (
			<option key={i} value={item.blood_type_id}>{item.blood_type}</option>
		)
  	}, this);
    let CityList = Cityitem.length > 0
		&& Cityitem.map((item, i) => {
		return (
			<option key={i} value={item.barangay_id}>{item.city_name}</option>
		)
    }, this);
    
      return(
          <div>
            <Form className="search-patient-form" ref={this.formRef}  onFinish={this.handleSubmit} style={{marginLeft:150,marginTop:50}}>
              <Row gutter={16}>
                <Col span={6} order={1}>
                  <div>
                    <Form.Item label="DONOR'S I D" name='donors_id'>
                        <Input/>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={6} order={2}>
                  <div>
                    <Form.Item label="BLOOD GROUP" name='Blood_group'>
                      <Select  placeholder="Select your Blood Type" allowClear>
                        {bloodgroupList}
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={6} order={3}>
                  <div>
                    <Form.Item label="LOCATION" name='location'>
                      <Select placeholder="Select your location" allowClear>
                        {CityList}
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={6} order={4}>
                  <div>
                    <Form.Item>
                      <Button 
                          type="primary" 
                          shape="round" 
                          htmlType="submit" 
                      > SEARCH 
                      </Button>
                    </Form.Item>
                  </div>
                </Col>
              </Row>  
            </Form>
            <div style={{marginBottom:10, marginTop:'50px' }}>
             <TablePager handleChange={this.handleSelectChange} />
            </div>
            <div className="settings-user-table">
              <Table 
                // @ts-ignore
                columns={columns} 
                scroll={{ y: 260 }}
                dataSource={Item}
              />
            </div>
        </div>
      );
  }
}

export default Header_Search_Donor;

