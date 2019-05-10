// LIBRARY
import React from 'react';
import { Button, Row, Col} from 'antd';

import './machinesBtn.css'

class MachinesInstalled extends React.Component {
	render() {
		return (
			<Row style={{ paddingBottom: '1em' }} gutter={24}>
				<Col className="gutter-row" span={12}>
					<Button className="gutter-box" type="primary">DXH01(-00026)</Button>
					<Button className="gutter-box">Machine #2</Button>
				</Col>
			</Row>
		);
	}
}

export default MachinesInstalled;