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
	
	componentDidMount() {
		this.fetchAndUpdateValues();
	}

	componentDidUpdate(prevProps) {
		const { provinceValue } = this.props;

		if(prevProps.provinceValue !== provinceValue){

			this.fetchAndUpdateValues();
		}
	}

	fetchAndUpdateValues = () => {
		const { provinceValue, selectedCity, form } = this.props;
		const { setFieldsValue } = form;

		this.setState({ loading: true }, () => {
			const timer = setTimeout(async () => {
				const cityListResponse = provinceValue ? await cityListAPI(provinceValue) : [];

				this.setState({ loading: false, cityList: cityListResponse }, () => {
					setFieldsValue({ city: selectedCity });
				});

				clearTimeout(timer);
			}, 300);
		});
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
						initialValue: cityList.length === 0 ? null : selectedCity
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
  