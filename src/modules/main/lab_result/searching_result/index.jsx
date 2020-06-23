// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Tabs } from 'antd';
import fetchSection from 'services/shared/section';

import SearchForm from './search_form';
import AllTable from './all_table';
import SectionTable from './section_table';

const { TabPane } = Tabs;

class SearchResult extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			tabActiveKey: 'ALL',
			sections: [],
			labResults: [],
			searchResults: [],
		};
		this.searchFormRef = React.createRef();
	}

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
			
			const contents = labResult.contents.filter(i => i.sectionCode === sectionCode);
			
			if(contents.length > 0) {
				contents.forEach(content => {
					const labResultClone = Object.assign({}, labResult);
					labResultClone.contents = content;

					searchResults[sectionCode].push(labResultClone);
				});
			}
		});


		this.setState({ searchResults, tabActiveKey: sectionCode });
	}

	refreshTable = () => {
		// @ts-ignore
		this.searchFormRef.current.search();
	}

	render() {
		const { sections, labResults, searchResults, tabActiveKey } = this.state;
		const { onClickTableRow, pageTitle, onClickPrint } = this.props;
		
		const TabPanes = sections.map(section => (
			<TabPane tab={<span>{section.sectionCode}</span>} key={section.sectionCode}>
				<SectionTable 
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
						ref={this.searchFormRef}
						pageTitle={pageTitle}
						updateLabResults={this.updateLabResults} 
					/>
					<Tabs 
						activeKey={tabActiveKey}
						onChange={this.onChangeTab}
					>
						<TabPane tab={<span>ALL</span>} key="ALL">
							<AllTable 
								section="all"
								labResults={labResults} 
								onClickTableRow={onClickTableRow}
								onClickPrint={onClickPrint}
							/>
						</TabPane>
						{ TabPanes }
					</Tabs>
		    </Col>
	    </Row>
    );
  }
}

SearchResult.propTypes = {
	pageTitle: PropTypes.string.isRequired,
	onClickTableRow: PropTypes.func.isRequired,
	onClickPrint: PropTypes.func.isRequired,
}

export default SearchResult;
