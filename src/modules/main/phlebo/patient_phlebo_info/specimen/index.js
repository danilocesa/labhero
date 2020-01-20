/* eslint-disable eqeqeq */
// @ts-nocheck
/* eslint-disable func-names */
/* eslint-disable array-callback-return */
// LIBRARY
import React from 'react';
import { Table, Button, Col } from 'antd';
import PropTypes from 'prop-types';


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

		this.columns = [
			{ 
				title: '',
				width: 50
			},
			{ 
				title: 'SECTION', 
				dataIndex: 'sectionName',
				width: '15%'
			},
			{ 
				title: 'SPECIMEN', 
				dataIndex: 'specimenName',
				width: '13%'
			},
			{ 
				title: 'SAMPLE ID', 
				dataIndex: 'sampleSpecimenID',
				width: '10%'
			},
			{ 
				title: 'EXTRACTED BY', 
				dataIndex: 'extractedBy',
				width: '13%'
			},
			{ 
				title: 'DATE EXTRACTED', 
				dataIndex: 'dateExtracted',
				width: '15%'
			},
			{ 
				title: 'STATUS',
				dataIndex: 'phlebo_status_col',
				key: 'phlebo_status_col',
				width: '15%',
				render: (value, row, index) => {
					const { loading } = this.state;
					const id = `phlebo_extractButton-${row.phlebo_sectionID}${row.phlebo_specimenID}${row.phlebo_requestID}`;
					
					return(
						<Col className="phlebo_exams_extract phlebo_examreq_alignment">
							<Button 
								id={id}
								onClick={() => this.onClickExtract(row.sectionID, row.specimenID, index)}
								loading={loading[index]}
								disabled={row.phlebo_sampleSpecimenID}
								className="extract-phlebo-btn"
							>
								{row.phlebo_sampleSpecimenID ? buttonNames.extracted : buttonNames.extract} 
							</Button>
						</Col>
					)
				}
			},
			{ 
				title: '',
				dataIndex: 'phlebo_print_col',
				key: 'phlebo_print_col',
				width: 100,
				render:(button, value) => {
					return(
						<Col className="phlebo_exams_extract phlebo_examreq_alignment">
							<Button 
								id={`phlebo_printButton-${value.phlebo_sectionID}${value.phlebo_specimenID}${value.phlebo_requestID}`}
								onClick={this.handlePrint} 
								className="extract-phlebo-btn"
								data-specimenid={value.phlebo_specimenID} 
								icon="printer"
								style={{ fontSize: '24px' }}
								disabled={!value.phlebo_sampleSpecimenID}
							>
								{''} 
							</Button>
						</Col>
					)
				}
			},
		];

		this.state = {
			requestID: null,
			examRequests: null,
			loading: []
		}
	}

	async componentDidMount(){
		const { patientInfo } = this.props;
		const patientSpecimens = await patientPhleboSpecimensAPI(patientInfo.requestID);

		this.setState({ 
			requestID: patientSpecimens.requestID,
			examRequests: patientSpecimens.examRequests
		});
	}

	componentDidUpdate = async () =>{
		const { patientInfo } = this.props;
		if(!this.state.examRequests){ // Temp fix for too many request
			const patientSpecimensAPI = await patientPhleboSpecimensAPI(patientInfo.requestID);
			const requestExams = [];
			// requestExams = this.mapExams(patientSpecimensAPI);

			if(patientSpecimensAPI != undefined){
				// eslint-disable-next-line react/no-did-update-set-state
				this.setState({  
					examRequests: requestExams
				});
			}

		}
		
	}

	onClickExtract = async (sectionID, specimenID, index) => {
		// eslint-disable-next-line react/no-access-state-in-setstate
		const { requestID } = this.state;

		const { userID } = JSON.parse(sessionStorage.getItem("LOGGEDIN_USER_DATA"));
		
		this.setState({ [`data-${index}`]: true });
		const saveExtraction = await patientPhleboCheckInSpecimensAPI({ 
			requestID, 
			sectionID, 
			specimenID, 
			userID  
		});
		
		this.setState({ [`data-${index}`]: false });
		// if(saveExtraction.status === 200 || saveExtraction.length > 0){
		// 	document.getElementById(inputID).setAttribute("disabled","");
		// 	document.getElementById(inputID).innerHTML = buttonNames.extracted;
		// 	HttpCodeMessage({status: saveExtraction.status, message: `${messagePrompts.successExtraction} ${ saveExtraction.data.sampleSpecimenID}` });
		// } else{
		// 	HttpCodeMessage({status: saveExtraction.status, message: messagePrompts.commonErrorMessage});
		// }
	}

	handlePrint = async (e) =>{
		const specimenID = e.target.attributes.getNamedItem('data-specimenid').value;
		const printBarcode = await printBarcodeSpecimenAPI(specimenID);

		HttpCodeMessage({status: printBarcode.status, message: printBarcode.data});
	}

	render() {  
		const { examRequests } = this.state;

		return (
			<div className="phlebotable-container">
				<Table
					className="phlebotable"
					columns={this.columns}
					expandedRowRender={record => record.exams.map(i => <div>{i}</div>)}
					dataSource={examRequests}
					size="small"
					scroll={{ y: 300 }}
				/>
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