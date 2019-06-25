import React from 'react';
import { Row, Col, Spin } from 'antd';

import Restriction from '../clr_restriction';
import PageTitle from '../../title';
import Tracker from '../../tracker';
import SectionHeader from './section_header';
import SectionContent from './section_content';
import SelectTable from './table';
import Navigation from './navigation';

import { CLR_SEL_EXAMS } from '../constants';

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

		if(exams) {
			this.setState({ selectedExams: JSON.parse(exams) });
		}
	}

	populateExams = (exams) => {
		const { selectedExams } = this.state;

		const processedExams = exams.map(exam => { 
			const isSelected = selectedExams.some(item => exam.examCode === item.examCode);
			const isDisabled = selectedExams.some(item => {
				if(item.examID === exam.examID && item.selectedPanel !== null)
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
							specimen: perSpecimen.specimen
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
		const { panelRef } = this.state;
		const selectedPanel = panelRef.find(item => item.panelID === panelID);
		
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
		});
	}

	// Note. This function is use to add the selected exam from list
	// the list of exams table (left) into selected exams table (right).
	// Used when selecting exam
	addSelectedExamByExam = ({ examID, examName, examCode }) => {
		const { selectedSection, selectedSpecimen } = this.state;

		this.addSingleExam({ examID, examName, examCode, selectedSection, selectedSpecimen });
	}

	// Note. This function is use append single exam to the exam state
	// Private function
	addSingleExam = (exam) => {
		const { examID, selectedPanel = null } = exam;
		
		// Note! DO NOT MUTATE THE STATE OBJECT!
		// You will have a nightmare if you do.
		this.setState(state => {
			const { selectedExams } = state;
			const existing = selectedExams.some(item => item.examID === examID);
			const newSelectedExams = JSON.parse(JSON.stringify(selectedExams));

			if(!existing) 
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
		const { selectedExams } = this.state
		const filteredExams = selectedExams.filter(item => {
			if(item.selectedPanel && item.selectedPanel.panelID !== panelID)
				return true;

			return false;
		});

		this.setState({ selectedExams: filteredExams });
	}

	// Note. This function is use for removing single exams 
	// from both tables(left and right).
	// Used when unselecting exam from both tables(left and right).
	removeSelectedExamByExam = ({ examID }) => {
		const { selectedExams, selectedSection } = this.state;
		const { sectionCode } = selectedSection;
		const newState = {
			selectedExams: selectedExams.filter(item => item.examID !== examID)
		};

		this.setState(newState, () => {
			if(sectionCode !== 'panel' && sectionCode !== null)
				this.unselectExams([{ examID }]);
		});
	}

	removeAllExams = () => {
		const { exams } = this.state;

		this.setState({ selectedExams: [] });

		this.unselectExams(exams);
	}

	// Note. This function is use to unselect exam list table(left)
	// when removing exam from selected exam table(right).
	// Private function
	unselectExams = (unselectedExams) => {
		const { exams } = this.state;

		const processedExams = exams.map(exam => { 
			// Check if current exam is in the unselected exams
			const isExisting = unselectedExams.some(uexam => exam.examID === uexam.examID);
			
			if(isExisting) return { ...exam, isSelected: false };

			return exam;
		});

		this.setState({ exams: processedExams });
	}

	displayLoading = (isLoading) => {
		this.setState({ isLoading });
	}

	render() {
		const { selectedExams, selectedSection, exams, panels, isLoading } = this.state;
		const { restriction } = this;

		if(restriction.hasAccess) {
			return (
				<div>
					<PageTitle />
					<Tracker active={2} />
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
						disabled={selectedExams.length === 0}
					/>
				</div>
			);
		}

		return restriction.redirect();
	}
}

export default SelectStep;
