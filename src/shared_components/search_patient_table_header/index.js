// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import TablePager from 'shared_components/table_pager';

// CSS
import './table_header.css';

// CONSTANTS
const { Text } = Typography;


class SearchPatientTableHeader extends React.Component {
	render() {
		const { pageSize, pageTotal, handleChangeSize } = this.props;
		
		const items = pageTotal > pageSize ? pageSize : pageTotal;

		return (
			<div className="table-title">
				<div>
					<Text strong>SEARCH RESULTS</Text>
				</div>
				<div>
					<div className="left">
						<Text>{`Showing ${items} items out of ${pageTotal} results`}</Text>
					</div>
					<div className="right">
						<TablePager handleChange={handleChangeSize} />
					</div>
				</div>
			</div>
		);
	}
}

SearchPatientTableHeader.propTypes = {
	handleChangeSize: PropTypes.func.isRequired,
	pageTotal: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired
};

export default SearchPatientTableHeader;
