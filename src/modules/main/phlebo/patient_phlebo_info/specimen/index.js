/* eslint-disable eqeqeq */
// @ts-nocheck
/* eslint-disable func-names */
/* eslint-disable array-callback-return */
// LIBRARY
import React from 'react';
import { Table, Button, Spin } from 'antd';
import PropTypes from 'prop-types';
import { globalTableSize } from 'global_config/constant-global';

// CUSTOM MODULES
import patientPhleboSpecimensAPI from 'services/phlebo/specimenTracking/requestid';
import patientPhleboCheckInSpecimensAPI from 'services/phlebo/specimenTracking/checkinspecimen';
import printBarcodeSpecimenAPI from 'services/phlebo/specimenTracking/printBarcodeSpecimen';
import HttpCodeMessage from 'shared_components/message_http_status';
import { messagePrompts, buttonNames } from './settings';

// CSS
import './specimen.css';


class SpecimenList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			requestID: null,
			examRequests: [],
			loadingIndex: [],
			isFetchingData: false
		}

		this.columns = [
			{ 
				title: 'SECTION', 
				dataIndex: 'sectionName',
				width: 120
			},
			{ 
				title: 'SPECIMEN', 
				dataIndex: 'specimenName',
				width: 120
			},
			{ 
				title: 'SAMPLE ID', 
				dataIndex: 'sampleSpecimenID',
				width: 120
			},
			{ 
				title: 'EXTRACTED BY', 
				dataIndex: 'extractedBy',
				width: 150
			},
			{ 
				title: 'DATE EXTRACTED', 
				dataIndex: 'dateExtracted',
				width: 180
			},
			{ 
				title: 'STATUS',
				dataIndex: 'phlebo_status_col',
				width: 120,
				render: (value, row, index) => {
					const { loadingIndex } = this.state;

					return(
						<Button 
							onClick={() => this.onClickExtract(row.sectionID, row.specimenID, index)}
							loading={loadingIndex === index}
							disabled={row.sampleSpecimenID}
							className="extract-phlebo-btn"
						>
							{row.sampleSpecimenID ? buttonNames.extracted : buttonNames.extract} 
						</Button>
					)
				}
			},
			{ 
				title: '',
				dataIndex: 'phlebo_print_col',
				width: 70,
				render:(value, row) => {
					return(
						<Button 
							onClick={() => this.handlePrint(row.specimenID)} 
							className="extract-phlebo-btn"
							icon="printer"
							style={{ fontSize: '24px' }}
							disabled={!row.sampleSpecimenID}
						/>
					)
				}
			},
		];

	}

	componentDidMount(){
		const { patientInfo } = this.props;
		this.setState({ isFetchingData: true }, async () => {
			const patientSpecimens = await patientPhleboSpecimensAPI(patientInfo.requestID);

			this.setState({ 
				requestID: patientSpecimens.requestID,
				examRequests: patientSpecimens.examRequests,
				isFetchingData: false
			});
		});
	}

	onClickExtract = (sectionID, specimenID, index) => {
		const { requestID } = this.state;
		const { patientInfo } = this.props;
		const { userID } = JSON.parse(sessionStorage.getItem("LOGGEDIN_USER_DATA"));
		
		this.setState({ loadingIndex: index }, async () => {
			const { examRequests } = this.state;
			let examRequestClone = JSON.parse(JSON.stringify(examRequests));

			const saveExtraction = await patientPhleboCheckInSpecimensAPI({ 
				requestID, 
				sectionID, 
				specimenID, 
				userID  
			});

			if(saveExtraction.status === 200 || saveExtraction.length > 0){
				HttpCodeMessage({
					status: saveExtraction.status, 
					message: `${messagePrompts.successExtraction} ${ saveExtraction.data.sampleSpecimenID}` 
				});

				const patientSpecimens = await patientPhleboSpecimensAPI(patientInfo.requestID);

				examRequestClone = patientSpecimens.examRequests;
			} else{
				HttpCodeMessage({
					status: saveExtraction.status, 
					message: messagePrompts.commonErrorMessage
				});
			}

			this.setState({ loadingIndex: -1, examRequests: examRequestClone });
		});
	}

	handlePrint = async (specimenID) =>{
		const printBarcode = await printBarcodeSpecimenAPI(specimenID);

		HttpCodeMessage({status: printBarcode.status, message: printBarcode.data});
	}

	render() {  
		const { examRequests, isFetchingData } = this.state;

		return (
			<div className="phlebotable-container">
				<Spin spinning={isFetchingData}>
					<Table
						columns={this.columns}
						// eslint-disable-next-line react/no-array-index-key
						expandedRowRender={(record) => record.exams.map((i, index) => <div key={index}>{i}</div>)}
						dataSource={examRequests}
						rowKey={record => `${record.sectionCode}-${record.specimenID}`}
						size={globalTableSize}
						pagination={false}
						scroll={{ y: 300 }}
					/>
				</Spin>
			</div>
		);
	}
}

SpecimenList.propTypes = {
	patientInfo: PropTypes.object
};

SpecimenList.defaultProps = {
	patientInfo() { return null; }
}

export default SpecimenList;