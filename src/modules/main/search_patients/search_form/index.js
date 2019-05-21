import React from 'react';
import { Input, Button, Row, Col, Form } from 'antd'


class Search extends React.Component {
  render() {
    return(
	<div className="search-patients-form">
		<Form>
			<Row gutter={12}>
				<Col span={5}>
					<Form.Item label="Patient ID">
						<Input />
					</Form.Item>
				</Col>
				<Col style={{ textAlign:'center', marginTop:'30px' }} span={1}>
					OR
				</Col>
				<Col span={12}>
					<Form.Item label="Patient Name">
						<Input />
					</Form.Item>
				</Col>
				<Col span={6}>
					<Form.Item style={{ marginTop: 22 }}>
						<Row gutter={12}>
							<Col span={12}>
								<Button 
									className="search-btn" 
									shape="round" 
									block
								>
									CLEAR
								</Button>
							</Col>
							<Col span={12}>
								<Button 
									className="search-btn" 
									shape="round" 
									type="primary" 
									block
								>
									SEARCH
								</Button>
							</Col>
						</Row>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	</div>
    );
  }
}

export default Search;