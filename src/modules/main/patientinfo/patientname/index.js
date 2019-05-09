import React from 'react';
// import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'antd';

import { PrintLogo , IResultsIcon } from '../../../../images';

import './patientname.css';
// import 'antd/dist/antd.css';

const ButtonGroup = Button.Group;

class Name extends React.Component {
  render() {
    return (
      <Row>
        <Col span={12}>
          <div style={{ marginBottom: '30px' }}>
            <h1
              style={{
                marginBottom: '0',
                fontWeight: 'bold',
                letterSpacing: '1px',
                fontSize: '20px',
              }}
            >
              DOE, JOHN
            </h1>
            <p style={{ color: '#ccc8c8', letterSpacing: '1px', fontSize: '13px' }}>
              Patient ID 00001
            </p>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ textAlign: 'right', margin: '25px 0 20px 30px', fontSize: '12px' }}>
            <Row>
              <ButtonGroup>
                <Button>
                  <img src={IResultsIcon} className="print-logo" alt="iResults Icon" />
                  <span style={{ paddingLeft: '7px' }}>iResults</span>
                </Button>
                <Button>
                  <img src={PrintLogo} className="print-logo" alt="Print Icon" />
                  <span style={{ paddingLeft: '7px' }}>Print</span>
                </Button>
              </ButtonGroup>
            </Row>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Name;
