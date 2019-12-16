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
import {messagePrompts, buttonNames} from './settings';

// CSS
import './specimen.css';


class SpecimenList extends React.Component {
	state = {
		patientRequestSpecimen: null,
		loading: []
	}

	async componentDidMount(){
		const { patientInfo } = this.props;
		const patientSpecimensAPI = await patientPhleboSpecimensAPI(patientInfo.requestID);
		// eslint-disable-next-line prefer-destructuring
		let requestExams = [];
		requestExams = this.mapExams(patientSpecimensAPI);
		this.setState({  
			patientRequestSpecimen: requestExams
		});
		
	}

	componentDidUpdate = async () =>{
		const { patientInfo } = this.props;
		const patientSpecimensAPI = await patientPhleboSpecimensAPI(patientInfo.requestID);
		let requestExams = [];
		requestExams = this.mapExams(patientSpecimensAPI);
		if(patientSpecimensAPI != undefined){
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({  
				patientRequestSpecimen: requestExams
			});
		}
		
	}

	onChange = async (e,id) => {
		// eslint-disable-next-line react/no-access-state-in-setstate
		const loading = this.state.loading.slice();
		loading[id] = true;
		const sectionID =  e.target.attributes.getNamedItem('data-sectionid').value;
		const specimenID = e.target.attributes.getNamedItem('data-specimenid').value;
		const requestID = e.target.attributes.getNamedItem('data-requestid').value;
		const inputID = e.target.id;
		const {userID} = JSON.parse(sessionStorage.getItem("LOGGEDIN_USER_DATA"));
		
		this.setState({ loading });
		const saveExtraction = await patientPhleboCheckInSpecimensAPI({ requestID, sectionID, specimenID, userID  });
		
		this.setState({ loading: false });
		console.log(saveExtraction);
		if(saveExtraction.status === 200 || saveExtraction.length > 0){
			document.getElementById(inputID).setAttribute("disabled","");
			document.getElementById(inputID).innerHTML = buttonNames.extracted;
			HttpCodeMessage({status: saveExtraction.status, message: `${messagePrompts.successExtraction} ${ saveExtraction.data.sampleSpecimenID}` });
		} else{
			HttpCodeMessage({status: saveExtraction.status, message: messagePrompts.commonErrorMessage});
		}
	}

	mapExams = (params) =>{
		const returnArray = [];
		const {requestID} = params;
		params.sections.map(function(keySection,indexSection){ // Get sections
			keySection.specimens.map(function(keySpecimen){ // Get specimens
				returnArray[indexSection] = {
					"key": `${keySection.sectionName}${keySection.sectionID}`,
					"phlebo_sectionID": keySection.sectionID,
					"phlebo_section_col": keySection.sectionName, 
					"phlebo_specimenID": keySpecimen.specimenID,
					"phlebo_specimen_col": keySpecimen.specimenName,
					"phlebo_requestID": requestID,
					"phlebo_sampleSpecimenID": keySpecimen.sampleSpecimenID,
					"phlebo_sampleid_col" : keySpecimen.sampleSpecimenID ? keySpecimen.sampleSpecimenID : "N/A",
					"phlebo_user_col" : keySpecimen.extractedBy,
					"phlebo_dateExtracted_col" : keySpecimen.dateExtracted,
					"children": keySpecimen.exams.map(function(keyExams,indexExams) // Push exams to existing array
					{
						return {
							props: {
								colSpan: '5',
							},
							"key":`${keySection.sectionName}${keySection.sectionID}${indexExams}`,
							"phlebo_section_col": keyExams,
						};
					})
				}
			});
		});
		return returnArray;
	}

	handlePrint = async (e) =>{
		const specimenID = e.target.attributes.getNamedItem('data-specimenid').value;
		const printBarcode = await printBarcodeSpecimenAPI(specimenID);

		HttpCodeMessage({status: printBarcode.status, message: printBarcode.data});
	}

	render() {  
		const columns = [
		{ 
			title: '',
			width: 50
		},
		{ 
			title: 'SECTION', 
			dataIndex: 'phlebo_section_col',
			key: 'phlebo_section_col',
			width: '15%'
		},
		{ 
			title: 'SPECIMEN', 
			dataIndex: 'phlebo_specimen_col',
			key: 'phlebo_specimen_col',
			width: '13%'
		},
		{ 
			title: 'SAMPLE ID', 
			dataIndex: 'phlebo_sampleid_col',
			key: 'phlebo_sampleid_col',
			width: '10%'
		},
		{ 
			title: 'EXTRACTED BY', 
			dataIndex: 'phlebo_user_col',
			key: 'phlebo_user_col',
			width: '13%'
		},
		{ 
			title: 'DATE EXTRACTED', 
			dataIndex: 'phlebo_dateExtracted_col',
			key: 'phlebo_dateExtracted_col',
			width: '15%'
		},
		{ 
			title: 'STATUS',
			dataIndex: 'phlebo_status_col',
			key: 'phlebo_status_col',
			width: '15%',
			render:(button,value) => {
				const id = `phlebo_extractButton-${value.phlebo_sectionID}${value.phlebo_specimenID}${value.phlebo_requestID}`;
				return(
					<Col className="phlebo_exams_extract phlebo_examreq_alignment">
						<Button 
							id={id}
							onClick={e => this.onChange(e,id)}
							loading={this.state.loading[id] || false}
							data-sectionid={value.phlebo_sectionID} 
							data-specimenid={value.phlebo_specimenID} 
							data-requestid={value.phlebo_requestID}
							disabled={value.phlebo_sampleSpecimenID}
							className="extract-phlebo-btn"
						>
							{value.phlebo_sampleSpecimenID ? buttonNames.extracted : buttonNames.extract} 
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
			render:(button,value) => {
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
	
	return (
		<div className="phlebotable-container">
			<Table
				className="phlebotable"
				columns={columns}
				dataSource={this.state.patientRequestSpecimen}
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