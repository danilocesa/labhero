import React, { Component } from 'react'
import PageTitle from 'shared_components/page_title';
import SearchPager from 'shared_components/search_pager';
import { RegexInput } from 'shared_components/pattern_input';
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

const data =[
  {
    donor_id:1,
    last_name:'Santos',
    first_name:'Harry',
    middle_name:'C',
    gender:'Male',
    birth_date:'August',
    blood_type:'AB+',
    last_extracted:'09-09-2020',
    status:'On Going'
  }
];

export default class ForScreeningSearch extends Component {

  redirect = (record) => {
    this.props.history.push('/bloodbank/screening/details', record);
  }

  render() {
    return (
      <div>
        <PageTitle pageTitle="SCREENING"  />
        <Form 
          className="blood-extract-search-form"
          layout="vertical"
          style={{ marginTop: 20 }}
        >
          <Row 
            justify="center" 
            align="middle"
            gutter={12}
          >
            <Col>
              <Form.Item label="DONOR'S ID" name="donorID" style={{marginLeft:30}}>
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
        <SearchPager />
        <Table 
           className="blood-extract-search-table"
           style={{ textTransform: 'uppercase', marginTop: 10 }}
           dataSource={data}
           //loading={this.state.loading}
           columns={columns}
           rowKey={record => record.donor_id}
           rowClassName={(record) => record.status.toUpperCase() === 'EXPIRED' ? 'disabled-row' : ''}
           onRow={(record) => {
             return {     
               onDoubleClick: () => {
                 if(record.status.toUpperCase()  !== 'EXPIRED')
                   this.redirect(record)
               }
             }
           }}
        />;
      </div>
    )
  }
}
