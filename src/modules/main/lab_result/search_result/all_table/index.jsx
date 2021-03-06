import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import Pager from 'shared_components/search_pager';
import { GLOBAL_TABLE_PAGE_SIZE } from 'global_config/constant-global';
import MainTable from './main_table';

import './searchresult.css';

class AllTable extends React.Component {
  state = {
		pageSize: GLOBAL_TABLE_PAGE_SIZE,
		isLoading: false
	};

  componentDidMount() {
    // this.setState({ showLoading: false });
  } 
  
	onChangePageSize = (pageSize) => {
		this.setState({ pageSize });
	}

  render() {  
		const { isLoading, pageSize } = this.state;
		const { labResults, onClickTableRow, onClickPrint} = this.props;
	 
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
					<Col lg={24} xs={24}>
						<MainTable 
							isLoading={isLoading}
							labResults={labResults}
							pageSize={pageSize}
							onClickTableRow={onClickTableRow}
							onClickPrint={onClickPrint}
						/>
					</Col>
		    </Row>
	    </div>
    );
  }
}

AllTable.propTypes = {
	labResults: PropTypes.array.isRequired,
	onClickTableRow: PropTypes.func.isRequired,
	onClickPrint: PropTypes.func.isRequired,
};

export default AllTable;
