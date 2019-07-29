import React from 'react';
import Message from 'shared_components/message';
import axiosCall from 'services/axiosCall';
import DropDown from '../shared/dropdown';

class SectionDropdown extends React.Component {
	state = {
		sections: []
	};

	async componentDidMount() {
		const apiResponse = await this.fetchSection()
		const sections = apiResponse.map(section => ({
			label: section.sectionCode,
			value: section.sectionCode
		}));

		console.log(sections);
		this.setState({ sections });
	}

	fetchSection = async() => {
		let sections = [];

		try {
			const url = `/ExamResult`;

			const response = await axiosCall({ method: 'GET', url });
			const { data } = await response;

			sections = data;
		} catch (e) {
			Message.error();
		}

		return sections;
	}
	
	render() {
		const { sections } = this.state;

		return (
			<DropDown 
				size="small"
				label="SECTION"
				placeholder="Filter by SERUM"
				content={sections} 
			/>
		);
	}
}

export default SectionDropdown;