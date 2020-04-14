/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { Input, Checkbox, Select, InputNumber } from 'antd';
import { AlphaNumInput, NumberInput } from 'shared_components/pattern_input';
import { 
	EITC_ALPHA_NUMERIC,
	EITC_NUMERIC,
	EITC_CHECKBOX,
	EITC_OPTION,
	EITC_TEXT_AREA 
} from 'global_config/constant-global';


const { Option } = Select;
const { TextArea } = Input;

class DynamicInput extends React.Component {
	render() {
		const { type, itemOptions, isLock, ...otherProps } = this.props;

		if(type === EITC_ALPHA_NUMERIC) {
			return (
				<InputNumber 
					disabled={isLock}
					{...otherProps}
				/>
			);
		}
			
		if(type ===  EITC_NUMERIC) {
			return (
				<NumberInput 
					disabled={isLock} 
					{...otherProps}
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
					{...otherProps}
				/>
			);
		}

		if(type === EITC_OPTION) {
			const Options = itemOptions.map((itemOption, index) => (
				<Option 
					value={itemOption.examItemValueLabel}
					// eslint-disable-next-line react/no-array-index-key
					key={index}
				>
					{itemOption.examItemValueLabel}
				</Option>
			));
			
			const defaultItemOption = itemOptions.find(itemOption => itemOption.examItemValueDefault === 1);
			
			return (
				<Select 
					showSearch
					defaultValue={defaultItemOption && defaultItemOption.examItemValueLabel}
					disabled={isLock}
					optionFilterProp="children"
					filterOption={(input, option) =>
						// @ts-ignore
						option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
					{...otherProps}
				>
					{Options}
				</Select>
			);
		}

		
		if(type === EITC_TEXT_AREA) {
			return (
				<TextArea 
					disabled={isLock} 
					{...otherProps}
				/>
			);
		}
			
		return (
			<Input 
				disabled={isLock} 
				{...otherProps}
			/>
		);
	}
}


DynamicInput.propTypes = {
	type: PropTypes.string.isRequired,
	itemOptions: PropTypes.array,
	isLock: PropTypes.bool
};

DynamicInput.defaultProps = {
	itemOptions: [],
	isLock: false
};

export default DynamicInput;