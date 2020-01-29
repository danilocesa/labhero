import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Spin } from 'antd';

import PageTitle from 'shared_components/page_title';
import Restriction from '../clr_restriction/restriction';
import Tracker from '../../tracker';
import SectionHeader from './section_header';
import SectionContent from './section_content';
import SelectTable from './table';
import Navigation from './navigation';

import { CLR_SEL_EXAMS, CLR_SEL_CONTENTS, CLR_SEL_PANEL_CONTENTS } from '../constants';
import { moduleTitles, requestTypes } from '../../../settings/lab_exam_request/settings';

const ColLayout = {
	sm: { span: 24 },
	md: { span: 12 },
	lg: { span: 12 },
};

const Loading = () => {
	return (
		<div style={{ textAlign: 'center', marginTop: 150, marginBottom: 100 }}>
			<Spin tip="Loading..." />
		</div>
	);
};

class SelectStep extends React.Component {
	state = {
		isLoading: false,
		selectedSection: {
			sectionID: null,
			sectionName: null,
			sectionCode: null
		},
		selectedSpecimen: {},
		selectedExams: [],
		selectedContents: [], // holds all selected contents including panels and single exam
		selectedContentsByPanel: [], // holds the selected contents of 1 panel only
		exams: [], // holds the list of exam to be selected (left side)
		panels: [], // holds the list of panel to be selected (left side)
		panelRef: [], // holds the reconstructed panel object from raw response panel object
	};

	constructor(props) {
		super(props);

		// 3 is the stepnumber
		this.restriction = new Restriction(3);
	}

	componentDidMount() {
		const exams = sessionStorage.getItem(CLR_SEL_EXAMS);
		const contents = sessionStorage.getItem(CLR_SEL_CONTENTS);
		const panelContents = sessionStorage.getItem(CLR_SEL_PANEL_CONTENTS);

		if(exams) {
			this.setState({ 
				selectedExams: JSON.parse(exams),
				selectedContents: JSON.parse(contents),
				selectedContentsByPanel: JSON.parse(panelContents)
			});
		}
	}

	populateExams = (exams) => {
		const { selectedExams, selectedContents } = this.state;

		const processedExams = exams.map(exam => { 
			const isSelected = selectedExams.some(item => exam.examCode === item.examCode);
			const isDisabled = selectedExams.some(item => {
				const isInContents = selectedContents.some(selContent => exam.contents.includes(selContent));

				if(item.examID === exam.examID && item.selectedPanel !== null)
					return true;

				if(isInContents && !isSelected)
					return true;

				return false
			});

			
			return { ...exam, isSelected, isDisabled };
		});

		this.setState({ exams: processedExams });
	}

	populatePanelRef = (panels) => {
		const panelRef = [];

		panels.forEach(panel => {
			const panelModel = {
				panelCode: panel.panelCode,
				panelID: panel.panelID,
				panelName: panel.panelName,
				exams: []
			};

			panel.exams.forEach(exam1 => {
				exam1.perSpecimen.forEach(perSpecimen => {
					perSpecimen.exams.forEach(exam2 => {
						panelModel.exams.push({
							examID: exam2.examID, 
							examName: exam2.examName, 
							examCode: exam2.examCode, 
							section: exam1.section,
							specimen: perSpecimen.specimen,
							contents: exam2.contents
						});
					});
				});
			});

			panelRef.push(panelModel);
		});

		this.setState({ panelRef });
	}

	populatePanels = () => {
		const { panelRef, selectedExams } = this.state;


		const panels = panelRef.map(ipanelRef => { 
			let isDisabled = false;
			// Check selected exams if it is present in the ipanelRef
			// then set selected if its true
			const isSelected = selectedExams.some(selectedExam => {
				const { selectedPanel } = selectedExam;

				return selectedPanel && ipanelRef.panelID === selectedPanel.panelID;
			});
			
			if(isSelected === false) {
				// Check selected exams if it is present in the ipanelRef's exams
				// then set disabled if its true
				isDisabled = selectedExams.some(selectedExam => {
					return ipanelRef.exams.some(exam => {
						if(selectedExam.examID === exam.examID)
							return true;

						return false
					});
				});
			}

			return {
				panelID: ipanelRef.panelID,
				panelCode: ipanelRef.panelCode,
				panelName: ipanelRef.panelName,
				isSelected,
				isDisabled
			};
		});

		this.setState({ panels }); 
	}

	updateSelectedSection = ({ sectionID, sectionName, sectionCode }) => {
		this.setState({ selectedSection: { sectionID, sectionName, sectionCode }});
	}

