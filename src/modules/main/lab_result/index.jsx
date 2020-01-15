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
		tabActiveKey: 'ALL',
		sections: [],
		labResults: [],
		searchResults: []
	};

	async componentDidMount() {
		const sections = await fetchSection();
		this.setState({ sections });
	}

	updateLabResults = (labResults) => {
		this.setState({ labResults, tabActiveKey: 'ALL' });
	}

	onChangeTab = (sectionCode) => {
		const { labResults } = this.state;
		const searchResults = { [sectionCode]: [] };

		labResults.forEach(labResult => {
			const labResultClone = Object.assign({}, labResult);
			const contents = labResult.contents.filter(i => i.sectionCode === sectionCode);
			
			labResultClone.contents = contents;

			if(labResultClone.contents.length > 0)
				searchResults[sectionCode].push(labResultClone);
		});


		console.log(searchResults);
		this.setState({ searchResults, tabActiveKey: sectionCode });
	}

	render() {
		const { sections, labResults, searchResults, tabActiveKey } = this.state;
		const { onClickTableRow, pageTitle } = this.props;
		
		const TabPanes = sections.map(section => (
			<TabPane tab={<span>{section.sectionCode}</span>} key={section.sectionCode}>
				<SearchResultComponent 
					section={section.sectionCode}
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
					<Tabs 
						activeKey={tabActiveKey}
						onChange={this.onChangeTab}
					>
						<TabPane tab={<span>ALL</span>} key="ALL">
							<SearchResultComponent 
								section="all"
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
