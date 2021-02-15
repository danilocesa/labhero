import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

import Navigation from './navigation';

class SummaryFooter extends React.Component {
	render() {
		const { saveForCreate, saveForEdit } = this.props;

		return (
			<Row>
				<Col span={16} offset={4}>
					<Row>
						<Col span={12} offset={12}>
							<Navigation 
								saveForCreate={saveForCreate} 
								saveForEdit={saveForEdit}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}
}

SummaryFooter.propTypes = {
	saveForCreate: PropTypes.func.isRequired,
	saveForEdit:  PropTypes.func.isRequired,
}

export default SummaryFooter;
