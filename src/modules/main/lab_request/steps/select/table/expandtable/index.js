import React from 'react';
import { Table , Button} from 'antd';
import { CloseOutlined } from '@ant-design/icons';


function Expandtable(props) {

  const { record, removeSelectedExamByExam } = props;
  const exams = record["exams"];

  const NewTableData = exams.map(exam => ({ 
    key: exam.examID,
    ...exam,
    // CONDITION IN BUTTON if to show or not to show
    action: ( !exam.isLocked && !exam.sampleSpecimenID  )
				?  
					<>
					 	{ 
							<Button 
								type="dashed" 
								icon={<CloseOutlined />}
								size="small" 
								onClick={() => removeSelectedExamByExam(exam)}
							/>
						}
					</>
				:	
					null
  }));

  const columns = [
    {
      title: 'Exam Name',
      dataIndex: 'examName',
    },
    {
      title: 'Panel',
      dataIndex: ['selectedPanel', 'panelName'],
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 100,
      align: 'center'
    },
    
  ];

    return( 
      <>
        <Table 
          dataSource ={NewTableData}
          columns={columns}
          pagination={false}  
        />
      </>
    )
}

export default Expandtable;