import React from 'react';
import PropTypes from 'prop-types';
import { Tag as AntTag, Tooltip } from 'antd';

const { CheckableTag } = AntTag;

const TagStyle = {
	style: {
		width: 120,
		textAlign: 'center',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		padding: '5px 10px',
		margin: 5,
		border: '1px solid #d9d9d9',
		cursor: 'pointer'
	},
};

class Tag extends React.Component {
	state = { checked: false };
	
	handleChange = (checked) => {
		const { title, id, addTest, removeTest } = this.props;

		this.setState({ checked });

		if(checked) 
			addTest({id, exam: title});
		else 
			removeTest(id);
	};

	render() {
		const { title, id } = this.props;
		const { checked } = this.state;

		return (
			<Tooltip title={title}>
				<CheckableTag
					{...TagStyle}
					key={id}
					checked={checked}
					onChange={this.handleChange}
				>
					{title}
				</CheckableTag>
			</Tooltip>
		);
	}
}

Tag.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	addTest: PropTypes.func.isRequired,
	removeTest: PropTypes.func.isRequired
};

export default Tag;
