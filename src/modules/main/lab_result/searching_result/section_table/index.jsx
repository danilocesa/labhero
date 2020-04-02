import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table } from 'antd';
import Pager from 'shared_components/search_pager';
import { globalTablePageSize } from 'global_config/constant-global';

const columns = [
	{
		title: 'REQUEST DATE', 
		dataIndex: 'requestDateTime', 
		width: 200,
		fixed: 'left',
		render: (text) => text.replace(/\//g, '-')
	},
	{ 
		title: 'PATIENT ID', 
		dataIndex: 'patientID', 
		width: 200,
	},
	{ 
		title: 'LAST NAME', 
		dataIndex: 'lastName', 
		width: 200,
	},
	{ 
		title: 'FIRST NAME', 
		dataIndex: 'givenName', 
		width: 200,
	},
	{ 
		title: 'DATE OF BIRTH', 
		dataIndex: 'dateOfBirth',
		width: 250
	},
	{ 
		title: 'GENDER', 
		dataIndex: 'sex', 
		width: 250,
	},
	{ 
		title: 'HOSPITAL ID', 
		dataIndex: 'hospitalID', 
		width: 250,
	},
	{ 
		title: 'ADDRESS', 
		width: 450,
		dataIndex: 'Address', 
	},
	{ 
		title: 'SECTION', 
		width: 250,
		render: (record) => record.contents[0].sectionName
	},
	{ 
		title: 'SAMPLE ID NO.', 
		width: 250,
		render: (record) => record.contents[0].sampleSpecimenID
	},
	{ 
		title: 'SPECIMEN', 
		render: (record) => record.contents[0].specimenName
	},
	{ 
		title: 'EXAM REQUESTED', 
		fixed: 'right',
		width: 350,
		render: (record) => record.contents[0].examRequestNames
	},
];

class SectionTable extends React.Component {
	state = {
		pageSize: globalTablePageSize,
	};
	
	onChangePageSize = (pageSize) => {
		this.setState({ pageSize });
	}

	render() {
		const { pageSize } = this.state;
		const { labResults, onClickTableRow } = this.props;
		
		return (
			<div>
				<Row>
					<Col lg={24} xs={24}>
						<Pager 
							handleChangeSize={this.onChangePageSize}
							pageTotal={labResults.length}
							pageSize={pageSize}
						/>
					</Col>
				</Row>
				<Table
					className="test-results-table"
					columns={columns}
					pagination={{ pageSize }} 
					dataSource={labResults}
					rowKey={record => record.requestID}
					size="small"
					scroll={{ x: 3000, y: 300 }}
					onRow={record => {
						const { contents, ...restProps } = record;
					
						return { onClick: () => { 
							onClickTableRow({
								patientInfo: { ...restProps },
								examDetails: contents[0]
							}); 
						}};
					}}
				/>
			</div>
		);
	}
}

SectionTable.propTypes = {
	labResults: PropTypes.array.isRequired,
	onClickTableRow: PropTypes.func.isRequired
};

export default SectionTable;