	updateSelectedSpecimen = ({ specimenID, specimenName }) => {
		this.setState({ selectedSpecimen: { specimenID, specimenName }});
	}

	// Note. This function is use to update the isSelected state of the exam tag 
	updateExam = ({ examID, isSelected }) => {
		const { exams } = this.state;
		const updatedExams = exams.map(item => {
			if(item.examID === examID) 
				return { ...item, isSelected };
			
			return item;
		});

		this.setState({ exams: updatedExams });
	}

	// Note. This function is use to update the isSelected state of the panel tag 
	updatePanel = ({ panelID, isSelected }) => {
		const { panels } = this.state;

		const updatedPanels = panels.map(item => {
			if(item.panelID === panelID) 
				return { ...item, isSelected };
			
			return item;
		});

		this.setState({ panels: updatedPanels });
	}

	// Note. This function is use to add the selected exam from list
	// the list of exams table (left) into selected exams table (right).
	// Used when selecting panel
	addSelectedExamByPanel = ({ panelID }) => {
		const { panelRef, selectedContents } = this.state;
		const selectedPanel = panelRef.find(item => item.panelID === panelID);
		let newSelectedContents = []; 

		selectedPanel.exams.forEach(exam => {
			this.addSingleExam({
				examID: exam.examID, 
				examName: exam.examName, 
				examCode: exam.examCode, 
				selectedSection: exam.section, 
				selectedSpecimen: exam.specimen,
				selectedPanel: {
					panelID: selectedPanel.panelID,
					panelName: selectedPanel.panelName,
					panelCode: selectedPanel.panelCode,
				},
				isDisabled: true
			});
			
			// Append selectedContents into one array
			newSelectedContents = newSelectedContents.concat(exam.contents);
		});

		this.setState({ 
			selectedContents: newSelectedContents.concat(selectedContents), 
			selectedContentsByPanel: newSelectedContents 
		});
	}

	// Note. This function is use to add the selected exam from list
	// the list of exams table (left) into selected exams table (right).
	// Used when selecting exam
	addSelectedExamByExam = ({ examID, examName, examCode, contents }) => {
		const { selectedSection, selectedSpecimen, selectedContents } = this.state;
		const isExistingContent = selectedContents.some(iContent => contents.includes(iContent));
		const newSelectedContents = selectedContents.map(item => item); // Clone selectedContents
		
		// Add selectedContent to the array of selectedContent(s)
		if(!isExistingContent)
			newSelectedContents.push(...contents);


		this.setState({ selectedContents: newSelectedContents }, () => {
			// eslint-disable-next-line no-shadow
			const { exams, selectedContents } = this.state;
			
			// Note. Disable exams that is in the selectedContents
			const newExams = exams.map(exam => {
				const isDisabled = selectedContents.some(item => {
					return exam.contents.includes(item) && exam.examID !== examID && !exam.isSelected
				});
				
				return { 
					...exam, 
					// Note. Do not enable if already disabled, This is for SelectByPanel Rule
					isDisabled: exam.isDisabled ? exam.isDisabled : isDisabled  
				};
			});

			this.setState({ exams: newExams });
		});

		this.addSingleExam({ examID, examName, examCode, selectedSection, selectedSpecimen });
	}

	// Note. This function is use to append single exam to the exam state
	// Private function
	addSingleExam = (exam) => {
		const { examID, selectedPanel = null } = exam;
		
		// Note. DO NOT MUTATE THE STATE OBJECT!
		// You will have a nightmare if you do.
		this.setState(state => {
			const { selectedExams } = state;
			const isExistingExam = selectedExams.some(iExam => iExam.examID === examID);
			const newSelectedExams = JSON.parse(JSON.stringify(selectedExams)); // Clone selectedExams
			
			if(!isExistingExam) 
				newSelectedExams.push({ ...exam, selectedPanel });
			
			return { selectedExams: newSelectedExams };
		});
	}
	
	clearExams = () => { 
		this.setState({ exams: [] }); 
	}

	clearPanels = () => { 
		this.setState({ panels: [] }); 
	}

	// Note. This function is use for removing many exams 
	// from the selected exams table(right).
	// Used when unselecting panel
	removeSelectedExamByPanel = ({ panelID }) => {
		const { selectedExams, selectedContentsByPanel, selectedContents } = this.state
		
		const filteredExams = selectedExams.filter(item => {
			if(item.selectedPanel == null) return true;
			
			return !(item.selectedPanel && item.selectedPanel.panelID === panelID); 
		});

		const filteredContents = selectedContents.filter(a => {
			return !selectedContentsByPanel.some(b => a === b);
		});

		this.setState({ 
			selectedExams: filteredExams, 
			selectedContents: filteredContents,
			selectedContentsByPanel: []	
		});
	}

