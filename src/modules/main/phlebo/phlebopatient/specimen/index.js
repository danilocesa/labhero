// @ts-nocheck
/* eslint-disable func-names */
/* eslint-disable array-callback-return */
// LIBRARY
import React from 'react';
import { Table, Button, Col } from 'antd';
import PropTypes from 'prop-types';


// CUSTOM MODULES
import patientPhleboSpecimensAPI from 'services/patientPhleboSpecimens';
import axiosCall from 'services/axiosCall';
import { apiUrlCheckInSpecimen } from 'shared_components/constant-global';
import Message from 'shared_components/message';

// CSS
import './specimen.css';

// const RadioButton = Radio.Button;
// const RadioGroup = Radio.Group;


class SpecimenList extends React.Component {
	state = {
		patientRequestSpecimen: null,
		loading: false
	}

	async componentDidMount(){
		const {patientInfo} = this.props;
		const patientSpecimensAPI = await patientPhleboSpecimensAPI(patientInfo.requestID);
    console.log("TCL: SpecimenList -> componentDidMount -> patientSpecimensAPI", patientSpecimensAPI)
		// eslint-disable-next-line prefer-destructuring
		const requestID = patientSpecimensAPI.requestID;
		const requestExams = [];

		patientSpecimensAPI.sections.map(function(keySection,indexSection){ // Get sections
			keySection.specimens.map(function(keySpecimen){ // Get specimens
				requestExams[indexSection] = {
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
								colSpan: 5,
							},
							"key":`${keySection.sectionName}${keySection.sectionID}${indexExams}`,
							"phlebo_section_col": keyExams,
						};
					})
				}
			});
		});
		this.setState({  
			patientRequestSpecimen: requestExams
		});
		
	}

	onChange = async (e) => {
		const sectionID =  e.target.attributes.getNamedItem('data-sectionid').value;
		const specimenID = e.target.attributes.getNamedItem('data-specimenid').value;
		const requestID = e.target.attributes.getNamedItem('data-requestid').value;
		const inputID = e.target.id;
		const userDataSession = sessionStorage.getItem("LOGGEDIN_USER_DATA");
    
		this.setState({ loading: true});
		const saveExtraction = await this.checkIn(requestID, sectionID, specimenID, JSON.parse(userDataSession).userID);
		this.setState({ loading: false });
		
		if(saveExtraction){
			document.getElementById(inputID).setAttribute("disabled","");
			document.getElementById(inputID).setAttribute("loading", true);
			document.getElementById(inputID).innerHTML = "EXTRACTED";
			Message.info(`Success! Sample specimen ID: ${ saveExtraction.sampleSpecimenID}`);
			document.location.reload();
		} else{
			Message.error("Something went wrong!");
		}
		
	}

	checkIn = async (requestID, sectionID, specimenID, userID) => {
		let data = null;
		try{
			const body = { requestID, sectionID, specimenID, userID };
			const response = await axiosCall({
				method: 'POST',
				url: apiUrlCheckInSpecimen,
				data: body,
				headers: {
					'content-type': 'application/json',
					'authorization': 'Bearer superSecretKey@345' // Change to env
				}
			});
			data = response;
			
		}
		catch(e) {
    	console.log("TCL: SpecimenList -> checkIn -> e", e)
		}
		return data.data;
	}

	handlePrint = ({params}) =>{
		console.log('TCL: Initiate printing funciton', params); 
	}

	render() {  
		const columns = [
		{ 
			title: 'SECTION', 
			dataIndex: 'phlebo_section_col', 
			key: 'phlebo_section_col',
			width: "16%"
		},
		{ 
			title: 'SPECIMEN', 
			dataIndex: 'phlebo_specimen_col', 
			key: 'phlebo_specimen_col',
			width: "16%"
		},
		{ 
			title: 'SAMPLE ID', 
			dataIndex: 'phlebo_sampleid_col', 
			key: 'phlebo_sampleid_col',
			width: "16%"
		},
		{ 
			title: 'EXTRACTED BY', 
			dataIndex: 'phlebo_user_col', 
			key: 'phlebo_user_col',
			width: "16%"
		},
		{ 
			title: 'DATE EXTRACTED', 
			dataIndex: 'phlebo_dateExtracted_col', 
			key: 'phlebo_dateExtracted_col',
			width: "16%"
		},
		{ 
			title: 'STATUS',
			dataIndex: 'phlebo_status_col', 
			key: 'phlebo_status_col',
			width: "16%",
			render:(button,value) => {
				return(
					<Col className="phlebo_exams_extract phlebo_examreq_alignment">
						<Button 
							id={`phlebo_extractButton-${value.phlebo_sectionID}${value.phlebo_specimenID}${value.phlebo_requestID}`}
							onClick={this.onChange} 
							data-sectionid={value.phlebo_sectionID} 
							data-specimenid={value.phlebo_specimenID} 
							data-requestid={value.phlebo_requestID}
							disabled={value.phlebo_sampleSpecimenID}
							className="extract-phlebo-btn"
						>
							{value.phlebo_sampleSpecimenID ? 'EXTRACTED' : 'EXTRACT'} 
						</Button>
					</Col>
				)
			}
			
		},
		{ 
			title: 'PRINT',
			dataIndex: 'phlebo_print_col', 
			key: 'phlebo_print_col',
			width: "16%",
			render:(button,value) => {
				return(
					<Col className="phlebo_exams_extract phlebo_examreq_alignment">
						<Button 
							id={`phlebo_printButton-${value.phlebo_sectionID}${value.phlebo_specimenID}${value.phlebo_requestID}`}
							onClick={this.handlePrint} 
							className="extract-phlebo-btn"
						>
							{'PRINT'} 
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