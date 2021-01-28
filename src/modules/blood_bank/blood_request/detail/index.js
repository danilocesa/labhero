import React from 'react';
import { Row, Col, Spin, Card, Typography, Divider  } from 'antd';
import PropTypes from 'prop-types';
import { fetchBloodRecipientById } from 'services/blood_bank/blood_recipient';
import { fetchBloodRequestById } from 'services/blood_bank/blood_request';

const { Text } = Typography;


class BloodRequestDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      loading: false,
      recipientDetail: {},
      requestDetails: []
    };
  }

  async componentDidMount() {
    await this.fetchData();
  }

  fetchData = async () => {
    const { recipientID } = this.props;

    this.setState({ loading: true });

    const response = await fetchBloodRecipientById(recipientID);

    const recipientDetail = response[0];

    const { 
      address_line_1, 
      address_line_2, 
      barangay_name, 
      city_name, 
      province_name,
      request_products_id
    } = recipientDetail;
    const location = `${province_name} ${city_name} ${barangay_name} ${address_line_1} ${address_line_2}`;

    const requestDetails = await fetchBloodRequestById(request_products_id);


    this.setState({ 
      recipientDetail: { ...recipientDetail, location },
      requestDetails,
      loading: false
    });
  }



  render(){
    const { recipientDetail, requestDetails, loading } = this.state;

    console.log(requestDetails);

    const ProductList = requestDetails.map(item => (
      <Row key={item.blood_product_id}>
        <Col span={10}>
          {item.blood_product_id}
        </Col>
        <Col span={14}>
          <div style={{ textAlign: 'right' }}>
            {item.quantity}
          </div>
        </Col>
      </Row>
    ));

    return(
      <div>
        <Spin spinning={loading}>
          <Card>
            <Row>
              <Col span={10}>
                <Text >REQUEST ID:</Text>
              </Col>
              <Col span={14}>
                {recipientDetail.request_products_id}
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Text >DATE REQUESTED:</Text>
              </Col>
              <Col span={14}>
                {recipientDetail.requested_date}
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Text >DATE NEEDED:</Text>
              </Col>
              <Col span={14}>
                {recipientDetail.requested_date}
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Text >HOSPITAL:</Text>
              </Col>
              <Col span={14}>
                {recipientDetail.hospital_name}
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Text >PHYSICIAN:</Text>
              </Col>
              <Col span={14}>
                {recipientDetail.physician}
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Text >BLOODGROUP:</Text>
              </Col>
              <Col span={14}>
                {recipientDetail.blood_type_name}
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Text >LASTNAME:</Text>
              </Col>
              <Col span={14}>
                {recipientDetail.last_name}
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Text >FIRSTNAME:</Text>
              </Col>
              <Col span={14}>
                {recipientDetail.first_name}
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Text >MIDDLENAME:</Text>
              </Col>
              <Col span={14}>
                {recipientDetail.middle_name}
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Text >GENDER:</Text>
              </Col>
              <Col span={14}>
                {recipientDetail.gender}
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Text >AGE:</Text>
              </Col>
              <Col span={14}>
                {recipientDetail.age}
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Text >CONTACT DETAILS:</Text>
              </Col>
              <Col span={14}>
                {recipientDetail.contact_details}
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Text >LOCATION:</Text>
              </Col>
              <Col span={14}>
                {recipientDetail.location}
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Text >PURPOSE:</Text>
              </Col>
              <Col span={14}>
                {recipientDetail.purpose}
              </Col>
            </Row>
          </Card>
          <Divider orientation="left">REQUESTED PRODUCTS</Divider>
          <Card style={{ marginTop: 15 }}>
            {ProductList}
          </Card>
        </Spin>
      </div>
    );
  }
}

BloodRequestDetails.propTypes = {
  recipientID: PropTypes.number.isRequired
};

BloodRequestDetails.defaultProps = {
  recipientID: 2
};

export default BloodRequestDetails;