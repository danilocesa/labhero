// LIBRARY
import React from "react";
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';

// CUSTOM
import errorMessage from 'global_config/error_messages';
import { townListAPI } from 'services/shared/address';

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
		const { selectedTown, form, cityValue } = this.props;
		const { setFieldsValue } = form;

		this.setState({ loading: true }, async () => {
			const townListResponse = (cityValue) ? await townListAPI(cityValue) : [];

			this.setState({ loading: false, townList: townListResponse }, () => {
				setFieldsValue({ town: selectedTown });
			});
		});
	}

	render(){
		const { form, placeholder, disabled } = this.props;
		const { getFieldDecorator } = form;
		const { townList, loading } = this.state;
		const isDisabled = disabled || townList.length < 1;

		return (
			<Form.Item label="BARANGAY" className="gutter-box">
				<div className="treeselect-address">
					{getFieldDecorator('town', { 
						rules: [{
							required: !isDisabled,
							message: errorMessage.required
						}] 
					})(	
						<Select
							loading={loading}
							placeholder={placeholder}
							disabled={isDisabled}
							allowClear
						>
							{townList.map((item) => (
								<Option value={item.townCode} key={item.townCode}>
									{item.townName.toUpperCase()}
								</Option>
							))}
						</Select>
					)}
				</div>
			</Form.Item>
		);
	}
}

TownList.propTypes = {
	form : PropTypes.object.isRequired,
	placeholder: PropTypes.string.isRequired,
	cityValue: PropTypes.string,
	selectedTown: PropTypes.string,
	disabled: PropTypes.bool
};

TownList.defaultProps = {
	cityValue: null,
	selectedTown: null,
	disabled: false
}


export default TownList;
  