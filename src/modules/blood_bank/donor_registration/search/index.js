import React from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Steps,
  Typography,
  Form,
  Modal
} from "antd";

// ICON
import { SearchOutlined, ContainerOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { GLOBAL_TABLE_PAGE_SIZE } from 'global_config/constant-global';
import { RegexInput } from 'shared_components/pattern_input';
import PageTitle from 'shared_components/page_title';
import SearchPager from 'shared_components/search_pager';
import Message from 'shared_components/message';
import { searchDonors } from 'services/blood_bank/donor_registration';
import scanImage from 'images/bloodbank/donor_reg/fingerprint.gif';
import MatchFoundModal from '../modal/matchFound'
import NoMatchFoundModal from '../modal/noMatchFound'

import './index.css';
import { Link } from "react-router-dom";

const { Step } = Steps
const { Text } = Typography
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
    render: record => (
      `${record.address_line_1} ${record.address_line_2} ${record.barangay_name} ${record.city_name} ${record.province_name}`
    )
  },
  {
    title: "BLOOD TYPE",
    render: record => record.custom_fields_list.field_value
  },
  {
    title: "LAST EXTRACTED",
    dataIndex: 'last_extracted',
  },
];

class DonorRegSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: GLOBAL_TABLE_PAGE_SIZE,
      loading: false,
      data: [],
      actionType: null,
      modalVisible: true,
      showModalNoMatchFound: false,
      isDisplayModal: false,
      modalVisibleNoMatchFound: false,
    };
    this.formRef = React.createRef();
  } 


  handleChangeSize = (pageSize) => {
		this.setState({ pageSize });
	}   

  handleSubmit = async (data) => {
    const { donorName, donorId } = data;
    
    this.setState({ loading: true });
    
    const donors = await searchDonors(donorName, donorId); 

    this.setState({ 
      loading: false,
      data: donors,
      actionType: (donorName === '') ? 'byID' : 'byName'
    });


		if(donors.length <= 0) 
      Message.info('No results found');
  }
  
  onFocusDonorId = () => {
    const { setFieldsValue } = this.formRef.current;

    setFieldsValue({ donorName: '' });
  }

  onFocusDonorName = () => {
    const { setFieldsValue } = this.formRef.current;

    setFieldsValue({ donorId: '' });
  }

  onClickRegister = () => {
    this.props.history.push('/bloodbank/donor_registration/step/2', { label: 'SUBMIT' } );
  } 

  onRowDoubleClick = (record) => {
    this.props.history.push('/bloodbank/donor_registration/step/2', { ...record, label: 'UPDATE' });
  }

  clearInputs = () => {
    const { setFieldsValue } = this.formRef.current;

    setFieldsValue({ donorId: '', donorName: '' });

    this.setState({ actionType: '', data: [] })
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  hideModal = () => {
    this.setState({
      modalVisible: false,
      isDisplayModal: false,
      modalVisibleNoMatchFound: false
    });
  };

  showModalNoMatchFound = () => {
    this.setState({
      modalVisibleNoMatchFound: true,
      modalVisible: false,
    });
  }

  displayModalMatchfound = () => {
    this.setState({
      isDisplayModal: true,
      modalVisible: false,
    });
    
  }
  

  render() {
    const { data, loading, pageSize, actionType, modalVisible, showModalNoMatchFound, isDisplayModal, modalVisibleNoMatchFound } = this.state;

    const TableFooter = (
      <Row justify="center">
        <Button 
          onClick={this.onClickRegister}
          type="link"
          htmlType="submit" 
          style={{ width: 120 }}
        >
          REGISTER
        </Button>
      </Row>
    );


    return (
      <div>
        <PageTitle pageTitle="DONOR REGISTRATION"  />
        <Steps 
          size="small" 
          current={0} 
          labelPlacement="vertical"
          style={{ marginTop: 20, paddingRight: 200, paddingLeft: 200 }} 
        >
          <Step title="Search Donor" icon={<SearchOutlined />}  />
          <Step title="Fill Up" icon={<ContainerOutlined />} />
          <Step title="Health Information" icon={<MedicineBoxOutlined />} />
        </Steps>
        <Form 
          className="blood-donor-reg-search-form" 
          onFinish={this.handleSubmit} 
          ref={this.formRef}
          layout="vertical"
        >
          <Row gutter={12} align="middle" justify="center">
            <Col>
              <Form.Item label="DONOR'S ID" name="donorId">
                <RegexInput 
                  style={{width:200}}
                  regex={/[0-9]/} 
                  maxLength={100}
                  placeholder="Donor's ID"
                  onFocus={this.onFocusDonorId}
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
                  style={{ width: 300 }}
                  regex={/[A-Za-z0-9, -]/} 
                  maxLength={100}
                  placeholder="Lastname, Firstname"
                  onFocus={this.onFocusDonorName}
                />
              </Form.Item>
            </Col>
            <Col>
              <div style={{ marginTop: 25 }}>
                <Form.Item shouldUpdate> 
                  {({ getFieldsValue }) => {
                    const { donorId, donorName } = getFieldsValue();
                    const disabled = !(donorId || (donorName && donorName.length > 0));

                    return (
                      <Row>
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
                          style={{ width: 120, marginLeft: 15 }}
                          disabled={disabled}
                        >
                          SEARCH
                        </Button>
                      </Row>
                    )
                  }}
                </Form.Item>
              </div>
            </Col>
          </Row>  
        </Form>

          <Col span={24}>
            <Button
              className="form-button"
              shape="round" 
              onClick={this.showModal}
              style={{
                marginLeft: "79%",
                position: "absolute",
                zIndex: 99,
                marginTop: 15,
              }}
            >
              SCAN FINGER
            </Button>
            <SearchPager 
              handleChangeSize={this.handleChangeSize}
              pageTotal={data.length}
              pageSize={pageSize}
            />
          </Col>

        <Table 
          style={{textTransform: 'uppercase'}}
          dataSource={data}
          columns={columns} 
          pagination={{pageSize}}
          rowKey={record => record.donor_id}
          onRow={(record) => {
            return {     
              onDoubleClick: () => {
                this.onRowDoubleClick(record)
              }
            }
          }}
          {...(actionType === 'byName' && {footer: () => TableFooter})}
        />

        <Modal
          title="Scan Finger"
          visible={modalVisible}
          onOk={this.displayModalMatchfound}
          onCancel={this.showModalNoMatchFound}
          okText="Scan"
          cancelText="Cancel"
          className="modal"
        >
          <img style={{height: 300, filter: 'invert'}} src={scanImage} alt="Logo" />
        </Modal>

        <MatchFoundModal isDisplay={isDisplayModal} hideModal={this.hideModal} />
        <NoMatchFoundModal isDisplay={modalVisibleNoMatchFound} hideModal={this.hideModal} />

      </div>
    );
  }
}

export default DonorRegSearch;