	// Note. This function is use for removing single exam 
	// from both tables(left and right).
	// Used when unselecting exam from both tables(left and right).
	removeSelectedExamByExam = ({ examID }) => {
		const { exams, selectedExams, selectedSection, selectedContents } = this.state;
		const { sectionCode } = selectedSection;
		const targetExam = exams.find(exam => examID === exam.examID);

		const newState = {
			selectedExams: selectedExams.filter(item => item.examID !== examID),
			selectedContents: selectedContents.filter(item => {
				if(targetExam)
					return !targetExam.contents.includes(item);

				return false;	
			})
		};


		this.setState(newState, () => {
			if(sectionCode !== 'panel' && sectionCode !== null)
				this.unselectExams([{ examID }]);
		});
	}

	removeAllExams = () => {
		const { exams } = this.state;

		this.setState({ selectedExams: [], selectedContents: [] }, () => {
			this.unselectExams(exams);
		});
	}

	// Note. This function is use to unselect exam list table(left)
	// when removing exam from selected exam table(right).
	// Private function
	unselectExams = (unselectedExams) => {
		const { exams, selectedContents, selectedExams } = this.state;

		const processedExams = exams.map(exam => { 
			// Check if current exam is in the unselected exams
			const isExistInUExam = unselectedExams.some(uexam => exam.examID === uexam.examID);
			const isExistInContents = selectedContents.some(selContent => {
				return exam.contents.includes(selContent);
			});
			const isInSelectedPanel = selectedExams.some(selExam => {
				return exam.examID === selExam.examID && selExam.selectedPanel !== null
			});
			const isSelectedExam = selectedExams.some(selExam => exam.examID === selExam.examID);
			const isDisabled = (isExistInContents && !isSelectedExam) || isInSelectedPanel; 

			if(isExistInUExam) 
				return { ...exam, isSelected: false, isDisabled };

			return { ...exam, isDisabled };
		});

		this.setState({ exams: processedExams });
	}

	displayLoading = (isLoading) => {
		this.setState({ isLoading });
	}

	render() {
		const { 
			selectedExams, 
			selectedContents, 
			selectedContentsByPanel,
			selectedSection, 
			exams, 
			panels, 
			isLoading 
		} = this.state;
		const { restriction } = this;
		const { requestType } = this.props;
		const moduleTitle = (sessionStorage.getItem('REQUEST_TYPE') === requestTypes.create) ? moduleTitles.create : moduleTitles.edit;

		if(restriction.hasAccess) {
			return (
				<div>
					<PageTitle pageTitle={moduleTitle} />
					<Tracker 
						active={2}
						requestType={requestType}
					/>
					{ isLoading && <Loading /> }
					<div style={{ display: isLoading ? 'none' : 'block' }}>
						<Row gutter={48} style={{ marginTop: 50 }}>
							<Col {...ColLayout}>
								<SectionHeader 
									populateExams={this.populateExams} 
									populatePanels={this.populatePanels}
									populatePanelRef={this.populatePanelRef}
									updateSelectedSpecimen={this.updateSelectedSpecimen}
									updateSelectedSection={this.updateSelectedSection}
									clearExams={this.clearExams}
									clearPanels={this.clearPanels}
									displayLoading={this.displayLoading}
								/>
								<SectionContent 
									exams={exams}
									panels={panels}
									selectedSection={selectedSection}
									addSelectedExamByExam={this.addSelectedExamByExam} 
									addSelectedExamByPanel={this.addSelectedExamByPanel}
									removeSelectedExamByExam={this.removeSelectedExamByExam} 
									removeSelectedExamByPanel={this.removeSelectedExamByPanel}
									updateExam={this.updateExam}
									updatePanel={this.updatePanel}
								/>
							</Col>
							<Col {...ColLayout}>
								<SelectTable 
									selectedExams={selectedExams}
									removeSelectedExamByExam={this.removeSelectedExamByExam}
									removeAllExams={this.removeAllExams} 
									populatePanels={this.populatePanels}
								/>
							</Col>
						</Row>
					</div>
					<Navigation 
						selectedExams={selectedExams}
						selectedContents={selectedContents}
						selectedPanelContents={selectedContentsByPanel}
						disabled={selectedExams.length === 0}
					/>
				</div>
			);
		}

		return restriction.redirect();
	}
}

SelectStep.propTypes = {
	requestType: PropTypes.string
};

SelectStep.defaultProps = {
	requestType: ''
};

export default SelectStep;
