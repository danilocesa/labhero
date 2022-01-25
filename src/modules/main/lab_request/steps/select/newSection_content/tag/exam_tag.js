import React from 'react';
import PropTypes from 'prop-types';
import Tag from './tag';

class ExamTag extends React.Component {
	
	handleChange = (checked) => {
		const { 
			examName, 
			examID, 
			examCode, 
			contents,
			addSelectedExamByExamNew, 
			// removeSelectedExamByExam,
			// updateExam,
			// isDisabled
		} = this.props;

		// if(isDisabled) return;

		// updateExam({ examID, isSelected: checked });

		if(checked) 
    addSelectedExamByExamNew({ examID, examName, examCode, contents });
		else 
    console.log("HARRY ELSE")
			// console.log( reqType ===  "create" ? removeSelectedExamByExam({ examID }) : null )
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
	// isSelected: PropTypes.bool.isRequired,
	// isDisabled: PropTypes.bool.isRequired,
	addSelectedExamByExamNew: PropTypes.func.isRequired,
};

export default ExamTag;
