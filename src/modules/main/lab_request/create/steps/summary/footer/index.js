import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

import Navigation from './navigation';

class SummaryFooter extends React.Component {
	render() {
		const { saveExams } = this.props;

		return (
			<Row>
				<Col span={16} offset={4}>
					<Row>
						<Col span={12} offset={12}>
							<Navigation saveExams={saveExams} />
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}
}

SummaryFooter.propTypes = {
	saveExams: PropTypes.func.isRequired
}

export default SummaryFooter;
