import React from 'react';
import { Button } from 'antd';

import './machinesBtn.css'

class MachinesInstalled extends React.Component {
    render() {
        return(
          <div className="machinesBtn">
            <Button className="mBtn active">DXH01(-00026)</Button>
            <Button className="mBtn">Machine #2</Button>
          </div>
        );
    }
}

export default MachinesInstalled;