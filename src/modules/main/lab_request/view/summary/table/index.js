import React from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col } from 'antd';

import './table.css';

const columns = [
	{
		title: 'PANEL',
		dataIndex: 'panel',
		width: 200,
		defaultSortOrder: 'ascend',
		sorter: (a, b) => {
			const aPanel =  a.panel === null ? '' : a.panel;
			const bPanel =  b.panel === null ? '' : b.panel;
				
			return aPanel.localeCompare(bPanel);
		},
	},
	{
		title: 'SECTION',
		dataIndex: 'section',
		width: 200,
	},
	{
		title: 'EXAM NAME',
		dataIndex: 'exam',
		width: 300,
	},
	{
		title: 'SPECIMEN',
		dataIndex: 'specimen',
		width: 200,
		render: text => text.toString().toUpperCase()
	}
];

function SummaryTable({ exams }) {
	 
	return (
		<Row style={{ marginTop: 20 }}>
			<Col sm={{ span: 24 }} lg={{ span: 18, offset: 3 }}>
				<div className="summary-step-table">
					<Table 
						dataSource={exams} 
						rowKey={record => record.key}
						// @ts-ignore
						columns={columns} 
						pagination={false}
					/>
				</div>
			</Col>
		</Row>
	);
}

SummaryTable.propTypes = {
	exams: PropTypes.arrayOf(PropTypes.shape({
		panel: PropTypes.string,
		section: PropTypes.string,
		examName: PropTypes.string,
		specimen: PropTypes.string,
	})).isRequired
};

export default SummaryTable;
