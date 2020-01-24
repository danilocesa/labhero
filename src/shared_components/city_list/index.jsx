// LIBRARY
import React from "react";
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';

// CUSTOM
import { cityListAPI } from 'services/shared/address';
import { FIELD_RULES, LABEL_TITLE } from './settings';

const { Option } = Select;

class CityListComponent extends React.Component { 

	constructor(props){
		super(props);
		this.state = {
			cityList: [],
			loading: true,
			prevProvince: this.props.provinceValue
		};
	}
	
	// shouldComponentUpdate(props, state){
	// 	const {form} = this.props;
	// 	const {getFieldsValue} = form;

	// 	if(getFieldsValue().provinces !== state.newProvinceCode){
	// 		console.log('TCL->', state);
	// 		this.setState({ newProvinceCode: getFieldsValue().provinces, cityValue: ''});
	// 	}
	// 	return true;
	// }

	componentDidUpdate(props){
		const { provinceValue } = this.props;

		if(props.provinceValue !== provinceValue && provinceValue !== ''){
			this.populateCity(provinceValue);
		}
	}

	populateCity = async (provinceCode) => {
		const cityListResponse = await cityListAPI(provinceCode);
		this.setState({
			loading:false,
			cityList: cityListResponse,
		});
	}

	render(){
		const { form, selectDefaultOptions, provinceValue,  selectedCity} = this.props;
		const { getFieldDecorator, getFieldsValue } = form;
		const { cityList, loading } = this.state;
		// const cityValue = (provinceValue === getFieldsValue().provinces) ? '' : selectedCity;
		// console.log('cityValue-> rerender');

		const citySelections = (
			cityList.length > 0 && !loading ? (
				getFieldDecorator('city', { 
					rules: FIELD_RULES,
					initialValue: selectedCity
				})(
					<Select
						loading={loading}
						placeholder={selectDefaultOptions}
						allowClear
					>
						{cityList.map((item) => (
							<Option value={item.cityMunicipalityCode} key={item.cityMunicipalityCode}>
								{item.cityMunicipalityName}
							</Option> 
						))}
					</Select>
				)
			) : (	
				<Select placeholder={selectDefaultOptions} disabled />
			)	
		)

		return (
			<Form.Item label={LABEL_TITLE} className="gutter-box">
				<div className="treeselect-address">
					{citySelections}
				</div>
			</Form.Item>
		);
	}
}

CityListComponent.propTypes = {
	form : PropTypes.object.isRequired,
	selectDefaultOptions: PropTypes.string.isRequired,
	provinceValue: PropTypes.string,
	selectedCity: PropTypes.string
};

CityListComponent.defaultProps = {
	provinceValue: null,
	selectedCity: null
}

export default CityListComponent;
  