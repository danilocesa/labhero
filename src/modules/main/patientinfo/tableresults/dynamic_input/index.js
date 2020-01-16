

import React from 'react';
import PropTypes from 'prop-types';
import { Input, Checkbox, Radio   } from 'antd';
import { AlphaNumInput, NumberInput } from 'shared_components/pattern_input';
import { 
	EITC_ALPHA_NUMERIC,
	EITC_NUMERIC,
	EITC_CHECKBOX,
	EITC_OPTION,
	EITC_TEXT_AREA 
} from 'global_config/constant-global';


const { TextArea } = Input;

class DynamicInput extends React.Component {
	render() {
		const { type, itemOptions, unitCode, isLock } = this.props;

		if(type === EITC_ALPHA_NUMERIC) {
			return (
				<AlphaNumInput 
					addonAfter={unitCode} 
					disabled={isLock}
				/>
			);
		}
			
		if(type ===  EITC_NUMERIC) {
			return (
				<NumberInput 
					addonAfter={unitCode} 
					disabled={isLock} 
				/>
			);
		}
			
		if(type === EITC_CHECKBOX) {
			const options = itemOptions.map(itemOption => ({ 
				label: itemOption.examItemValueLabel, 
				value: itemOption.examItemValueLabel
			}));

			const defaultValue = itemOptions.filter(itemOption => itemOption.examItemValueDefault === 1);

			return (
				<Checkbox.Group 
					options={options}
					defaultValue={defaultValue}
					disabled={isLock}
				/>
			);
		}

		if(type === EITC_OPTION) {
			const Options = itemOptions.map(itemOption => ({ 
				label: itemOption.examItemValueLabel, 
				value: itemOption.examItemValueLabel
			}));
			const defaultValue = itemOptions.filter(itemOption => itemOption.examItemValueDefault === 1);

			return (
				<Radio.Group 
					options={Options}
					defaultValue={defaultValue}
					disabled={isLock}
				/>
			);
		}

		if(type === EITC_TEXT_AREA) {
			return (
				<TextArea disabled={isLock} />
			);
		}
			
		return <Input addonAfter={unitCode} disabled={isLock} />;
	}
}


DynamicInput.propTypes = {
	type: PropTypes.string.isRequired,
	itemOptions: PropTypes.array,
	unitCode: PropTypes.string,
	isLock: PropTypes.bool
};

DynamicInput.defaultProps = {
	itemOptions: [],
	unitCode: '',
	isLock: false
};

export default DynamicInput;