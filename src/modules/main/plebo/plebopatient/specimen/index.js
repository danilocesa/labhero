/* eslint-disable func-names */
/* eslint-disable array-callback-return */
// LIBRARY
import React from 'react';
import { Table, Radio, Col } from 'antd';
import PropTypes from 'prop-types';

// CUSTOM MODULES
import patientPhleboSpecimensAPI from 'services/patientPhleboSpecimens';

// CSS
import './specimen.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function onChange(e) {
	console.log(`radio checked:${e.target.value}`);
}

class SpecimenList extends React.Component {
	state = {
		patientSectionList: null
	}

	async componentDidMount(){
		const {patientInfo} = this.props;
		const patientSpecimensAPI = await patientPhleboSpecimensAPI(patientInfo.requestID);
		const parentLevel = [];
		
    
		patientSpecimensAPI.sections.map(function(keySection,indexSection){ // Get sections
			keySection.specimens.map(function(keySpecimen){ // Get specimens
				parentLevel[indexSection] = {
					"key": Math.random(),
					"phlebo_section_col": keySection.sectionName, 
					"phlebo_specimen_col": keySpecimen.specimenName,
					"children": keySpecimen.exams.map(function(keyExams,indexExams) // Push exams to existing array
					{
						return {"key":indexExams,"phlebo_section_col": keyExams, "phlebo_specimen_col": ''};
					})
				}
			});
		});
		console.log("TCL: SpecimenList -> componentDidMount -> parentLevel", parentLevel)
		this.setState({  patientSectionList: parentLevel });
	}

	render() {  
		const columns = [
		{ 
			title: 'SECTION', 
			dataIndex: 'phlebo_section_col', 
			key: 'phlebo_section_col',
		},
		{ 
			title: 'SPECIMEN', 
			dataIndex: 'phlebo_specimen_col', 
			key: 'phlebo_specimen_col',
		},
		{ 
			title: 'STATUS',
			dataIndex: 'phlebo_status_col', 
			key: 'phlebo_status_col',
			render:button => 
			(
					<Col style={{ paddingLeft: 245, alignText: 'center' }} className="phlebo_exams_extract">
						<RadioGroup buttonStyle="solid"> 
							<RadioButton 
								onClick={onChange} 
								value="b"
							>
							EXTRACTED
								{button}
							</RadioButton>
						</RadioGroup>
					</Col>
				)
				,
		},
	];

	return (
		<div>
			<Table
				className="phlebotable"
				columns={columns}
				dataSource={this.state.patientSectionList}
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