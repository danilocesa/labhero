import React from 'react';
import { Radio, Tooltip, Spin } from 'antd';
import PropTypes from 'prop-types';
import fetchPanel from 'services/lab_request/labPanelExamRequesting';
import { fetchPanelList } from 'services/request_lab/panelList'
import fetchSection from 'services/shared/section';
import { fetchPerSpecimens } from 'services/shared/examRequest';
import { LoadingOutlined } from '@ant-design/icons';

import './section_header.css';

const dynamicWidthStyle = (itemCount = 1) => ({
	width: `calc(100%/${itemCount})`
});

const Loading = () => {
	const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
	
	return (
		<div style={{ textAlign: 'center' }}>
			<Spin indicator={antIcon} />
		</div>
	);
};
	

class SectionHeader extends React.Component {
    state = {
			isLoading: false,
			sections: [],
			specimens: [],
    }

    async componentDidMount() {
			const { populatePanels, populatePanelRef, displayLoading, populatePanelRefNew } = this.props;

			displayLoading(true);

			const sections = await fetchSection();
			const rawPanels = await fetchPanel();
			
			populatePanelRef(rawPanels.filter(rawPanel => rawPanel.active === 1));
			populatePanels();
			this.setState({ sections });

			displayLoading(false);
    }

    onChangeSection = async (event) => {
			const { updateSelectedSection, populatePanels, clearExams } = this.props;
			const selectedSectionName = event.target['data-sectionname'];
			const selectedSectionID = event.target['data-sectionid'];
			const selectedSectionCode = event.target.value;
			const isPanelSelected = selectedSectionCode === 'panel';

			
			clearExams();

			updateSelectedSection({
				sectionID: selectedSectionID,
				sectionName: selectedSectionName,
				sectionCode: selectedSectionCode 
			});

			if(isPanelSelected) {
				this.setState({	specimens: [] }); // Clear specimens
				populatePanels();
			} 
			else 
				this.populateSpecimen(selectedSectionID);
    }
		
		onChangeSpecimen = (event) => {
			const { specimens } = this.state;
			const { populateExams, updateSelectedSpecimen } = this.props;
			const selectedSpecimenName = event.target['data-specimenname'];
			const selectedSpecimenID = event.target['data-specimenid'];

			updateSelectedSpecimen({ 
				specimenID: selectedSpecimenID, 
				specimenName: selectedSpecimenName
			});

			// Check the specimen object if it has the specimen id
			// then set the value of exams to the corresponding specimen id
			//
			// Note. I use 'some' to stop the loop when it finds correct ID.
			specimens.some((item, index) => {
				if(item.specimen.specimenID === selectedSpecimenID) {
					const { exams } = specimens[index];

					populateExams(exams);

					return true;
				}

				return false;
			});
		}

		populateSpecimen = async(selectedSectionID) => {
			this.setState({ isLoading: true });
			const specimens = await fetchPerSpecimens(selectedSectionID);
			this.setState({ isLoading: false, specimens });
		}

    render() {
			const { sections, specimens, isLoading } = this.state;

			const SectionList = sections.map(item => ( 
				<Tooltip 
					title={item.sectionName}
					key={item.sectionCode}
				>
					<Radio.Button 
						value={item.sectionCode}
						data-sectionname={item.sectionName}
						data-sectionid={item.sectionID}
						style={dynamicWidthStyle(sections.length + 1)}
					> 
						{item.sectionCode} 
					</Radio.Button> 
				</Tooltip>
			));

			const SpecimenList = specimens.map(item => ( 
				<Radio.Button 
					value={item.specimen.specimenID}
					key={item.specimen.specimenID} 
					data-specimenid={item.specimen.specimenID} 
					data-specimenname={item.specimen.specimenName}
					style={dynamicWidthStyle(specimens.length)}
				> 
					{item.specimen.specimenName} 
				</Radio.Button>
			));
			// Adds at the beginning of an array
			SectionList.unshift(( 
				<Radio.Button value="panel" key="panel" style={{ width: `calc(100%/${SectionList.length + 1})` }}>
					PANEL  
				</Radio.Button>
			));

			return ( 
				<div className="section-group">
					<Radio.Group 
						className="section-list"
						defaultValue="panel"
						buttonStyle="solid"
						onChange={this.onChangeSection} 
					> 
						{SectionList}
					</Radio.Group> 
					{
						!isLoading && (
							<Radio.Group 
								className="specimen-list"
								buttonStyle="solid"
								onChange={this.onChangeSpecimen} 
							> 
								{SpecimenList}
							</Radio.Group> 
						)
					}
					{ isLoading && <Loading /> }
				</div>
			);
    }
}

SectionHeader.propTypes = {
	populateExams: PropTypes.func.isRequired,
	populatePanels: PropTypes.func.isRequired,
	populatePanelRef: PropTypes.func.isRequired,
	updateSelectedSpecimen: PropTypes.func.isRequired,
	updateSelectedSection: PropTypes.func.isRequired,
	clearExams: PropTypes.func.isRequired,
	populatePanelRefNew:PropTypes.func.isRequired,
	displayLoading: PropTypes.func.isRequired
}

export default SectionHeader;