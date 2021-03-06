import React from 'react';
import PropTypes from 'prop-types';
import Tag from './tag';
import { 	LR_REQUEST_TYPE } from 'modules/main/lab_request/steps/constants'; 

class ExamTag extends React.Component {
	
	handleChange = (checked) => {
		const reqType = sessionStorage.getItem(LR_REQUEST_TYPE);
		const { 
			examName, 
			examID, 
			examCode, 
			contents,
			addSelectedExamByExam, 
			removeSelectedExamByExam,
			updateExam,
			isDisabled
		} = this.props;

		if(isDisabled) return;

		updateExam({ examID, isSelected: checked });

		if(checked) 
			addSelectedExamByExam({ examID, examName, examCode, contents });
		else 
			console.log( reqType ===  "create" ? removeSelectedExamByExam({ examID }) : null )
	};

	render() {
		const { examName, examID, isSelected, isDisabled } = this.props;
	
		return (
			<Tag
				tagKey={examID}
				tagLabel={examName}
				isSelected={isSelected}
				isDisabled={isDisabled}
				onChange={this.handleChange}
			/>
		);
	}
}

ExamTag.propTypes = {
	examID: PropTypes.number.isRequired,
	examName: PropTypes.string.isRequired,
	examCode: PropTypes.string,
	contents: PropTypes.arrayOf(PropTypes.string).isRequired,
	isSelected: PropTypes.bool.isRequired,
	isDisabled: PropTypes.bool.isRequired,
	addSelectedExamByExam: PropTypes.func.isRequired,
	removeSelectedExamByExam: PropTypes.func.isRequired,
	updateExam: PropTypes.func.isRequired
};

export default ExamTag;
