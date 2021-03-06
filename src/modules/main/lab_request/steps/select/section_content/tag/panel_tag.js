import React from 'react';
import PropTypes from 'prop-types';
import Tag from './tag';
import { 	LR_REQUEST_TYPE } from 'modules/main/lab_request/steps/constants'; 
class PanelTag extends React.Component {
	handleChange = (isChecked) => {
		const { 
			panelID, 
			isDisabled,
			addSelectedExamByPanel, 
			removeSelectedExamByPanel, 
			// updatePanel 
		} = this.props;

		if(isDisabled) return;

		// updatePanel({ panelID, isSelected: isChecked });

		if(isChecked)
			addSelectedExamByPanel({ panelID });
		else
      removeSelectedExamByPanel({ panelID })
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
	removeSelectedExamByPanel: PropTypes.func.isRequired,
	// updatePanel: PropTypes.func.isRequired,
};

export default PanelTag;
