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
		const { provinceValue } = this.props;

		this.setState({ loading: true }, () => {
			const timer = setTimeout(async () => {
				const cityListResponse = provinceValue ? await cityListAPI(provinceValue) : [];

				this.setState({ loading: false, cityList: cityListResponse });

				clearTimeout(timer);
			}, 300);
		});
	}


	render(){
		const { placeholder, onChange, disabled } = this.props;
		const { cityList, loading } = this.state;
		const isDisabled = disabled || cityList.length < 1;

		return (
			<Form.Item 
				name="city" 
				label="CITY" 
				rules={[{ 
					required: !isDisabled, 
					message: errorMessage.required
				}]}
			>
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
			</Form.Item>
		);
	}
}

CityList.propTypes = {
	placeholder: PropTypes.string.isRequired,
	provinceValue: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool
};

CityList.defaultProps = {
	provinceValue: null,
	disabled: false
}

export default CityList;
  