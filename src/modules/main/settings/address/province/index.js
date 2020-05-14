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
			loading: false
	};
	
	componentDidMount() {
		this.populateProvince();
	}
 
	populateProvince = () => {
		this.setState({ loading: true }, async () => {
			const provinceListResponse = await provinceListAPI();

			this.setState({ 
				loading : false,
				provinceList: provinceListResponse
			});
		});
	}

	render(){
		const { form, placeholder, selectedProvince, disabled, onChange } = this.props;
		const { getFieldDecorator } = form;
		const { provinceList, loading } = this.state;
		
		const provinceSelections = (
			getFieldDecorator('provinces', { 
				rules: FIELD_RULES,
				initialValue: provinceList.length === 0 ? null : selectedProvince
			})(
				<Select
					loading={loading}
					placeholder={placeholder}
					onChange={onChange}
					allowClear
				>
					{provinceList.map((item) => (
						<Option value={item.provinceCode} key={item.provinceCode}>
							{item.provinceName}
						</Option>
					))}
				</Select>
			)
		);

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
	placeholder: PropTypes.string.isRequired,
	selectedProvince: PropTypes.string,
	disabled: PropTypes.bool,
};

ProvinceListComponent.defaultProps = {
	selectedProvince: null,
	disabled: false,
}


export default ProvinceListComponent;
  