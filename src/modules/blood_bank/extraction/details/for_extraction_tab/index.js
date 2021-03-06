import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { 
  Input, 
  Row,
  Col,
  Form, 
  InputNumber, 
  Button,
  DatePicker,
  Tabs,
  Popover  
} from 'antd';
import { Redirect } from 'react-router-dom';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';
import { createExtraction, fetchExtractionById } from 'services/blood_bank/extraction';
import { getUserAccountById } from 'services/settings/userAccount';
import { MoreOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { TabPane } = Tabs;


class ForExtractionTab extends React.Component {
  constructor(props){
    super(props);
    this.formRef = React.createRef();
    this.state = { 
      visible: false,
      isAlreadyExtracted: false,
      isLoading: false,
      redirect: false,
      buttonData:
      [
        {
          Title:'Screening',
          onclick:'/bloodbank/screening/details',
        }
      ]
    };
  }

  async componentDidMount() {
    const { donorDetail } = this.props;
    this.setState({
      isAlreadyExtracted:(donorDetail.donorDetail.status === 'Invalid' || donorDetail.donorDetail.status === 'Extracted') ? true : false,
    })
 
    if(donorDetail.extraction_id !== null) {
      this.fetchExtractionDetail(donorDetail.extraction_id);
    }
  }

  fetchExtractionDetail = async (extractionID) => {
    const extractionDetail = await fetchExtractionById(extractionID);

   if(extractionDetail !== null) {
     const userAccount = await getUserAccountById(extractionDetail.extracted_by);

    const formFields = {
        ...extractionDetail,
        extracted_date: moment(extractionDetail.extracted_date),
        expiration_date: moment(extractionDetail.expiration_date),
        extracted_by:`${userAccount.lastName} ${userAccount.givenName}`
     };

     this.formRef.current.setFieldsValue(formFields);

      this.setState({ isAlreadyExtracted: true });
   }
  }

  onSubmitForm = async (formValues) => {
    const { donorDetail } = this.props.donorDetail;
    const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));

    const payload = {
      donor: donorDetail.donor_id,
      health_info: donorDetail.health_info_id,
      remarks: formValues.remarks || null,
      created_by: loggedinUser.userID,
      extracted_by: loggedinUser.userID
    };
    this.setState({ isLoading: true });

    const APIresponse = await createExtraction(payload);
    
    // @ts-ignore
    const { status, data } = APIresponse;
    this.setState({ isLoading: false });


  if(status === 201){
    HttpCodeMessage({
      message: 'Succesfully Extracted!',
      status: status,
      duration: 3,
    });
    this.fetchExtractionDetail(data.extraction_id);
   }	
  }
  
  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  redirect = () => { this.setState({ redirect: true })}

  render() {
    const { donorDetail } = this.props.donorDetail
    const { 
      isAlreadyExtracted, 
      isLoading, 
      visible,
      buttonData,
      redirect
    } = this.state;

    const render = buttonData.map(data => {
      return (
        <>
          <a onClick={() => this.redirect()}>{data.Title}</a>
          { redirect ? (<Redirect push to={{ pathname:data.onclick, state: { donorDetail }}}/>) : null }
        </>
      );
    })

    return (
      <div>
        <Row justify="end" style={{marginTop:-50}}> 
          <Popover
            content={render}
            trigger="click"
            visible={visible}
            onVisibleChange={this.handleVisibleChange}
            placement="bottomRight"
          >
            <Button icon={<MoreOutlined />}/>
          </Popover>
        </Row>
        <Tabs defaultActiveKey="1" >
          <TabPane tab="FOR EXTRACTION" key="2">
            <Form
              ref={this.formRef}
              layout="vertical"
              onFinish={this.onSubmitForm} 
            > 
              <Form.Item 
                name="bag_count"
                label="NO. OF BAGS" 
                initialValue={1}
              > 
                <InputNumber style={{ width: 80 }} disabled />
              </Form.Item>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item
                  name="blood_bag_id" 
                  label="BAG ID"
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item 
                  name="extracted_date"
                  label="EXTRACTED DATE"
                >
                  <DatePicker 
                    disabled  
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item 
                  name="expiration_date"
                  label="EXPIRY DATE" 
                >
                  <DatePicker 
                    disabled  
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item 
                  name="extracted_by"
                  label="EXTRACTED BY" 
                >
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item 
                  name="remarks"
                  label="REMARKS" 
                >
                  <TextArea 
                    rows={4} 
                    disabled={isAlreadyExtracted}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="end"> 
              <Button 
                type="primary" 
                shape="round" 
                htmlType="submit"
                style={{ width: 120 }}
                disabled={isAlreadyExtracted}
                loading={isLoading}
              >
                EXTRACT
              </Button>
            </Row>
          </Form> 
          </TabPane>
        </Tabs>
        
      </div>
    )
  }
}


ForExtractionTab.propTypes = {
  donorDetail: PropTypes.shape({
    donor_id: PropTypes.number,
    health_info_id: PropTypes.number.isRequired,
    extraction_id: PropTypes.any
  }).isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

export default ForExtractionTab;
