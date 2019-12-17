// LIBRARY
import React from "react";
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';

// CUSTOM
import { cityListAPI } from 'services/shared/address';
import { FIELD_RULES, LABEL_TITLE } from './settings';

const { Option } = Select;

class CityListComponent extends React.Component { 
	state = {
		cityList: [],
		loading: true
	};	
	
	componentDidMount(){
		if(this.props.provinceValue){
			this.populateCity(this.props.provinceValue);
		}
	}

	componentDidUpdate(prevProps){
		if(prevProps.provinceValue !== this.props.provinceValue){
			this.populateCity(this.props.provinceValue);
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
		const { form, selectDefaultOptions, selectedCity } = this.props;
		const { getFieldDecorator } = form;
		const { cityList, loading } = this.state;

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
  