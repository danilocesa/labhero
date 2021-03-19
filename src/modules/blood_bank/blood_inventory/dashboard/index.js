import React from 'react';
import { Descriptions, Badge, Statistic, Row, Col, Card, Tabs  } from 'antd';

const { TabPane } = Tabs;

function InventoryDashboard() {
  return (
      <Tabs defaultActiveKey="1">
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> A+</div>} 
          key="1"
        >
          <Descriptions size="small" bordered>
            <Descriptions.Item span={2} label="WB">
              <Row gutter={12}>
                <Col span={12}>
                  <Card size="small">
                    <Statistic
                      title="Available"
                      value={9}
                      precision={0}
                      prefix={<Badge status="processing" />}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small">
                    <Statistic
                      title="Near Expiry"
                      value={15}
                      precision={0}
                      prefix={<Badge status="warning"  />}
                    />
                  </Card>
                </Col>
              </Row>
            </Descriptions.Item>
            <Descriptions.Item span={2} label="WBC">
              <Row gutter={12}>
                <Col span={12}>
                  <Card size="small">
                    <Statistic
                      title="Available"
                      value={20}
                      precision={0}
                      prefix={<Badge status="processing" />}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small">
                    <Statistic
                      title="Near Expiry"
                      value={3}
                      precision={0}
                      prefix={<Badge status="warning"  />}
                    />
                  </Card>
                </Col>
              </Row>
            </Descriptions.Item>
            <Descriptions.Item span={2} label="RBC">
              <Row gutter={12}>
                <Col span={12}>
                  <Card size="small">
                    <Statistic
                      title="Available"
                      value={4}
                      precision={0}
                      prefix={<Badge status="processing" />}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small">
                    <Statistic
                      title="Near Expiry"
                      value={15}
                      precision={0}
                      prefix={<Badge status="warning"  />}
                    />
                  </Card>
                </Col>
              </Row>
            </Descriptions.Item>
            <Descriptions.Item span={2} label="PLASMA">
              <Row gutter={12}>
                <Col span={12}>
                  <Card size="small">
                    <Statistic
                      title="Available"
                      value={55}
                      precision={0}
                      prefix={<Badge status="processing" />}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small">
                    <Statistic
                      title="Near Expiry"
                      value={105}
                      precision={0}
                      prefix={<Badge status="warning"  />}
                    />
                  </Card>
                </Col>
              </Row>
            </Descriptions.Item>
            <Descriptions.Item span={2} label="PLATELET">
              <Row gutter={12}>
                <Col span={12}>
                  <Card size="small">
                    <Statistic
                      title="Available"
                      value={5}
                      precision={0}
                      prefix={<Badge status="processing" />}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small">
                    <Statistic
                      title="Near Expiry"
                      value={4}
                      precision={0}
                      prefix={<Badge status="warning"  />}
                    />
                  </Card>
                </Col>
              </Row>
            </Descriptions.Item>
            <Descriptions.Item span={2} label="TOTAL">
              <Row gutter={12}>
                <Col offset={1} span={10}>
                  <Statistic
                    title="Available"
                    value={149}
                    precision={0}
                  />
                </Col>
                <Col offset={1} span={10}>
                  <Statistic
                    title="Near Expiry"
                    value={75}
                    precision={0}
                  />
                </Col>
              </Row>
            </Descriptions.Item>
          </Descriptions>
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> A-</div>} 
          key="2"
        >
          Content of Tab Pane 2
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> B+</div>} 
          key="3"
        >
          Content of Tab Pane 3
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> B-</div>} 
          key="3"
        >
          Content of Tab Pane 3
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> AB+</div>} 
          key="3"
        >
          Content of Tab Pane 3
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> AB-</div>} 
          key="3"
        >
          Content of Tab Pane 3
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> O+</div>} 
          key="3"
        >
          Content of Tab Pane 3
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> O-</div>} 
          key="3"
        >
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
  );
}

export default InventoryDashboard;