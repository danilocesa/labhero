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
import fetchPatients  from 'services/blood_bank/extraction';
import PageTitle from 'shared_components/page_title';
import Message from 'shared_components/message';
import SearchPager from 'shared_components/search_pager';

const { Text } = Typography;

const columns = [
  {
    title: "DONOR'S ID",
    dataIndex: "donor_id",
  },
  {
    title: "LAST NAME",
    dataIndex: "last_name",
  },
  {
    title: "FIRST NAME",
    dataIndex: "first_name",
  },
  {
    title: "MIDDLE NAME",
    dataIndex: 'middle_name',
  },
  {
    title: "GENDER",
    dataIndex: "gender",
  },
  {
    title: "DATE OF BIRTH",
    dataIndex: 'birth_date',
  },
  {
    title: "ADDRESS",
    dataIndex: 'barangay_name',
  },
  {
    title: "BLOOD TYPE",
    dataIndex: 'blood_type_name',
  },
  {
    title: "LAST EXTRACTED",
    dataIndex: 'last_extracted',
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
    let patients = [];
    this.setState({ loading: true });
    patients = await fetchPatients(donorName, donorID);  
    
    this.setState({ 
      loading: false,
      data: patients  
    });

    if(patients.length <= 0) 
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

  redirect = (record) => {
    this.props.history.push('/bloodbank/extraction/details', record);
  }

  render() {
    const { data, loading, pageSize } = this.state;

    return (
      <div>
        <PageTitle pageTitle="EXTRACTION/SCREENING"  />
        <Form 
          onFinish={this.handleSubmit} 
          ref={this.formRef}
          layout="vertical"
        >
          <Row 
            justify="center" 
            align="middle"
            style={{ marginTop: 20 }}
            gutter={12}
          >
            <Col>
              <Form.Item label="DONOR'S ID" name="donorID" style={{marginLeft:30}}>
                <RegexInput 
                  style={{width:200}}
                  regex={/[A-Za-z0-9, -]/} 
                  maxLength={100}
                  onFocus={this.onFocusDonorId}
                  placeholder="Donor's ID"
                />
              </Form.Item>
            </Col>
            <Col>
              <Text strong style={{ marginTop: 20, marginLeft:10 }}>OR</Text>
            </Col>
            <Col>
              <Form.Item label="DONOR'S NAME" name="donorName" style={{marginLeft:10}}>
                <RegexInput 
                  style={{width:350}}
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
          handleChange={this.handleChangeTableSize}
          pageTotal={data.length}
          pageSize={pageSize}
        />
        <Table
          style={{ textTransform: 'uppercase', marginTop: 10 }}
          dataSource={data}
          pagination={{ pageSize }}
          loading={this.state.loading}
          columns={columns}
          rowKey={record => record.donor_id}
          onRow={(record) => {
            return {     
              onDoubleClick: () => {
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
