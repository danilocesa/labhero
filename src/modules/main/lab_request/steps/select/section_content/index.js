import React from 'react';
import PropTypes from 'prop-types';
import { Card, Empty } from 'antd';

import ExamTag from './tag/exam_tag';
import PanelTag from './tag/panel_tag';

import './section_content.css';

class SectionContent extends React.Component {
	render() {
		const { 
			exams, 
			panels, 
			selectedSection,
			addSelectedExamByExam, 
			addSelectedExamByPanel,
			removeSelectedExamByExam, 
			removeSelectedExamByPanel,
			updateExam,
			updatePanel
		} = this.props;

		const { sectionCode } = selectedSection;
		
		const ExamList = (
			exams.map((item) => (
				<ExamTag 
					key={item.examID} 
					examID={item.examID} 
					examName={item.examName} 
					examCode={item.examCode}
					contents={item.contents}
					isSelected={item.isSelected}
					isDisabled={item.isDisabled}
					addSelectedExamByExam={addSelectedExamByExam}
					removeSelectedExamByExam={removeSelectedExamByExam} 
					updateExam={updateExam}
				/>
			))
		);

		const PanelList = (
			panels.map((item) => (
				<PanelTag 
					key={item.panelID} 
					panelID={item.panelID} 
					panelName={item.panelName} 
					panelCode={item.panelCode}
					isSelected={item.isSelected}
					isDisabled={item.isDisabled}
					addSelectedExamByPanel={addSelectedExamByPanel}
					removeSelectedExamByPanel={removeSelectedExamByPanel}
					updatePanel={updatePanel}
				/>
			))
		);		

		const EmptyPlaceholder = () => {
			if(ExamList.length > 0 || PanelList.length > 0)
				return null;

			return <Empty style={{ marginTop: 40 }} />;
		};

		return ( 
			<Card className="exam-list">
				{ExamList}
				{(sectionCode === 'panel' || sectionCode === null) && PanelList}
				<EmptyPlaceholder />
			</Card>
		);
	}
}

SectionContent.propTypes = {
	addSelectedExamByExam: PropTypes.func.isRequired,
	addSelectedExamByPanel: PropTypes.func.isRequired,
	removeSelectedExamByExam: PropTypes.func.isRequired,
	removeSelectedExamByPanel: PropTypes.func.isRequired,
	updateExam: PropTypes.func.isRequired,
	updatePanel: PropTypes.func.isRequired,
	exams: PropTypes.arrayOf(PropTypes.shape({
		examID: PropTypes.number.isRequired,
		examName: PropTypes.string.isRequired,
		isSelected: PropTypes.bool.isRequired,
		isDisabled: PropTypes.bool.isRequired
	})),
	panels: PropTypes.arrayOf(PropTypes.shape({
		panelID: PropTypes.number.isRequired,
		panelName: PropTypes.string.isRequired,
		panelCode: PropTypes.string.isRequired,
		isSelected: PropTypes.bool.isRequired
	})),
	selectedSection: PropTypes.shape({
		sectionID: PropTypes.number,
		sectionName: PropTypes.string,
		sectionCode: PropTypes.string
	}).isRequired
}

SectionContent.defaultProps = {
	exams: [],
	panels: []
}

export default SectionContent;
