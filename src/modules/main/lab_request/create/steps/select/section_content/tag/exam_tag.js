import React from 'react';
import PropTypes from 'prop-types';
import Tag from './tag';

class ExamTag extends React.Component {
	handleChange = (checked) => {
		const { 
			examName, 
			examID, 
			examCode, 
			addSelectedExamByExam, 
			removeSelectedExamByExam,
			updateExam,
			isDisabled
		} = this.props;

		if(isDisabled) return;

		updateExam({ examID, isSelected: checked });

		if(checked) 
			addSelectedExamByExam({ examID, examName, examCode });
		else 
			removeSelectedExamByExam({ examID });
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
	examCode: PropTypes.string.isRequired,
	isSelected: PropTypes.bool.isRequired,
	isDisabled: PropTypes.bool.isRequired,
	addSelectedExamByExam: PropTypes.func.isRequired,
	removeSelectedExamByExam: PropTypes.func.isRequired,
	updateExam: PropTypes.func.isRequired
};

export default ExamTag;
