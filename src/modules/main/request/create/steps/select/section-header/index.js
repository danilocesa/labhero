import React from 'react';
import { Button } from 'antd';

import './new-file.css';

class SectionHeader extends React.Component {
  render() {
    return (
      <div className="section-group">
        <Button.Group>
          <Button type="primary">PANEL</Button>
          <Button type="primary">HEMATOLOGY</Button>
          <Button type="primary">CHEMISTRY</Button>
          <Button type="primary">IMMUNOLOGY</Button>
          <Button type="primary">MICROSCOPY</Button>
        </Button.Group>
      </div>
    );
  }
}

export default SectionHeader;