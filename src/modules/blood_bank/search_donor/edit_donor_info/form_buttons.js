import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Row, Col, Button, Typography } from 'antd';

const { Text } = Typography;

class FormButtons extends React.Component {

	onSubmit = () => {
			return  <Redirect  to="../questionare" />
	 }

	render() {
		return (
			<div
				style={{
					position: 'absolute',
					left: 0,
					width: '100%',
					borderTop: '1px solid #e9e9e9',
					padding: '10px 16px',
					background: '#fff',
					textAlign: 'right',
					marginTop: '5%'
            	}}
			>
				<Button style={{ marginRight: 8 }}>
					Cancel
				</Button>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</div>
		);
	}
}


export default FormButtons;