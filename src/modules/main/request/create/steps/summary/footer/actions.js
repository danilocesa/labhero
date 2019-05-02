import React from 'react';
import { Button } from 'antd';

const ButtonGroup = Button.Group;

class SummaryActions extends React.Component {
  render() {
    return(
      <div>
        <ButtonGroup>
          <Button>Approve and Print</Button>
          <Button>Print Preview</Button>
          <Button>Print Label</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default SummaryActions;