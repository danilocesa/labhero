import React from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';
import { 
	SECTION_ALL, 
	SECTION_HEMA, 
	SECTION_CHEM, 
	SECTION_IMMU, 
	SECTION_MICR 
} from '../../constants';

import './section_header.css';

class SectionHeader extends React.Component {
	onChange = (event) => {
		const { handleChange } = this.props;

		handleChange(event.target.value);
	}
	
	render() {
		return (
			<div className="section-group">
				<Radio.Group 
					defaultValue={SECTION_ALL}
					buttonStyle="solid"
					onChange={this.onChange}
				>
					<Radio.Button value={SECTION_ALL}>
						PANEL
					</Radio.Button>
					<Radio.Button value={SECTION_HEMA}>
						HEMATOLOGY
					</Radio.Button>
					<Radio.Button value={SECTION_CHEM}>
						CHEMISTRY
					</Radio.Button>
					<Radio.Button value={SECTION_IMMU}>
						IMMUNOLOGY
					</Radio.Button>
					<Radio.Button value={SECTION_MICR}>
						MICROSCOPY
					</Radio.Button>
				</Radio.Group>
			</div>
		);
	}
}

SectionHeader.propTypes = {
	handleChange: PropTypes.func.isRequired
}

export default SectionHeader;
