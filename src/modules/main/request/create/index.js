import React from 'react';
import { Typography } from 'antd';

import StepPage from './steps';

import './create.css';

const { Title } = Typography;

class CreateRequestPage extends React.Component {
  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <Title level={4}>CREATE REQUEST</Title>
        </div>
        <StepPage />
      </div>
    );
  }
} 

export default CreateRequestPage;