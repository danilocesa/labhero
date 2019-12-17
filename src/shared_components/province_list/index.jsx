// LIBRARY
import React from "react";
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';

// CUSTOM
import { provinceListAPI } from 'services/shared/address';
import { FIELD_RULES, LABEL_TITLE } from './settings';

const { Option } = Select;

class ProvinceListComponent extends React.Component { 
	state = {
			provinceList: [],
			loading: true
	};
	
	componentDidMount() {
		this.populateProvince();
	}
 
	populateProvince = async () => {
		const provinceListResponse = await provinceListAPI();
		this.setState({ 
			loading : false,
			provinceList: provinceListResponse
		});
	}

	render(){
		const { form, selectDefaultOptions, selectedProvince } = this.props;
		const { getFieldDecorator } = form;
		const { provinceList, loading } = this.state;
		
		const provinceSelections = (
			provinceList.length > 0 && !loading ? 
				(getFieldDecorator('provinces', { 
					rules: FIELD_RULES,
					initialValue: selectedProvince
				})(
					<Select
						loading={loading}
						placeholder={selectDefaultOptions}
					>
						{provinceList.map((item) => (
							<Option value={item.provinceCode} key={item.provinceCode}>
								{item.provinceName}
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
					{provinceSelections}
				</div>
			</Form.Item>
		);
	}
}

ProvinceListComponent.propTypes = {
	form : PropTypes.object.isRequired,
	selectDefaultOptions: PropTypes.string.isRequired,
	selectedProvince: PropTypes.string
};

ProvinceListComponent.defaultProps = {
	selectedProvince: null
}


export default ProvinceListComponent;
  