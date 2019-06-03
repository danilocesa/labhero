import React from 'react';
import { Row, Col } from 'antd';

import axiosCall from 'services/axiosCall';
import Message from 'shared_components/message';
import PageTitle from '../../title';
import Tracker from '../../tracker';
import SectionHeader from './section_header';
import SectionContent from './section_content';
import SelectTable from './table';
import Navigation from './navigation';

import { 
	SECTIONS, 
	SECTION_ALL, 
	SECTION_HEMA, 
	SECTION_CHEM, 
	SECTION_IMMU, 
	SECTION_MICR,
	CLR_TESTS 
} from '../constants';

const ColLayout = {
	sm: { span: 24 },
	md: { span: 12 },
	lg: { span: 12 },
};

class SelectStep extends React.Component {
	state = {
		selectedSection: SECTION_ALL,
		displayedTests: SECTIONS.all.tests,
		selectedTests: []
	};

	componentDidMount() {
		const tests = sessionStorage.getItem(CLR_TESTS);

		if(tests) {
			this.setState({ selectedTests: JSON.parse(tests) });
		}

		this.fetchPanelExam();
	}

	onChangeHeader = (section) => {
		let selected = null;

		if(section === SECTION_ALL)
			selected = SECTIONS.all.tests

		if(section === SECTION_CHEM)
			selected = SECTIONS.chemistry.tests	

		if(section === SECTION_HEMA)	
			selected = SECTIONS.hematology.tests	

		if(section === SECTION_IMMU)	
			selected = SECTIONS.hematology.tests		
		
		if(section === SECTION_MICR)
			selected = SECTIONS.microscopy.tests	

		if(selected) {
			this.setState({ 
				displayedTests: selected,
				selectedSection: section
			});	
		}
	}

	addTest = ({id, exam}) => {
		const { selectedSection, selectedTests } = this.state;

		const existing = selectedTests.some(i => i.key === id);

		if(!existing) {
			selectedTests.push({ 
				key: id,
				section: selectedSection,
				exam
			});

			this.setState({selectedTests});
		}	
	}

	removeTest = (id) => {
		const { selectedTests } = this.state;

		this.setState({
			selectedTests: selectedTests.filter(item => {

				return item.key !== id;
			})
		});
	}

	removeAllTest = () => {
		this.setState({
			selectedTests: []
		});
	}

	fetchPanelExam = async () => {
		try {
			const url = `/PanelExamRequesting`;

			const response = await axiosCall({ method: 'GET', url });
			const { data } = await response;

			console.log('data', data);
		}
		catch(e) {
			Message.error();
		}
	}

	render() {
		const { displayedTests, selectedTests } = this.state;

		return (
			<div>
				<PageTitle />
				<Tracker active={2} />
				<Row gutter={48} style={{ marginTop: 50 }}>
					<Col {...ColLayout}>
						<SectionHeader handleChange={this.onChangeHeader} />
						<SectionContent 
							tests={displayedTests} 
							addTest={this.addTest} 
							removeTest={this.removeTest} 
						/>
					</Col>
					<Col {...ColLayout}>
						<SelectTable 
							tests={selectedTests}
							removeTest={this.removeTest}
							removeAllTest={this.removeAllTest} 
						/>
					</Col>
				</Row>
				<br />
				<Navigation 
					tests={selectedTests}
					disabled={selectedTests.length === 0}
				/>
			</div>
		);
	}
}

export default SelectStep;
