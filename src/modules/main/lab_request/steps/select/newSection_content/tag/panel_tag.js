import React from 'react';
import PropTypes from 'prop-types';
import Tag from './tag';
class PanelTag extends React.Component {
	handleChange = (isChecked) => {
		const { 
			panelID, 
			isDisabled,
			addSelectedExamByPanelNew
			// updatePanel 
		} = this.props;

		if(isDisabled) return;

		// // updatePanel({ panelID, isSelected: isChecked });

		if(isChecked)
		addSelectedExamByPanelNew({ panelID });
		else
		console.log("else")
      // removeSelectedExamByPanel({ panelID })

	};

	render() {
		const { panelID, panelName, isSelected, isDisabled } = this.props;

		return (
			<Tag 
				tagKey={panelID}
				tagLabel={panelName}
				isSelected={isSelected}
				isDisabled={isDisabled}
				onChange={this.handleChange}
			/>
		);
	}
}

PanelTag.propTypes = {
	panelID: PropTypes.number.isRequired,
	panelName: PropTypes.string.isRequired,
	// panelCode: PropTypes.string.isRequired,
	isSelected: PropTypes.bool.isRequired,
	isDisabled: PropTypes.bool.isRequired,
	addSelectedExamByPanel: PropTypes.func.isRequired,
	// updatePanel: PropTypes.func.isRequired,
};

export default PanelTag;
