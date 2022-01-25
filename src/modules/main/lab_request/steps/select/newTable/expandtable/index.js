import React from 'react';
import { Table , Button} from 'antd';
import { CloseOutlined } from '@ant-design/icons';


function Expandtable(props) {
  // const {record} = props
  // const ExamRecords = []
  // const PanelRecords = []
  // ExamRecords.push(record) 
  // PanelRecords.push(record.examName) 
  
  // const ExamTableData = ExamRecords.map((selectedExam, index) => ({ 
  //   key: index,
  //   ...selectedExam,
  //   action: 
  //     <Button 
  //       type="dashed" 
  //       icon={<CloseOutlined />}
  //       size="small" 
  //     />
  // }));

  const columns = [
    {
      title: 'Exam Name',
      dataIndex: 'examName',
      // render: (value, row) => {
      //   let ExamnamePanel = []
      //   const panel =  row.examname === undefined ? null : row.examname.forEach(element => {
      //     ExamnamePanel.push(element.examName)
      //   });
        
      //   return (ExamnamePanel.length === 0 ? value : ExamnamePanel )
      // }
    },
    {
      title: 'Specimen',
      dataIndex: 'Specimen',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 100,
      align: 'center'
    },
    
  ];

  const dataSource = [
    {
      key:1,
      examName: "SAMPLE EXAM",
      Specimen:"SAMPLE Specimen"
    },
    {
      key:2,
      examName: "SAMPLE EXAM",
      Specimen:"SAMPLE Specimen"
    },
  ]
  

  // const PanelTableData = PanelRecords.map((selectedExam, index) => ({ 
  //   key: index,
  //   examname : [...selectedExam],
  //   action: 
  //     <Button 
  //       type="dashed" 
  //       icon={<CloseOutlined />}
  //       size="small" 
  //     />
  // }));

    return( 
      <>
        <Table 
          dataSource ={dataSource}// dataSource={record.selectedPanel === null ? ExamTableData : PanelTableData}
          columns={columns}
          pagination={false}  
        />
      </>
    )
}

export default Expandtable;