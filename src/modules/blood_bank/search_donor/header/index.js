import React from 'react' 
import Message from 'shared_components/message'
import { Form, Input, Button, Row, Col, Select,Table } from 'antd'
import { fetchDonors,fetchCityList } from 'services/blood_bank/search_donor'
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
    dataIndex: 'city_name',
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
      Cityitem:CityList.sort((a,b)=>(a.city_name > b.city_name) ? 1: -1),
      bloodgroupItem: response.sort((a,b)=>(a.blood_type > b.blood_type) ? 1: -1),
		});
  }

  handleSubmit = async () => {
    const { getFieldsValue } = this.formRef.current;
    const { donors_id,blood_group,location_field } = getFieldsValue();
		this.setState({ loading: true });
    const donors = await fetchDonors(donors_id, blood_group ,location_field); 
    console.log("Donors", donors)
    this.setState({ 
        loading: false,
        Item: donors  
    });

		if(donors.length <= 0) 
      Message.info('No results found');
  }

  
  render(){
    
    const { bloodgroupItem , Item, Cityitem} = this.state
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
                        <Input type="number" />
                    </Form.Item>
                  </div>
                </Col>
                <Col span={6} order={2}>
                  <div>
                    <Form.Item label="BLOOD GROUP" name='blood_group'>
                      <Select  placeholder="Select your Blood Type" allowClear>
                        {bloodgroupList}
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={6} order={3}>
                  <div>
                    <Form.Item label="LOCATION" name='location_field'>
                      <Select placeholder="Select your location" allowClear>
                        {CityList}
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={6} order={4}>
                  <Form.Item shouldUpdate>
                    {({ getFieldsValue }) => {
                      const { donors_id, blood_group, location_field } = getFieldsValue();
                      const disabled = !(donors_id || blood_group || location_field );
                      return (
                        <Button 
                            type="primary" 
                            shape="round" 
                            htmlType="submit" 
                            disabled={disabled}
                        > SEARCH 
                        </Button>
                      )
                    }}
                  </Form.Item>
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

