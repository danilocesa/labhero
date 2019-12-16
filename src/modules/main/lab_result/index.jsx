// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Tabs } from 'antd';
import fetchSection from 'services/shared/section';

import SearchForm from './search_form';
import SearchResultComponent from './search_result';


const { TabPane } = Tabs;

class LabResult extends React.Component {
	
	state = {
		sections: [],
		labResults: [],
		searchResults: []
	};

	async componentDidMount() {
		const sections = await fetchSection();
		this.setState({ sections });
	}

	updateLabResults = (labResults) => {
		const { sections } = this.state;
		const searchResults = {};

		sections.forEach(section => {
			Object.assign(searchResults, { [section.sectionCode]: [] });
		});

		labResults.forEach(labResult => {
			labResult.contents.forEach(content => {
				// Clone labResult object
				const item = Object.assign({}, labResult);
				// Replace content property with a single content object
				item.contents = [content];
				// Append each content to designated section
				searchResults[content.sectionCode].push(item);
			});
		});

		this.setState({ labResults, searchResults });
	}

	

	render() {
		const { sections, labResults, searchResults } = this.state;
		const { onClickTableRow, pageTitle } = this.props;
		
		const TabPanes = sections.map(section => (
			<TabPane tab={<span>{section.sectionCode}</span>} key={section.sectionID}>
				<SearchResultComponent 
					labResults={searchResults[section.sectionCode] || []} 
					onClickTableRow={onClickTableRow}
				/>
			</TabPane>
		));
		
    return (
	    <Row type="flex" align="middle" justify="center">
		    <Col xs={24}>
					<SearchForm 
						pageTitle={pageTitle}
						updateLabResults={this.updateLabResults} 
					/>
					<Tabs defaultActiveKey="1">
						<TabPane tab={<span>ALL</span>} key="all">
							<SearchResultComponent 
								labResults={labResults} 
								onClickTableRow={onClickTableRow}
							/>
						</TabPane>
						{ TabPanes }
					</Tabs>
		    </Col>
	    </Row>
    );
  }
}

LabResult.propTypes = {
	pageTitle: PropTypes.string.isRequired,
	onClickTableRow: PropTypes.func.isRequired
}

export default LabResult;
