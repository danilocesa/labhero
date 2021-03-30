import React from 'react';
import { Row, Col, Steps } from 'antd';
import { 
  SearchOutlined, 
  ContainerOutlined, 
  MedicineBoxOutlined,
  LockOutlined
} from '@ant-design/icons';


function DonorRegSteps({ activeIndex }) {
  return (
    <Row justify="center" style={{ marginTop: 10 }}>
      <Col span={14}>
        <Steps size="small" current={activeIndex - 1} labelPlacement="vertical">
          <Steps.Step title="Search Donor" icon={<SearchOutlined />}  />
          <Steps.Step title="Fill Up" icon={<ContainerOutlined />} />
          <Steps.Step title="Fingerprint Registration" icon={<LockOutlined />} />
          <Steps.Step title="Health Information" icon={<MedicineBoxOutlined />} />
        </Steps>
      </Col>
    </Row>
  )
}

export default DonorRegSteps;