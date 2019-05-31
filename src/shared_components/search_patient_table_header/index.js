// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Select } from 'antd';

// CSS
import './table_header.css';

// CONSTANTS
const { Text } = Typography;
const { Option } = Select;

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
						<Text>Display per page</Text>
						<Select 
							size="small" 
							defaultValue="10" 
							style={{ marginLeft: 10 }} 
							onChange={handleChangeSize}
						>
							<Option value={5}>5</Option>
							<Option value={10}>10</Option>
							<Option value={15}>15</Option>
							<Option value={20}>20</Option>
						</Select>
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
