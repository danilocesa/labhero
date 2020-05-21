import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { globalTableSize } from 'global_config/constant-global';


import './index.css';

class ExpandedTable extends React.Component {
	state = { isPrintLoading: [] };

	onClickPrint = (record, index) => {
		const { onClickPrint: print } = this.props;

		this.setState((state) => { 
			return this.getPrintLoadingState(state.isPrintLoading, index, true);
		}, async () => {
			await print(record.sampleSpecimenID);

			this.setState((state) => { 
				return this.getPrintLoadingState(state.isPrintLoading, index, false);
			});
		});
	}

	getPrintLoadingState = (printLoadingArray, index, isLoading) => {
		const printLoadingClone = [...printLoadingArray];
		printLoadingClone[index] = isLoading; 

		return { isPrintLoading: printLoadingClone };
	}

	render() {
		const { isPrintLoading } = this.state;
		const { expandedData, onClickTableRow } = this.props;
		const { contents, ...restProps } = expandedData;
		const columns = [
			{
				title: 'Section',
				dataIndex: 'sectionName',
				width: 150,
			},
			{ 
				title: 'Sample ID No.', 
				dataIndex: 'sampleSpecimenID', 
				width: 170,
			},
			{ 
				title: 'Specimen', 
				dataIndex: 'specimenName', 
				width: 150,
			},
			{ 
				title: 'Exam Requested', 
				dataIndex: 'examRequestNames', 
			},
			{
				title: '', 
				width: 100,
				render: (text, record, index) => {
					return (
						<Button 
							loading={isPrintLoading[index]}
							onClick={() => this.onClickPrint(record, index)}
							disabled={record.specimenStatus !== 'Approve' && record.specimenStatus !== 'Save'}
						>
							Print
						</Button>
					);
				}
			}
		];

		return (
			<Table
				className="lab-result-expanded-table"
		    columns={columns}
		    dataSource={contents}
		    pagination={false}
				size={globalTableSize}
				rowKey={record => `${record.sampleSpecimenID}-${record.specimenID}`}
        onRow={record => {
          return { onDoubleClick: () => { 
						onClickTableRow({ 
							examDetails: record, 
							patientInfo: { ...restProps }
						}); 
					}};
        }}
			/>
		);
	}
}

ExpandedTable.propTypes = {
	expandedData: PropTypes.shape({
		contents: PropTypes.array
	}).isRequired,
	onClickTableRow: PropTypes.func.isRequired,
	onClickPrint: PropTypes.func.isRequired
};

export default ExpandedTable;
