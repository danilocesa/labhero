import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import Pager from 'shared_components/search_pager';
import MainTable from './main_table';

import './searchresult.css';

class SearchResults extends React.Component {
  state = {
		pageSize: 10,
		isLoading: false
	};

  componentDidMount() {
    this.setState({ showLoading: false });
  } 
  
	onChangePageSize = (pageSize) => {
		this.setState({ pageSize });
	}

  render() {  
		const { isLoading, pageSize } = this.state;
		const { labResults, onClickTableRow } = this.props;
   
    return (
	    <div>
				<Row>
					<Col lg={24} xs={24}>
						<Pager 
							handleChangeSize={this.onChangePageSize}
							pageTotal={labResults.length}
							pageSize={pageSize}
						/>
					</Col>
				</Row>
		    <Row>
					<MainTable 
						isLoading={isLoading}
						labResults={labResults}
						pageSize={pageSize}
						onClickTableRow={onClickTableRow}
					/>
		    </Row>
	    </div>
    );
  }
}

SearchResults.propTypes = {
	labResults: PropTypes.array.isRequired,
	onClickTableRow: PropTypes.func.isRequired
};

export default SearchResults;
