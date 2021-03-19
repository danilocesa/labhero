import React from 'react';
import { Descriptions, Badge, Statistic, Row, Col, Card } from 'antd';

function InventoryDashboard() {
  return (
    <div>
      <Descriptions title="A+" size="small" bordered>
        <Descriptions.Item span={2} label="WB">
          <Row>
            <Col span={12}>
              <Badge status="processing" text="5" />
            </Col>
            <Col span={12}>
              <Badge color="red" text="1" />
            </Col>
          </Row>
        </Descriptions.Item>
        <Descriptions.Item span={2} label="WBC">
          <Row>
            <Col span={12}>
              <Badge status="processing" text="5" />
            </Col>
            <Col span={12}>
              <Badge color="red" text="1" />
            </Col>
          </Row>
        </Descriptions.Item><Descriptions.Item span={2} label="RBC">
          <Row>
            <Col span={12}>
              <Badge status="processing" text="5" />
            </Col>
            <Col span={12}>
              <Badge color="red" text="1" />
            </Col>
          </Row>
        </Descriptions.Item><Descriptions.Item span={2} label="PLASMA">
          <Row>
            <Col span={12}>
              <Badge status="processing" text="5" />
            </Col>
            <Col span={12}>
              <Badge color="red" text="1" />
            </Col>
          </Row>
        </Descriptions.Item><Descriptions.Item span={2} label="PLATELET">
          <Row>
            <Col span={12}>
              <Badge status="processing" text="5" />
            </Col>
            <Col span={12}>
              <Badge color="red" text="1" />
            </Col>
          </Row>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions title="B+" size="small" style={{ marginTop: 20 }} bordered>
        <Descriptions.Item span={3} label="WB">
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
                  value={5}
                  precision={0}
                  // valueStyle={{ color: '#cf1322' }}
                  prefix={<Badge status="warning" />}
                />
              </Card>
            </Col>
          </Row>
        </Descriptions.Item>
        <Descriptions.Item span={3} label="WBC">
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
                  value={5}
                  precision={0}
                  // valueStyle={{ color: '#cf1322' }}
                  prefix={<Badge status="warning" />}
                />
              </Card>
            </Col>
          </Row>
        </Descriptions.Item>
        <Descriptions.Item span={3} label="RBC">
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
                  value={5}
                  precision={0}
                  // valueStyle={{ color: '#cf1322' }}
                  prefix={<Badge status="warning" />}
                />
              </Card>
            </Col>
          </Row>
        </Descriptions.Item>
        <Descriptions.Item span={3} label="PLASMA">
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
                  value={5}
                  precision={0}
                  // valueStyle={{ color: '#cf1322' }}
                  prefix={<Badge status="warning" />}
                />
              </Card>
            </Col>
          </Row>
        </Descriptions.Item>
        <Descriptions.Item span={3} label="PLATELET">
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
                  value={5}
                  precision={0}
                  // valueStyle={{ color: '#cf1322' }}
                  prefix={<Badge status="warning" />}
                />
              </Card>
            </Col>
          </Row>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default InventoryDashboard;