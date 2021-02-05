/* eslint-disable func-names */
import React from 'react';
import { 
  Steps, 
  Typography,
  Col,
  Row,
  Form,
  Button,
  Divider,
} from 'antd';
import { SearchOutlined, ContainerOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import PageTitle from 'shared_components/page_title';
import { fetchAdditionalFields }  from 'services/blood_bank/donor_registration';
import { createHealthInformation } from 'services/blood_bank/health_info';
import DynamicFields from './dynamic_fields';


const { Step } = Steps;
const { Title  } = Typography;


class HealthInformation extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      categoryData: {},
      additionalFields: {},
    };
  }
  
  async componentDidMount() {
    await this.getCategoryData();
  }

  onFinish = async (values) => {
    const { additionalFields } = this.state;
    console.log('additionalFields', additionalFields);

    let cust_fld_obj = [];
    const custFieldArray = [];

    Object.keys(additionalFields).forEach(function (key) {
      // eslint-disable-next-line camelcase
      cust_fld_obj = additionalFields[key].cust_fld_format;
    });

    await createHealthInformation()
  }
    
  getCategoryData = async () => {
    const additionalFieldsData = await fetchAdditionalFields();

    if(additionalFieldsData.dynamic_fields.length > 0){
      this.setState({ 
        additionalFields: additionalFieldsData.dynamic_fields,
        haveAdditionalFields: (additionalFieldsData.length > 0)
      });
    }
  };

  
	render() {
    const { additionalFields } = this.state;

		return(
      <div>
        <PageTitle pageTitle="DONOR REGISTRATION"  />
          <Steps 
            size="small" 
            current={2} 
            labelPlacement="vertical"
            style={{ marginTop:20, paddingRight:200, paddingLeft:200}}
          >
            <Step title="Search Donor" icon={<SearchOutlined />}  />
            <Step title="Fill Up" icon={<ContainerOutlined />} />
            <Step title="Health Information" icon={<MedicineBoxOutlined />} />
          </Steps>
          <Row justify="center">
            <Col span={20}>
              <Title level={4} style={{ marginTop:40 }}>HEALTH INFORMATION</Title>
              <Form
                name="basic"
                layout='vertical'
                onFinish={this.onFinish}
              >
                <div style={{ marginTop: 40 }}>
                  <DynamicFields additionalFields={additionalFields} />
                </div>
                <Divider style={{ marginTop: 50 }} />
                <div style={{ textAlign: 'right' }}>
                  <Button 
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

export default HealthInformation;	
 