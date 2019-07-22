import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table, Popover } from 'antd';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const tableCSS = css({
  '& thead > tr > th': {
    backgroundColor: 'white',
		color: 'unset',
		fontWeight: 'bold',
		borderBottom: '1px solid #e8e8e8'
  }
});


const popoverContent = (data = []) => (
	<Table 
		dataSource={data}
		columns={[
			{ title: 'CODE', dataIndex: 'code' },
			{ title: 'EXAM NAME', dataIndex: 'exam' }
		]}
		pagination={false}
		rowKey={record => record.code}
		css={tableCSS}
	/>
);


const rowItem = (item) => (
	<Popover 
		content={popoverContent(item.subcontent)} 
		trigger="hover"
		visible={item.active}
	>
		<div>
			{item.code}
		</div>
	</Popover>
);

const columns = [
	{ 
		title: 'CODE',
		dataIndex: 'code',
		width: '15%'
	},
	{ 
		title: 'PROFILE NAME',
		dataIndex: 'profile',
		width: '35%',
		render: (text, record) => rowItem(record),
	},
	{ 
		title: 'STATUS',
		dataIndex: 'status',
		width: '15%'
	},
	{ 
		title: 'TEMPLATE',
		dataIndex: 'template',
		width: '35%'
	}
];


class ExamTable extends React.Component {
	render() {
		const { data, pageSize, loading = false, updateSelectedRow, onRowDblClick } = this.props;

		return (
			<div style={{ marginTop: 20 }}>
				<Spin spinning={loading} tip="Loading...">
					<Table 
						pagination={{pageSize}} 
						columns={columns} 
						dataSource={data} 
						scroll={{ y: 260 }}
						rowKey={record => record.code}
						onRow={(record, rowIndex) => {
							return {
								onMouseEnter: () => updateSelectedRow(rowIndex),
								onMouseLeave: () => updateSelectedRow(-1),
								onDoubleClick: () => onRowDblClick()
							};
						}}
					/>
				</Spin>
			</div>
		);
	}
}


ExamTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		code: PropTypes.string.isRequired,
		profile: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
		template: PropTypes.string.isRequired,
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	updateSelectedRow: PropTypes.func.isRequired,
	onRowDblClick: PropTypes.func.isRequired
};

export default ExamTable;