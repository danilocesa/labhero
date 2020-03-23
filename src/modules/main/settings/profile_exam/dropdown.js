import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;

const dropdownStyle = {
	width: 220,
	marginLeft: 10,
};

class SectionDropdown extends React.Component {
	render(){
		const { sections } = this.props;
		const Options = sections.map(section => (
			<Option value={section.value}>
				{section.label}
			</Option>
		));

		return (
			<div style={{ marginTop: 20 }}>
				SECTION 
				<Select style={dropdownStyle}>
					{Options}
				</Select>
			</div>
		);
	}
}

SectionDropdown.propTypes = {
	sections: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired
	}))
};

SectionDropdown.defaultProps = {
	sections: []
}

export default SectionDropdown;