import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Select } from 'antd';

const { Text } = Typography;
const { Option } = Select;

class TablePager extends React.Component {
	render() {
		const { handleChange } = this.props;

		return (
			<>
				<Text>Display per page</Text>
				<Select 
					size="small" 
					defaultValue="10" 
					style={{ marginLeft: 10 }}
					onChange={handleChange}
				>
					<Option value={5}>5</Option>
					<Option value={10}>10</Option>
					<Option value={15}>15</Option>
					<Option value={20}>20</Option>
				</Select>
			</>
		);
	}
}

TablePager.propTypes = {
	handleChange: PropTypes.func.isRequired
};

export default TablePager;