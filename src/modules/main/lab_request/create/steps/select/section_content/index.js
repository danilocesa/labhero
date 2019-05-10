import React from 'react';
import PropTypes from 'prop-types';
import { Card, Empty } from 'antd';

import Tag from './tag';

import './section_content.css';

class SectionContent extends React.Component {
	render() {
		const { tests, addTest, removeTest } = this.props;
		const TagList = (
			tests.map((item) => (
				<Tag 
					key={item} 
					id={item} 
					title={item} 
					addTest={addTest}
					removeTest={removeTest} 
				/>
			))
		);

		const EmptyPlaceholder = TagList.length > 0 ? null : (
			<Empty style={{ marginTop: 40 }} />
		);

		return (
			<Card className="test-list">
				{TagList}
				{EmptyPlaceholder}
			</Card>
		);
	}
}

SectionContent.propTypes = {
	tests: PropTypes.arrayOf(PropTypes.string),
	addTest: PropTypes.func.isRequired,
	removeTest: PropTypes.func.isRequired
}

SectionContent.defaultProps = {
	tests: []
}

export default SectionContent;
