import { Table, Typography } from 'antd';
import React from 'react';
import Expandtable from './expandtable'

const { Text } = Typography; 

function NewTable(props) {
  const { selectedExams } = props
  let Data = []

  const TableData = selectedExams.map((selectedExam, index) => ({ 
    key: index,
    ...selectedExam
  }));

  selectedExams.forEach(element => {
    const PanelSection = element.selectedSection
    const ExamSection = element.selectedSection.sectionName
    if (PanelSection === element.selectedSection.sectionName){
      console.log("true")
    } else {
      console.log("false")
    }
  });
  

  const columns = [
    {
      title: 'Section',
      dataIndex: ['selectedSection', 'sectionName'],
      render: (text, record) => {
        const type = record.isLocked ? "secondary" : null;
        
        return <Text type={type}>{text === undefined ? record.selectedSection :text }</Text>
      }
    },
    {
      title: 'Specimen',
      dataIndex: ['selectedSpecimen', 'specimenName'],
      render: (text, record) => {
        const type = record.isLocked ? "secondary" : null;
        
        return <Text type={type}>{text === undefined ? record.selectedSpecimen :text }</Text>
      }
    },
  ];

  return( 
    <>
      <Table 
        dataSource={TableData} 
        columns={columns}  
        expandable={{
          expandedRowRender: record => <Expandtable record={record}/>
        }}  
      />
    </>
  )
}

export default NewTable;