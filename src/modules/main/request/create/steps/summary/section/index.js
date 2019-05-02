import React from 'react';
import { Row, Col, Typography } from 'antd';

import './section.css';

const { Text } = Typography;

const sectionLayout = {
  sm: { span: 24 },
  lg: { span: 8 }
};

class SummarySection extends React.Component {
  render() {
    return (
      <div className="request-summary">
        <Row>
          <Col sm={{ span: 24 }} lg={{ span: 16, offset: 4 }}>
            <div style={{ textAlign: 'center' }}>
              <Text strong style={{ fontSize: 18 }}>
                REQUEST SUMMARY
              </Text>
            </div>
            <br />
            <Row>
              <Col {...sectionLayout}>
                <div className="section">
                  <Text strong>PATIENT NAME</Text>
                  <br />
                  <Text>Dante A. Gulapa</Text>
                </div>
              </Col>
              <Col {...sectionLayout}>
                <div className="section">
                  <Text strong>DATE OF BIRTH</Text>
                  <br />
                  <Text>05/01/1978 - 41 y/o</Text>
                </div>
              </Col>
              <Col {...sectionLayout}>
                <div className="section">
                  <Text strong>GENDER</Text>
                  <br />
                  <Text>MALE</Text>
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: 15 }}>
              <Col {...sectionLayout}>
                <div className="section">
                  <Text strong>CASE NO.</Text>
                  <br />
                  <Text>123456</Text>
                </div>
              </Col>
              <Col {...sectionLayout}>
                <div className="section">
                  <Text strong>PHYSICIAN ID</Text>
                  <br />
                  <Text>123456789</Text>
                </div>
              </Col>
              <Col {...sectionLayout}>
                <div className="section">
                  <Text strong>WARD</Text>
                  <br />
                  <Text>----</Text>
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: 15 }}>
              <Col {...sectionLayout}>
                <div className="section">
                  <Text strong>CLASS</Text>
                  <br />
                  <Text>----</Text>
                </div>
              </Col>
              <Col lg={{ span: 16 }} sm={{ span: 24 }}>
                <div className="comment-section">
                  <Text strong>COMMENT</Text>
                  <br />
                  <Text>This is a sample comment from a person named John Doe.</Text>
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: 15 }}>
              <Col {...sectionLayout}>
                <div className="section">
                  <Text strong>AMOUNT</Text>
                  <br />
                  <Text>P12,000.00</Text>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SummarySection;