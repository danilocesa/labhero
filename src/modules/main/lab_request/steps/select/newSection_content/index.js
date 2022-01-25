import React from 'react';
import { Card, Empty } from 'antd';

import ExamTag from './tag/exam_tag';
import PanelTag from './tag/panel_tag';

function NewSectionContent(props) {
  const { 
    exams, 
    panels, 
    selectedSection, 
    addSelectedExamByExamNew, 
    addSelectedExamByPanelNew 
  } = props
  
  const { sectionCode } = selectedSection;
    const ExamList = (
      exams.map((item) => (
        <ExamTag 
          item={item}
          key={item.examID} 
          examID={item.examID} 
          examName={item.examName} 
          examCode={item.examCode}
          contents={item.contents}
          isSelected={item.isSelected}
          isDisabled={item.isDisabled}
          addSelectedExamByExamNew={addSelectedExamByExamNew}
        />  
      ))
    );

  	const PanelList = (
			panels.map((item) => (
				<PanelTag 
          item={item}
					key={item.panelID} 
					panelID={item.panelID} 
					panelName={item.panelName} 
					panelCode={item.panelCode}
					isSelected={item.isSelected}
          addSelectedExamByPanelNew={addSelectedExamByPanelNew}	
					isDisabled={item.isDisabled}
				/>
			))
		);		

    const EmptyPlaceholder = () => {
			if(ExamList.length > 0 )
				return null;
			return <Empty style={{ marginTop: 40 }} />;
		};

    return( 
      <Card className="exam-list">
				{ExamList}
				{(sectionCode === 'panel' || sectionCode === null) && PanelList}
				<EmptyPlaceholder />
			</Card>
    )
}

export default NewSectionContent;