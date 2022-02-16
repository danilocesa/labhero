import React from 'react';
import PropTypes from 'prop-types';
import { Table as AntTable, Button, Tooltip, Typography } from 'antd';
import { GLOBAL_TABLE_SIZE } from 'global_config/constant-global';
import { CloseOutlined } from '@ant-design/icons';
import { requestTypes } from 'modules/main/settings/lab_exam_request/settings';
import { LR_REQUEST_TYPE } from 'modules/main/lab_request/steps/constants';
import  Expandtable  from 'modules/main/lab_request/steps/select/table/expandtable'

import './table.css';

const { Text } = Typography; 


const renderItem = (text, record) => {
	const type = record.isLocked ? "secondary" : null;
	
	return <Text type={type}>{text}</Text>
}

const createColumns = handleRemove => {
	const reqType = sessionStorage.getItem(LR_REQUEST_TYPE);
 
	const RemoveBtn = (
		<Tooltip title="Remove all">
			<Button type="primary" size="small" onClick={handleRemove}>
				CLEAR
			</Button>
		</Tooltip>
	);

	return [
		{
			title: 'SECTION',
			dataIndex: ['selectedSection', 'sectionName'],
			width: 100,
			sorter: (a, b) => a.selectedSection.sectionName.localeCompare(b.selectedSection.sectionName),
			render: renderItem
		},	
		{
			title: 'EXAM',
			dataIndex: 'examName',
			width: 150,
			sorter: (a, b) => a.examName.localeCompare(b.examName),
			render: renderItem
		},
		{
			title: 'SPECIMEN',
			dataIndex: ['selectedSpecimen', 'specimenName'],
			width: 100,
			sorter: (a, b) => a.selectedSpecimen.specimenName.localeCompare(b.selectedSpecimen.specimenName),
			render: renderItem
		},
		{
			title: 'PANEL',
			dataIndex: ['selectedPanel', 'panelName'],
			width: 100,
			sorter: (a, b) => {
				const aPanelName = a.selectedPanel ? a.selectedPanel.panelName : '';
				const bPanelName = b.selectedPanel ? b.selectedPanel.panelName : '';
					
				return aPanelName.localeCompare(bPanelName);
			},
			render: renderItem
		},
		{
			title: (reqType === requestTypes.edit) ? null : RemoveBtn,
			dataIndex: 'action',
			width: 100,
			align: 'center'
		},
	];
};

// DAM - 2022-02-10 - Added 2 Function.
// newCreateColumns - New Version of Columns for the Table
// groupBy - To Format Data. Group Data by Section-Specimen.
// examIsProcessed - To check if Exams are already extracted. For the Section-Specimen Delete.
const newCreateColumns = (handleRemove, selectedExams) => {
	console.log('selectedExams', selectedExams)

	const reqType = sessionStorage.getItem(LR_REQUEST_TYPE);
	const showClear = (reqType === requestTypes.edit && examIsProcessed(selectedExams));

	console.log('showClear',showClear);
	
	const RemoveBtn = (
		<Tooltip title="Remove all">
			<Button type="primary" size="small" onClick={handleRemove}>
				CLEAR
			</Button>
		</Tooltip>
	);

	return [
		{
			title: 'SECTION',
			dataIndex: ['selectedSection', 'sectionName'],
			width: 100,
			sorter: (a, b) => a.selectedSection.sectionName.localeCompare(b.selectedSection.sectionName),
			render: renderItem
		},	
		{
			title: 'SPECIMEN',
			dataIndex: ['selectedSpecimen', 'specimenName'],
			width: 100,
			sorter: (a, b) => a.selectedSpecimen.specimenName.localeCompare(b.selectedSpecimen.specimenName),
			render: renderItem
		},
		{
			title: (showClear) ? RemoveBtn : null,
			dataIndex: 'action',
			width: 100,
			align: 'center'
		},
	];
};

const groupBy = selectedExams => {
	return selectedExams.reduce(function(newValue, currValue) {
		
		const { selectedSection, selectedSpecimen } = currValue;

		const mainObj = {
			selectedSection,
			selectedSpecimen,
			exams: [currValue]
		};
			
		let idx = newValue.findIndex(o => {
			return o["selectedSection"].sectionID === currValue["selectedSection"].sectionID 
				&& o["selectedSpecimen"].specimenID === currValue["selectedSpecimen"].specimenID
		});
			

		if(idx>=0){
			newValue[idx]["exams"].push(currValue)
		}
		else{
			newValue.push(mainObj);
		}
			
		return newValue;
	}, []);
};

const examIsProcessed = exams => {
	return !exams.some(exam => {
		return !exam.sampleSpecimenID && !exam.isLocked
	});
}

class SelectTable extends React.Component {

	shouldComponentUpdate(nextProps) {
		return this.props.selectedExams !== nextProps.selectedExams;
  }
	
	componentDidUpdate() {
		const { populatePanels } = this.props;

		populatePanels();
	}

	render() {
		const { selectedExams, removeSelectedExamByExam, removeSelectedSpecimen, removeAllExams  } = this.props; 

		// DAM - 2022-02-10 - Removed Old Constants. New Constants to be used for the New Table.
		const groupedData = groupBy(selectedExams);
		const newCreateTableCols = newCreateColumns(removeAllExams, selectedExams);
		const NewTableData = groupedData.map((selectedData, index) => ({ 
			key: index++,
			...selectedData,
			action: ( !examIsProcessed(selectedData.exams) )
				?  
					<>
					 	{ 
							<Button 
								type="dashed" 
								icon={<CloseOutlined />}
								size="small" 
								onClick={() => removeSelectedSpecimen({
									sectionID: selectedData["selectedSection"].sectionID, 
									specimenID: selectedData["selectedSpecimen"].specimenID}
									)}
							/>
						}
					</>
				:	
					null
		}));

		// DAM - 2022-02-10 - Removed Old Table. Added New Table for Expanded Row
		return (
			<div className="select-step-table">

				<AntTable
					expandable={{
						expandedRowRender: record => <Expandtable 
							record={record}
							removeSelectedExamByExam={removeSelectedExamByExam}
							/>
					  }}
					size={GLOBAL_TABLE_SIZE}
					columns= { newCreateTableCols }
					pagination={false}
					dataSource={  NewTableData }
					scroll={{ y: 285 }}
				/>
			</div>
		);
	}
}

SelectTable.propTypes = {																																																					 
	selectedExams: PropTypes.arrayOf(PropTypes.shape({
		examID: PropTypes.number.isRequired,
		examName: PropTypes.string.isRequired,
		selectedSection: PropTypes.shape({
			sectionID: PropTypes.number.isRequired,
			sectionName: PropTypes.string.isRequired,
		}).isRequired,
		selectedSpecimen: PropTypes.shape({
			specimenID: PropTypes.number.isRequired,
			specimenName: PropTypes.string.isRequired
		}).isRequired,
		selectedPanel: PropTypes.shape({
			panelID: PropTypes.number,
			panelName: PropTypes.string,
			panelCode: PropTypes.string
		})
	})).isRequired,
	removeSelectedExamByPanel: PropTypes.func.isRequired,
	removeSelectedExamByExam: PropTypes.func.isRequired,
	removeSelectedSpecimen: PropTypes.func.isRequired,
	removeAllExams: PropTypes.func.isRequired,
	populatePanels: PropTypes.func.isRequired,
	sampleData:PropTypes.array
};

export default SelectTable;
