// LIBRARY
import React from "react";
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';

// CUSTOM
import errorMessage from 'global_config/error_messages';
import { fetchBarangayList } from 'services/blood_bank/donor_registration';

const { Option } = Select;

class TownList extends React.Component { 	
	state = {
		townList: [],
		loading: false
	};

	componentDidMount() {
		this.fetchAndUpdateValues();
	}

	componentDidUpdate(prevProps) {
		const { cityValue } = this.props;
	
		if(prevProps.cityValue !== cityValue) {
			this.fetchAndUpdateValues();
		}
	}

	fetchAndUpdateValues = () => {
		const { cityValue } = this.props;

		this.setState({ loading: true }, async () => {
			const timer = setTimeout(async () => {
				const townListResponse = (cityValue) ? await fetchBarangayList(cityValue) : [];

				this.setState({ loading: false, townList: townListResponse });
				// this.setState({ loading: false, townList: townListResponse }, () => {
				// 	setFieldsValue({ town: townListResponse.length === 0 ? null : selectedTown });
				// });

				clearTimeout(timer);
			}, 600);
		});
	}

	render(){
		const { placeholder, disabled } = this.props;
		const { townList, loading } = this.state;
		const isDisabled = disabled || townList.length < 1;

		return (
			<Form.Item 
				name="town" 
				label="BARANGAY"
				rules={[{
					required: !isDisabled,
					message: errorMessage.required
				}]} 
			>
				<Select
					loading={loading}
					placeholder={placeholder}
					disabled={isDisabled}
					allowClear
				>
					{townList.map((item) => (
						<Option value={item.barangay_id} key={item.brgy_code}>
							{item.brgy_name}
						</Option>
					))}
				</Select>
			</Form.Item>
		);
	}
}

TownList.propTypes = {
	placeholder: PropTypes.string.isRequired,
	cityValue: PropTypes.number,
	disabled: PropTypes.bool
};

TownList.defaultProps = {
	cityValue: null,
	disabled: false
}


export default TownList;
  