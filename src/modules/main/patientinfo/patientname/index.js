import React from 'react';
import { Row, Col } from 'antd';

import 'antd/dist/antd.css';
import { PrintLogo } from '../../../../images';
import { IResultsIcon } from '../../../../images';

class Name extends React.Component {
      render() {
            return(
                  <Row>
                        <Col span = {12}>
                              <div style = {{ marginBottom: '30px' }}>
                                    <h1 style = {{ marginBottom: '0', 
                                                fontWeight: 'bold',
                                                letterSpacing: '1px',
                                                fontSize: '20px',
                                          }}
                                    >
                                    DOE, JOHN
                                    </h1>
                                    <p style = {{ color: '#ccc8c8', 
                                                letterSpacing: '1px',
                                                fontSize: '13px' }}
                                    >
                                    Patient ID 00001
                                    </p>  
                              </div>
                        </Col>
                        <Col span = {12}>
                              <div style = {{ textAlign: 'right', margin: '25px 0 20px 30px', fontSize: '13px' }}>
                                    <Row>
                                          <Col span={6} offset={12}>
                                                <span style = {{ paddingRight: '10px' }}>iResults</span>
                                                <img src = { IResultsIcon } className = "print-logo" alt = "iResults Icon" />
                                          </Col>
                                          <Col span={6}>
                                                <span style = {{ paddingRight: '10px' }}>Print</span>
                                                <img src = { PrintLogo } className = "print-logo" alt = "Print Icon" />
                                          </Col>
                                    </Row>
                              </div>
                        </Col>
                  </Row>
                  
            );
      }
}

export default Name;