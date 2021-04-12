import React, { Component } from 'react'
import PageTitle from 'shared_components/page_title';
import SearchPager from 'shared_components/search_pager';
import Pagination from 'shared_components/table_pagination'
import { GLOBAL_TABLE_PAGE_SIZE } from 'global_config/constant-global';
import { RegexInput } from 'shared_components/pattern_input';
import fetchDonors, { fetchPatientsNext } from 'services/blood_bank/screening';
import Message from 'shared_components/message';
import NotifModal from '../modal/NotifModal';

import {
  Row ,
  Col ,
  Table,
  Button,
  Typography,
  Form
} from "antd";

const { Text } = Typography;
const columns = [
  {
    title: "DONOR'S ID",
    dataIndex: "donor_id",
  },
  {
    title: 'LAST NAME',
    dataIndex: "last_name",
  },
  {
    title: 'FIRST NAME',
    dataIndex: "first_name",
  },
  {
    title: 'MIDDLE NAME',
    dataIndex: 'middle_name',
  },
  {
    title: 'GENDER',
    dataIndex: "gender",
  },
  {
    title: 'DATE OF BIRTH',
    dataIndex: 'birth_date',
  },
  {
    title: 'ADDRESS',
    // render: record => (
    //   `${record.province_name} ${record.city_name} ${record.barangay_name} ${record.address_line_1} ${record.address_line_2}`
    // )
  },
  {
    title: 'BLOOD TYPE',
    dataIndex: 'blood_type'
  },
  {
    title: 'LAST EXTRACTED',
    dataIndex: 'last_extracted',
  },
  {
    title: 'status',
    dataIndex: 'status',
  }
];

export default class ForScreeningSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      pageSize: 1,
      count:0 ,
      response:{}
    };
    this.formRef = React.createRef();
  }

  redirect = (donorDetail) => {
    this.props.history.push('/bloodbank/screening/details', {donorDetail:donorDetail});
  }

  handleSubmit = async () => {  
    const { pageSize } = this.state
		const { getFieldsValue } = this.formRef.current;
    const { donorID, donorName } = getFieldsValue()

    this.setState({ loading: true });
    const donors = await fetchDonors(donorName, donorID, pageSize);  
    console.log("file: index.js ~ line 90 ~ ForScreeningSearch ~ handleSubmit= ~ donors", donors)
    
    this.setState({ 
      loading: false,
      response: donors,
      data: donors.results, 
      count: donors.count,
    });

    if(donors.length <= 0) 
      Message.info('No results found');
  } 

  handleChangeTableSize = async (pageSize) => {
    const { donorName, page } = this.state
    const donors = await fetchDonors(donorName,page,pageSize); 
		this.setState({ 
      pageSize,
      response: donors,
      count:donors.count,
      data: donors.results 
    });
	}

  callbackFunction = async (page) => { 
    const { response } =this.state
    if (response.next === null) {
      const url = response.previous
      this.setState({ loading: true });
      const donors = await fetchPatientsNext(url);
      this.setState({ 
        loading: false,
        response: donors,
        count:donors.count,
        data: donors.results 
      });
    } else if(response.previous === null) {
      const url = response.next
      this.setState({ loading: true });
      const donors = await fetchPatientsNext(url);
      this.setState({ 
        loading: false,
        response: donors,
        count:donors.count,
        data: donors.results 
      });
    } 
  }

  hideModal = () => {
    this.setState({
      isDisplayModal: false,
    });
  };

  showModal = () => {
    this.setState({
      isDisplayModal: true,
    });
  };


  render() {
    const { data, pageSize, count, response  } = this.state;

    return (
      <div>
        <PageTitle pageTitle="SCREENING"  />
        <Form 
          onFinish={this.handleSubmit} 
          className="blood-extract-search-form"
          layout="vertical"
          ref={this.formRef}
          style={{ marginTop: 20 }}
        >
          <Row 
            justify="center" 
            align="middle"
            gutter={12}
          >
            <Col>
              <Form.Item label="DONOR'S ID" name="donorID" >
                <RegexInput 
                  style={{width:200}}
                  regex={/[0-9]/} 
                  maxLength={100}
                  placeholder="Donor's ID"
                />
              </Form.Item>
            </Col>
            <Col>
              <div style={{ marginTop: 5 }}>
                <Text strong>OR</Text>
              </div>
            </Col>
            <Col>
              <Form.Item label="DONOR'S NAME" name="donorName">
                <RegexInput 
                  style={{ width:350 }}
                  regex={/[A-Za-z0-9, -]/} 
                  maxLength={100}
                  placeholder="Lastname, Firstname"
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item shouldUpdate> 
                {
                  ({ getFieldsValue }) => {
                    const { donorID, donorName } = getFieldsValue();
                    const disabled = !(donorID || (donorName && donorName.length > 1));
                    return (
                      <div style={{ marginTop: 25 }}>
                        <Button 
                          className="form-button"
                          shape="round" 
                          style={{ width: 120, marginLeft: 10 }}
                        >
                          CLEAR
                        </Button>
                        <Button 
                          className="form-button"
                          shape="round" 
                          type="primary" 
                          htmlType="submit" 
                          style={{ width: 120, marginLeft: 20 }}
                          disabled={disabled}
                        >
                          SEARCH
                        </Button>
                      </div>
                    );
                  }
                }
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <SearchPager 
          handleChangeSize={this.handleChangeTableSize}
          pageTotal={count}
          pageSize={pageSize}
          response={response}
        />
        <Table
          className="blood-extract-search-table"
          style={{ textTransform: 'uppercase', marginTop: 10 }}
          dataSource={data}
          pagination={false}
          loading={this.state.loading}
          columns={columns}
          rowKey={record => record.donor_id}
          onRow={(record) => {
            return {     
              onDoubleClick: () => {
                if(record.status.toUpperCase()  !== 'EXPIRED')
                  this.redirect(record)
              }
            }
          }}
        />
        <Pagination 
          pageSize={pageSize} 
          count={count}
          parentCallback={this.callbackFunction}
        />
      </div>
    )
  }
}
