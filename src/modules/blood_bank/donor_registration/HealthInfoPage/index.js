/* eslint-disable func-names */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { 
  Typography,
  Col,
  Row,
  Form,
  Button,
  Divider,
  message
} from 'antd';
import PageTitle from 'shared_components/page_title';
import Message from 'shared_components/message';
import { fetchAdditionalFields }  from 'services/blood_bank/donor_registration';
import { fetchHealthInfoById, createHealthInformation, updateHealthInformation } from 'services/blood_bank/health_info';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import DynamicFields from './dynamic_fields';
import DonorRegSteps from '../DonorRegSteps';

const { Title  } = Typography;


class HealthInformation extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      categoryData: {},
      loading: false,
      fields: null,
    };

    this.formRef = React.createRef();
    this.bloodTypeRef = React.createRef();
  }
  
  async componentDidMount() {
    const { health_info_id } = this.props.location.state;
    await this.getCategoryData();

    if(health_info_id)
      await this.fetchHealthInfo(health_info_id);
  }

  onFinish = async (formFields) => {
    const { donor_id } = this.props.location.state;
    const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));

    const custom_fields = Object.keys(formFields).map((val, index) => {
      console.log(formFields[val],"val")
      const id = index+1
      return {
        field_id:id,
        field_name: val,
        field_value: formFields[val]
      };
    })

    
    // const custom_fields = Object.keys(formFields).map(key => ({
    //   // field_id:,
    //   field_name: key,
    //   field_value: formFields[key]
    // }));  

    const payload = {
      donor: donor_id,
      is_extracted: false,
      is_screened: false,
      custom_fields: custom_fields
    };

    console.log(payload,"payload")

    this.setState({ loading: true });
 
    await this.createHealthInfo({ ...payload, created_by: loggedinUser.userID  });
    
    this.setState({ loading: false });
  }
    
  updateHealthInfo = async (payload) => {
    const result = await updateHealthInformation(payload);

    if(result.status === 201)
      Message.success({ message: 'Health information succesfully updated!' });
    else
      Message.error();
  }


  createHealthInfo = async (payload) => {
    const { history } = this.props;
    const result = await createHealthInformation(payload);
    const Messages = Object.values(result.data.messages).map(value =>{
      return message.error(value === Array(0) ? null : value)
    })
    
    if(result.status === 201){

      Message.success({ 
        message: 'Health information succesfully submitted!',
        // onClose: () => history.push('/bloodbank/donor_registration/step/1')
      });
    }
    else
      Message.error();
  }

  getCategoryData = async () => {
    const additionalFieldsData = await fetchAdditionalFields();

    if(additionalFieldsData.dynamic_fields.length > 0){
      this.setState({ 
        fields: additionalFieldsData.dynamic_fields
      });
    }
  };


  fetchHealthInfo = async (id) => {
    const healthInfo = await fetchHealthInfoById(id);
    const { setFieldsValue } = this.formRef.current;

    if(healthInfo.custom_fields) {
      const fieldValue = {};

      healthInfo.custom_fields.forEach(element => {
        fieldValue[element.field_name] = element.field_value;
      });

      setFieldsValue({ blood_type: fieldValue.blood_type });
    }
  }
  
	render() {
    const { fields, loading } = this.state;
    const { health_info_id } = this.props.location.state;

		return(
      <div>
        <PageTitle pageTitle="DONOR REGISTRATION"  />
        <DonorRegSteps activeIndex={4} />
        <Row justify="center">
          <Col span={20}>
            <Title level={4} style={{ marginTop:40 }}>HEALTH INFORMATION</Title>
            <Form
              name="basic"
              layout="vertical"
              onFinish={this.onFinish}
              ref={this.formRef}
            >
              <div style={{ marginTop: 40 }}>
                <DynamicFields fields={fields} isUpdate={health_info_id !== undefined} />
              </div>
              <Divider style={{ marginTop: 50 }} />
              <div style={{ textAlign: 'right' }}>
                <Button 
                  loading={loading}
                  type="primary" 
                  htmlType="submit" 
                  shape="round"
                  style={{ width: 120 }}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
		)
	}	
}

export default withRouter(HealthInformation);	
 