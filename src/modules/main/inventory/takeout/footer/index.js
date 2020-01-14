import React from 'react';
import { Row, Button } from 'antd';

class Footer extends React.Component {
	render() {
		return(
			<Row type="flex" justify="end" style={{ marginTop: 10 }}>
				<Button shape="round" style={{ width: 120 }}>TAKEOUT</Button>
			</Row>
		);
	};
}

export default Footer;