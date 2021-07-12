import React from 'react';
import PropTypes from 'prop-types';
import { Table as AntTable, Button, Tooltip, Typography, Popconfirm } from 'antd';
import { GLOBAL_TABLE_SIZE } from 'global_config/constant-global';
import { CloseOutlined } from '@ant-design/icons';
import { requestTypes } from 'modules/main/settings/lab_exam_request/settings';
import { LR_REQUEST_TYPE } from 'modules/main/lab_request/steps/constants';

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

class SelectTable extends React.Component {
	shouldComponentUpdate(nextProps) {
		return this.props.selectedExams !== nextProps.selectedExams;
  }
	
	componentDidUpdate() {
		const { populatePanels } = this.props;

		populatePanels();
	}



	render() {
		const { selectedExams, removeSelectedExamByExam, removeAllExams, removeSelectedExamByPanel } = this.props; 
    console.log("🚀 ~ file: index.js ~ line 88 ~ SelectTable ~ render ~ selectedExams", selectedExams)
		const TableCols = createColumns(removeAllExams);
		const TableData = selectedExams.map(selectedExam => ({ 
				key: selectedExam.examID,
				...selectedExam,
				// CONDITION IN BUTTON if to show or not to show
				action: ( !selectedExam.isLocked && !selectedExam.sampleSpecimenID )
				?  
					<>
					 	{ selectedExam.selectedPanel // CONFIRMATION AND NO CONFIRMATION 
						 	? 
								<Popconfirm
									title="Are you sure to delete this Panel?" 
									onConfirm={() => removeSelectedExamByPanel(selectedExam.selectedPanel)}
									okText="Yes"
									cancelText="No"
								>
									<Button 
										type="dashed" 
										icon={<CloseOutlined />}
										size="small" 
									/> 
								</Popconfirm>
							:
								<Button 
									type="dashed" 
									icon={<CloseOutlined />}
									size="small" 
									onClick={() => removeSelectedExamByExam(selectedExam)}
								/> 
						}
					</>
				:	
					null
			}
		));

		return (
			<div className="select-step-table">
				<AntTable
					size={GLOBAL_TABLE_SIZE}
					columns={TableCols}
					pagination={false}
					dataSource={TableData}
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
	removeAllExams: PropTypes.func.isRequired,
	populatePanels: PropTypes.func.isRequired,
	deletefunction: PropTypes.func.isRequired,
};

export default SelectTable;
