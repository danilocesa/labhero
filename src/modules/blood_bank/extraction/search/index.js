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
  Form
} from "antd";

import { GLOBAL_TABLE_PAGE_SIZE } from 'global_config/constant-global';
import { RegexInput } from 'shared_components/pattern_input';
import fetchDonors  from 'services/blood_bank/extraction';
import PageTitle from 'shared_components/page_title';
import Message from 'shared_components/message';
import SearchPager from 'shared_components/search_pager';

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
      `${record.province_name} ${record.city_name} ${record.barangay_name} ${record.address_line_1} ${record.address_line_2}`
    )
  },
  {
    title: 'BLOOD TYPE',
    render: record => record.custom_fields_list.field_value
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


class Extraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      pageSize: GLOBAL_TABLE_PAGE_SIZE
    };
    this.formRef = React.createRef();
  }
  
  handleSubmit = async () => {  
		const { getFieldsValue } = this.formRef.current;
    const { donorID, donorName } = getFieldsValue()

    this.setState({ loading: true });
    const donors = await fetchDonors(donorName, donorID);  
    
    this.setState({ 
      loading: false,
      data: donors 
    });

    if(donors.length <= 0) 
      Message.info('No results found');
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

  handleChangeTableSize = (pageSize) => {
		this.setState({ pageSize });
	}  

  clearInputs = () => {
    const { setFieldsValue } = this.formRef.current;

    this.setState({ data: [] });
    
    setFieldsValue({ 
      donorID: '',
      donorName: ''
    });
  }


  redirect = (record) => {
    this.props.history.push('/bloodbank/extraction/details', { 
      ...record, 
      bloodtype: record.custom_fields_list.field_value
    });
  }

  render() {
    const { data, loading, pageSize } = this.state;

    return (
      <div>
        <PageTitle pageTitle="EXTRACTION/SCREENING"  />
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
              <Form.Item label="DONOR'S ID" name="donorID" style={{marginLeft:30}}>
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
                <Text strong>OR</Text>
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
          pageTotal={data.length}
          pageSize={pageSize}
        />
        <Table
          className="blood-extract-search-table"
          style={{ textTransform: 'uppercase', marginTop: 10 }}
          dataSource={data}
          pagination={{ pageSize }}
          loading={this.state.loading}
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
        />
      </div>
    );
  }
}

export default Extraction;
