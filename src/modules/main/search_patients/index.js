import React from 'react';
import { Typography, Row, Col } from 'antd';

import PropTypes from 'prop-types';
import Search from './search_form';
import SearchTableResults from './search_table_results'

const { Title } = Typography;

class SearchPatient extends React.Component {
	constructor(props) {
    super(props);
    this.state = { visible: false }
    this.onClickShowDrawer = this.onClickShowDrawer.bind(this);
  }

  onClickShowDrawer = () => {
    this.setState({
      visible: true,
    });
    console.log("hi");
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
    console.log(this.state.visible);
  };

	
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
				<SearchTableResults visible={this.state.visible} onClose={this.onClose} onRow={this.onClickShowDrawer} />
			</Col>
		</Row>
	</div>
    );
  }
}


SearchTableResults.propTypes={
  state: PropTypes.bool.isRequired
};

SearchTableResults.defaultProps={
  state: false
}


export default SearchPatient;