import React from 'react';
import { Card } from 'antd';

import Tag from './tag.js';

import './section_content.css';

const Data = [
  {
    label: 'CBC',
    checked: true,
  },
  {
    label: 'Prothrombin Time',
    checked: true,
  },
  {
    label: 'Potassium',
    checked: true,
  },
  {
    label: 'Exam One',
    checked: false,
  },
  {
    label: 'Expanded Aptt',
    checked: true,
  },
  {
    label: 'BUN',
    checked: true,
  },
  {
    label: 'Exam Two',
    checked: false,
  },
  {
    label: 'Exam Three',
    checked: false,
  },
  {
    label: 'Exam Four',
    checked: false,
  },
  {
    label: 'Exam Five',
    checked: false,
  },
  {
    label: 'Foo',
    checked: false,
  },
  {
    label: 'Bar',
    checked: false,
  },
  {
    label: 'Bazz',
    checked: false,
  },
];

class SectionContent extends React.Component {
  render() {
    const TagList = Data.map((item, index) => (
      <Tag key={index} checked={item.checked} title={item.label}>
        {item.label}
      </Tag>
    ));

    return <Card className="test-list">{TagList}</Card>;
  }
}

export default SectionContent;
