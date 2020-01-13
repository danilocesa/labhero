// LIBRARY
import React from "react";
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';

// CUSTOM
import { townListAPI } from 'services/shared/address';
import { FIELD_RULES, LABEL_TITLE } from './settings';

const { Option } = Select;

class TownListComponent extends React.Component { 	
	state = {
		townList: [],
		loading: true,
	};

	componentDidMount(){
		if(this.props.cityValue){
			this.populatetown(this.props.cityValue);
		}
	}

	componentDidUpdate(prevProps){
		if(prevProps.cityValue !== this.props.cityValue){
			this.populatetown(this.props.cityValue);
		}
	}

	populatetown = async (cityCode) => {
		const townListResponse = await townListAPI(cityCode);
		this.setState({
			loading:false,
			townList: townListResponse,
		});
	}

	render(){
		const { form, selectDefaultOptions, selectedTown } = this.props;
		const { getFieldDecorator } = form;
		const { townList, loading } = this.state;

		const townSelections = (
			townList.length > 0 && !loading ? 
				(getFieldDecorator('town', { 
					rules: FIELD_RULES,
					initialValue: selectedTown
				})(	
					<Select
						loading={loading}
						placeholder={selectDefaultOptions}
						allowClear
					>
						{townList.map((item) => (
							<Option value={item.townCode} key={item.townCode}>
								{item.townName.toUpperCase()}
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
					{townSelections}
				</div>
			</Form.Item>
		);
	}
}

TownListComponent.propTypes = {
	form : PropTypes.object.isRequired,
	selectDefaultOptions: PropTypes.string.isRequired,
	cityValue: PropTypes.string,
	selectedTown: PropTypes.string
};

TownListComponent.defaultProps = {
	cityValue: null,
	selectedTown: null
}


export default TownListComponent;
  