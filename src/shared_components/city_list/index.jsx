// LIBRARY
import React from "react";
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';

// CUSTOM
import errorMessage from 'global_config/error_messages';
import { cityListAPI } from 'services/shared/address';

const { Option } = Select;

class CityList extends React.Component { 

	constructor(props){
		super(props);
		this.state = {
			cityList: [],
			loading: false,
		};
	}
	
	componentDidUpdate(prevProps){
		const { provinceValue, selectedCity, form } = this.props;
		const { setFieldsValue } = form;
		
		if(prevProps.provinceValue !== provinceValue && provinceValue !== '' && provinceValue !== null){
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ loading: true } , async () => {
				const cityListResponse = await cityListAPI(provinceValue);

				this.setState({ loading:false, cityList: cityListResponse }, () => {
					setFieldsValue({ city: selectedCity });
				});
			});
		}
	}


	render(){
		const { form, placeholder, selectedCity, onChange, disabled } = this.props;
		const { getFieldDecorator } = form;
		const { cityList, loading } = this.state;
		const isDisabled = disabled || cityList.length < 1;

		return (
			<Form.Item label="CITY" className="gutter-box">
				<div className="treeselect-address">
					{getFieldDecorator('city', { 
						rules: [{ 
							required: !isDisabled, 
							message: errorMessage.required
						}],
						initialValue: selectedCity
					})(
						<Select
							loading={loading}
							placeholder={placeholder}
							allowClear
							disabled={isDisabled}
							onChange={onChange}
						>
							{cityList.map((item) => (
								<Option value={item.cityMunicipalityCode} key={item.cityMunicipalityCode}>
									{item.cityMunicipalityName}
								</Option> 
							))}
						</Select>
					)}
				</div>
			</Form.Item>
		);
	}
}

CityList.propTypes = {
	form : PropTypes.object.isRequired,
	placeholder: PropTypes.string.isRequired,
	provinceValue: PropTypes.string,
	selectedCity: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool
};

CityList.defaultProps = {
	provinceValue: null,
	selectedCity: null,
	disabled: false
}

export default CityList;
  