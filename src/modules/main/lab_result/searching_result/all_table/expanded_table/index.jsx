import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { UserAccessContext } from 'context/userAccess';
import { globalTableSize } from 'global_config/constant-global';

import './index.css';

function ExpandedTable(props) {
	const { expandedData, onClickTableRow } = props;
	const { contents, ...restProps } = expandedData;
	const { userAccess } = useContext(UserAccessContext);
	const [isPrintLoading, setIsPrintLoading] = useState([]);
	
	async function onClickPrint(record, index) {
		const { onClickPrint: print } = props;

		await setIsPrintLoading(prevState => getPrintLoadingState(prevState, index, true));
		await print(record.sampleSpecimenID);

		setIsPrintLoading((prevState) => getPrintLoadingState(prevState, index, false));
	}

	function getPrintLoadingState(printLoadingArray, index, isLoading) {
		const printLoadingClone = [...printLoadingArray];
		printLoadingClone[index] = isLoading; 

		return printLoadingClone;
	}
		
	const columns = [
		{
			title: 'SECTION',
			dataIndex: 'sectionName',
			width: 150,
		},
		{ 
			title: 'SAMPLE ID NO.', 
			dataIndex: 'sampleSpecimenID', 
			width: 170,
		},
		{ 
			title: 'SPECIMEN', 
			dataIndex: 'specimenName', 
			width: 150,
		},
		{ 
			title: 'EXAM REQUESTED', 
			dataIndex: 'examRequestNames', 
		},
		{ 
			title: 'STATUS', 
			dataIndex: 'specimenStatus', 
			width: 150,
			render: (text) => `${text}`.toUpperCase()
		},
		{
			title: '', 
			width: 100,
			render: (text, record, index) => {
				if(!userAccess.result.print)
					return null;
					
				return (
					<Button 
						loading={isPrintLoading[index]}
						onClick={() => onClickPrint(record, index)}
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

ExpandedTable.propTypes = {
	expandedData: PropTypes.shape({
		contents: PropTypes.array
	}).isRequired,
	onClickTableRow: PropTypes.func.isRequired,
	onClickPrint: PropTypes.func.isRequired,
};

export default ExpandedTable;
