import React from 'react';
import { Card, Button } from 'antd';

import './section-content.css';

const Data = [
  'CBC',
  'Prothrombin Time',
  'Potassium',
  'Exam One',
  'Expanded Aptt',
  'BUN',
  'Exam Two',
  'Exam Three',
  'Exam Four',
  'Exam Five',
  'CBC',
  'Prothrombin Time',
  'Potassium',
  'Exam One',
  'Expanded Aptt',
  'BUN',
  'Exam Two',
  'Exam Three',
  'Exam Four',
  'Exam Five',
  'CBC',
  'Prothrombin Time',
  'Potassium',
  'Exam One',
  'Expanded Aptt',
  'BUN',
  'Exam Two',
  'Exam Three',
  'Exam Four',
  'Exam Five',
  'CBC',
  'Prothrombin Time',
  'Potassium',
  'Exam One',
  'Expanded Aptt',
  'BUN',
  'Exam Two',
  'Exam Three',
  'Exam Four',
  'Exam Five',
  'CBC',
  'Prothrombin Time',
  'Potassium',
  'Exam One',
  'Expanded Aptt',
  'BUN',
  'Exam Two',
  'Exam Three',
  'Exam Four',
  'Exam Five',
  'CBC',
  'Prothrombin Time',
  'Potassium',
  'Exam One',
  'Expanded Aptt',
  'BUN',
  'Exam Two',
  'Exam Three',
  'Exam Four',
  'Exam Five',
];

class SectionContent extends React.Component {
  render() {
    const ButtonList = Data.map((item) => <Button>{item}</Button>);

    return (
      <Card className="test-list">
        {ButtonList}
      </Card>
    );
  }
}

export default SectionContent;