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
		const { label, content, disabled, loading, size, placeholder, onChange, value } = this.props;
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
					style={{ width, textTransform: 'uppercase' }} 
					disabled={disabled} 
					placeholder={placeholder}
					loading={loading}
					value={value}
				>
					{Options}
				</Select>
			</>
		);
	}
}

Dropdown.propTypes = {
	label: PropTypes.string,
	value: PropTypes.any,
	content: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.any.isRequired,
		label: PropTypes.string.isRequired
	})),
	disabled: PropTypes.bool,
	loading: PropTypes.bool,
	size: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func.isRequired
};

Dropdown.defaultProps = {
	label: null,
	value: null,
	content: [],
	disabled: false,
	loading: false,
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