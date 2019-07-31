import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;

const Label = (props) => {
	if(props.text) {
		return (
			<span style={{ marginRight: 20 }}>
				{props.text}
			</span>
		);
	}
		
	return null;
}

class Dropdown extends React.Component {
	render(){
		const { label, content, disabled, size, placeholder, onChange } = this.props;
		const width = size === 'small' ? 200 : 300;
		const Options = content.map(section => (
			<Option value={section.value} key={section.value}>
				{section.label}
			</Option>
		));

		return (
			<>
				<Label text={label} />
				<Select 
					onChange={onChange}
					style={{ width }} 
					disabled={disabled} 
					placeholder={placeholder}
				>
					{Options}
				</Select>
			</>
		);
	}
}

Dropdown.propTypes = {
	label: PropTypes.string,
	content: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.any.isRequired,
		label: PropTypes.string.isRequired
	})),
	disabled: PropTypes.bool,
	size: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func.isRequired
};

Dropdown.defaultProps = {
	label: null,
	content: [],
	disabled: false,
	size: 'default',
	placeholder: ''
}

Label.propTypes = {
	text: PropTypes.string
};

Label.defaultProps = {
	text: null
};

export default Dropdown;