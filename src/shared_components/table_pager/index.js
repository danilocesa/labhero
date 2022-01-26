import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Select } from 'antd';
import { GLOBAL_TABLE_PAGE_SIZE } from 'global_config/constant-global';

const { Text } = Typography;
const { Option } = Select;

class TablePager extends React.Component {

	onChange = async (value) => {
		const { handleChange } = this.props;
		handleChange(value)	 
	}

	render() {

		return (
			<>
				<Text>Display per page</Text>
				<Select 
					size="small" 
					defaultValue={GLOBAL_TABLE_PAGE_SIZE}
					style={{ marginLeft: 10 }}
					onChange={this.onChange}
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
	handleChange: PropTypes.func,
};

export default TablePager;