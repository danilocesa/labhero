// @ts-nocheck
/* eslint-disable react/prop-types */
// LiBRARY
import React from "react";
import {
  Row ,
  Col ,
  Table,
  Button,
  Typography,
  Form,
  Pagination
} from "antd";

import Message from 'shared_components/message'; 
import PageTitle from 'shared_components/page_title';
import SearchPager from 'shared_components/search_pager';
import { RegexInput } from 'shared_components/pattern_input';
import { GLOBAL_TABLE_PAGE_SIZE } from 'global_config/constant-global';
import fetchDonors,{ fetchPatientsNext}  from 'services/blood_bank/extraction';

import './index.css';

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
    render: record => (
      `${record.address_line_1} ${record.address_line_2} ${record.barangay_name} ${record.city_name} ${record.province_name} `
    )
  },
  {
    title: 'BLOOD TYPE',
    dataIndex: 'blood_type'
  },
  {
    title: 'DATE CREATED',
    dataIndex: 'date_created',
  },
  {
    title: 'status',
    dataIndex: 'status',
  }
];


class Extraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donorName: null,
      data: [],
      loading: false,
      pageSize: GLOBAL_TABLE_PAGE_SIZE,
      count: 0 ,
      page: 1,
      response: {},
      showPagination: false
    };
    this.formRef = React.createRef();
  }
  
  handleSubmit = async () => {  
    const { pageSize, page } = this.state
		const { getFieldsValue } = this.formRef.current;
    const { donorID, donorName } = getFieldsValue()

    this.setState({ loading: true });

    const donors = await fetchDonors(donorName, donorID, pageSize, page);  
    console.log("🚀 ~ file: index.js ~ line 96 ~ Extraction ~ handleSubmit= ~ donors", donors)

    this.setState({ 
      showPagination : donors.results.length > 0,
      donorName,
      donorID,
      loading: false,
      response: donors,
      count:donors.count,
      data: donors.results 
    })   

    if(donors.results.length <= 0) {
      Message.info('No results found');
    }
  }

  onChangeDonorId = () => {
    const { setFieldsValue } = this.formRef.current;
    setFieldsValue({ donorName: '' });
  }

  onFocusDonorId = () => {
    const { setFieldsValue } = this.formRef.current;
    setFieldsValue({ donorName: '' });
  }

  onFocusDonorName = () => {
    const { setFieldsValue } = this.formRef.current;
    setFieldsValue({ donorID: '' });
  }

  handleChangeTableSize = async (pageSize) => {
    const { donorName, page, donorID } = this.state
    const donors = await fetchDonors(donorName, donorID, pageSize, page); 
		this.setState({ 
      pageSize,
      response: donors,
      count:donors.count,
      data: donors.results 
    });
	}  

  clearInputs = () => {
    const { setFieldsValue } = this.formRef.current;
    this.setState({ 
      data: [], 
      donorID: null, 
      donorName: null,
      count:0,
      showPagination:false 
    }); 
    setFieldsValue({ donorID: '',donorName: '' });
  }

  onPagination = async (page  ) => { 
    const { donorName, pageSize, donorID } = this.state
    const donors = await fetchDonors(donorName, donorID, pageSize, page); 
		this.setState({ 
      pageSize,
      response: donors,
      count:donors.count,
      data: donors.results 
    });
  }

  redirect = (donorDetail) => {
    this.props.history.push('/bloodbank/extraction/details',  {donorDetail:donorDetail})
  }

  render() {
    const { 
      data, 
      loading, 
      pageSize, 
      count,
      showPagination
    } = this.state;

    return (
      <div>
        <PageTitle pageTitle="EXTRACTION"  />
        <Form 
          onFinish={this.handleSubmit} 
          ref={this.formRef}
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
              <Form.Item label="DONOR'S ID" name="donorID" >
                <RegexInput 
                  style={{width:200}}
                  regex={/[0-9]/} 
                  maxLength={100}
                  onFocus={this.onFocusDonorId}
                  placeholder="Donor's ID"
                />
              </Form.Item>
            </Col>
            <Col>
              <div style={{ marginTop: 5 }}>
                <Text strong> OR </Text>
              </div>
            </Col>
            <Col>
              <Form.Item label="DONOR'S NAME" name="donorName">
                <RegexInput 
                  style={{ width:350 }}
                  regex={/[A-Za-z0-9, -]/} 
                  maxLength={100}
                  onFocus={this.onFocusDonorName}
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
                          onClick={this.clearInputs} 
                        >
                          CLEAR
                        </Button>
                        <Button 
                          loading={loading}
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
        />
        <Table
          className="blood-extract-search-table"
          style={{ textTransform: 'uppercase', marginTop: 10 }}
          dataSource={data}
          pagination={false}
          loading={this.state.loading}
          columns={columns}
          rowKey={record => record.donor_id}
          rowClassName={(record) => record.status.toUpperCase() === 'EXPIRED','INVALID' ? 'disabled-row' : ''}
          onRow={(record) => {
            return {     
              onDoubleClick: () => {
                if(record.status.toUpperCase()  !== 'EXPIRED')
                  this.redirect(record)
              }
            }
          }}
        />
        { showPagination === true && (		
          <div style={{ display: "flex", marginTop: 25 }}>
            <Pagination
              style={{ marginLeft: "auto" }}
              pageSize={pageSize}
              total={count}
              onChange={this.onPagination}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Extraction;
