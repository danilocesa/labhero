// LIBRARY
import React from "react";
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';

// CUSTOM
import { provinceListAPI } from 'services/shared/address';
import { 
	// FIELD_RULES, 
	LABEL_TITLE 
} from './settings';

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
		const { placeholder, disabled, onChange } = this.props;
		const { provinceList, loading } = this.state;
		
		return (
			<Form.Item 
				name="provinces"
				label={LABEL_TITLE} 
			>
				<Select
					loading={loading}
					placeholder={placeholder}
					disabled={disabled}
					onChange={onChange}
					allowClear
					style={{ width: '100%' }}
				>
					{provinceList.map((item) => (
						<Option value={item.provinceCode} key={item.provinceCode}>
							{item.provinceName}
						</Option>
					))}
				</Select>
			</Form.Item>
		);
	}
}

ProvinceListComponent.propTypes = {
	placeholder: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
};

ProvinceListComponent.defaultProps = {
	disabled: false,
}


export default ProvinceListComponent;
  