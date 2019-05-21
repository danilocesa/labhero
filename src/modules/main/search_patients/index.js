import React from 'react';
import { Typography, Row, Col } from 'antd';

import Search from './search_form';
import SearchTableResults from './search_table_results'

const { Title } = Typography;

class SearchPatient extends React.Component {
  render() {
    return(
	<div>
		<div style={{ textAlign: 'center' }}>
			<Title level={4}>SEARCH PATIENT</Title>
		</div>
		<Row>
			<Col xs={{ span:24 }} sm={{ span:24 }} md={{ span:18, offset:3 }} lg={{ span:18, offset:3 }}>
				<Search />
			</Col>
			<Col span={24}>
				<SearchTableResults />
			</Col>
		</Row>
	</div>
    );
  }
}

export default SearchPatient;