import React from 'react';
import PropTypes from 'prop-types';
import { Table as AntTable, Button, Tooltip } from 'antd';

import './table.css';

const createColumns = handleRemove => {
	const RemoveBtn = (
		<Tooltip title="Remove all">
			{/* <Button type="primary" size="small" icon="delete" onClick={handleRemove} /> */}
			<Button type="primary" size="small" onClick={handleRemove}>
				CLEAR
			</Button>
		</Tooltip>
	);

	return [
		{
			title: 'SECTION',
			dataIndex: 'selectedSection.sectionName',
			width: 100,
			sorter: (a, b) => a.selectedSection.sectionName.localeCompare(b.selectedSection.sectionName),
		},
		{
			title: 'EXAM',
			dataIndex: 'examName',
			width: 150,
			sorter: (a, b) => a.examName.localeCompare(b.examName),
		},
		{
			title: 'SPECIMEN',
			dataIndex: 'selectedSpecimen.specimenName',
			width: 100,
			sorter: (a, b) => a.selectedSpecimen.specimenName.localeCompare(b.selectedSpecimen.specimenName),
		},
		{
			title: 'PANEL',
			dataIndex: 'selectedPanel.panelName',
			width: 100,
			sorter: (a, b) => {
				const aPanelName = a.selectedPanel ? a.selectedPanel.panelName : '';
				const bPanelName = b.selectedPanel ? b.selectedPanel.panelName : '';
					
				return aPanelName.localeCompare(bPanelName);
			},
		},
		{
			title: RemoveBtn,
			dataIndex: 'action',
			width: 100,
			align: 'right'
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
		const { selectedExams, removeSelectedExamByExam, removeAllExams } = this.props; 
		const TableCols = createColumns(removeAllExams);
		const TableData = selectedExams.map(selectedExam => ({ 
			key: selectedExam.examID,
			...selectedExam,
			action: selectedExam.isDisabled ? null : (
				<Button 
					type="dashed" 
					icon="close" 
					size="small" 
					style={{ fontSize: 10 }}
					onClick={() => removeSelectedExamByExam(selectedExam)}
				/> 
			)
		}));

		return (
			<div className="select-step-table">
				<AntTable
					size="small"
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
	removeSelectedExamByExam: PropTypes.func.isRequired,
	removeAllExams: PropTypes.func.isRequired,
	populatePanels: PropTypes.func.isRequired,
};

export default SelectTable;
