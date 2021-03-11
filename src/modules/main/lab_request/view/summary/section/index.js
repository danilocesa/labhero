import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Typography } from 'antd';

import './section.css';

const { Text } = Typography;

const leftSectionLayout = {
	sm: { span: 24 },
	lg: { span: 4 },
};

const rightSectionLayout = {
	sm: { span: 24 },
	lg: { span: 20 },
};

function SummarySection(props) {
  const {
    givenName,
    nameSuffix,
    lastName,
    middleName,
    dateOfBirth,
    sex
  } = props.personalInfo;
  
  const {
    bed,
    chargeSlip,
    comment,
    locationName,
    patientAge,
    physicianName,
    visit
  } = props.otherInfo;

  return (
    <div className="request-summary">
      <Row>
        <Col sm={{ span: 24 }} lg={{ span: 18, offset: 3 }}>
          <Row style={{ marginTop: 30 }}>
            <Col {...leftSectionLayout}>
              <Text strong>PATIENT NAME</Text>
            </Col>
            <Col {...rightSectionLayout}>
              <Text>{`${givenName} ${middleName} ${lastName} ${nameSuffix || ''}`}</Text>
            </Col>
          </Row>
          <Row>
            <Col {...leftSectionLayout}>
              <Text strong>DATE OF BIRTH</Text>
            </Col>
            <Col {...rightSectionLayout}>
              <Text>{`${dateOfBirth} - ${patientAge} YEARS OLD`}</Text>
            </Col>
          </Row>
          <Row>
            <Col {...leftSectionLayout}>
              <Text strong>GENDER</Text>
            </Col>
            <Col {...rightSectionLayout}>
              <Text>{sex.toString().toUpperCase()}</Text>
            </Col>
          </Row>
          <Row>
            <Col {...leftSectionLayout}>
              <Text strong>LOCATION</Text>
            </Col>
            <Col {...rightSectionLayout}>
              <Text>{locationName.toString().toUpperCase()}</Text>
            </Col>
          </Row>
          <Row>
            <Col {...leftSectionLayout}>
              <Text strong>PHYSICIAN</Text>
            </Col>
            <Col {...rightSectionLayout}>
              <Text>{physicianName ? physicianName.toString().toUpperCase() : '----'}</Text>
            </Col>
          </Row>
          <Row>
            <Col {...leftSectionLayout}>
              <Text strong>BED</Text>
            </Col>
            <Col {...rightSectionLayout}>
              <Text>{bed ? bed.toString().toUpperCase() : '----'}</Text>
            </Col>
          </Row>
          <Row>
            <Col {...leftSectionLayout}>
              <Text strong>VISIT</Text>
            </Col>
            <Col {...rightSectionLayout}>
              <Text>{visit ? visit.toString().toUpperCase() : '----'}</Text>
            </Col>
          </Row>
          <Row>
            <Col {...leftSectionLayout}>
              <Text strong>AMOUNT</Text>
            </Col>
            <Col {...rightSectionLayout}>
              <Text>{chargeSlip ? chargeSlip.toString().toUpperCase() : '----'}</Text>
            </Col>
          </Row>
          <Row>
            <Col {...leftSectionLayout}>
              <Text strong>COMMENT</Text>
            </Col>
            <Col {...rightSectionLayout}>
              <Text>{comment ? comment.toString().toUpperCase() : '----'}</Text>
            </Col>	
          </Row>
        </Col>
      </Row>
    </div>
  );
}

SummarySection.propTypes = {
  personalInfo: PropTypes.shape({
    givenName: PropTypes.string,
    nameSuffix: PropTypes.string,
    lastName: PropTypes.string,
    middleName: PropTypes.string,
    dateOfBirth: PropTypes.string,
    sex: PropTypes.string
  }).isRequired,
  otherInfo: PropTypes.shape({
    bed: PropTypes.string,
    chargeSlip: PropTypes.string,
    comment: PropTypes.string,
    locationName: PropTypes.string,
    patientAge: PropTypes.string,
    physicianName: PropTypes.string,
    visit: PropTypes.string
  }).isRequired
};

export default SummarySection;
