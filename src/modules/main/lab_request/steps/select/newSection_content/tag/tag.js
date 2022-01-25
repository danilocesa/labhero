import React from 'react';
import PropTypes from 'prop-types';
import { Tag as AntTag, Tooltip } from 'antd';

// import './tag.css';

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
	render() {
		const { tagKey, tagLabel, isSelected, isDisabled, onChange } = this.props;
		const disabledClassName = isDisabled ? 'clr-step3-tag-disabled' : '';

		return (
			<Tooltip title={tagLabel}>
				<CheckableTag
					{...TagStyle}
					key={tagKey}
					checked={isSelected}
					onChange={onChange}
					className={disabledClassName}
				>
					{tagLabel}
				</CheckableTag>
			</Tooltip>
		);
	}
}

Tag.propTypes = {
	tagKey: PropTypes.number.isRequired,
	tagLabel: PropTypes.string.isRequired,
	isSelected: PropTypes.bool.isRequired,
	isDisabled: PropTypes.bool.isRequired,
	// onChange: PropTypes.func.isRequired
};

export default Tag;
