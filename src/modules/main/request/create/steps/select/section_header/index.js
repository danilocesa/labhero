import React from 'react';
import { Radio } from 'antd';

import './section_header.css';

class SectionHeader extends React.Component {
  render() {
    return (
      <div className="section-group">
        <Radio.Group defaultValue="a" buttonStyle="solid">
          <Radio.Button value="a">PANEL</Radio.Button>
          <Radio.Button value="b">HEMATOLOGY</Radio.Button>
          <Radio.Button value="c">CHEMISTRY</Radio.Button>
          <Radio.Button value="d">IMMUNOLOGY</Radio.Button>
          <Radio.Button value="e">MICROSCOPY</Radio.Button>
        </Radio.Group>
      </div>
    );
  }
}

export default SectionHeader;