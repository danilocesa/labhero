// LiBRARY
import React from 'react';
import { 
  Drawer,
  Row as AntRow, 
  Col as AntCol, 
  Form as AntForm, 
  Input as AntInput, 
  Button as AntButton,
  Table as AntTable,
  Select
} from 'antd';

import {
	// Exam Item Type Codes
	EITC_ALPHA_NUMERIC,
	EITC_NUMERIC,
	EITC_CHECKBOX,
	EITC_OPTION,
	EITC_TEXT_AREA,
} from 'global_config/constant-global';
import { AlphaNumInput } from 'shared_components/pattern_input';

// CUSTOM MODULES
import DynamicForm from '../dynamic_form';
import getUnitOfMeasures from 'services/settings/unitOfMeasure';
import getInputTypeCode from 'services/settings/inputType';
//  CONSTANTS
const { Option } = Select;



class InventoryCategoriesTemplate extends React.Component {
  constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			selectedRsType: null,
			unitOfMeasures: [],
			inputTypeCodes: []
		}

  }
  async componentDidMount() {
		const unitOfMeasures = await getUnitOfMeasures();
		const inputTypeCodes = await getInputTypeCode();
		
		this.setState({ unitOfMeasures, inputTypeCodes });
	}
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  displayDrawerUpdate = (record) => {
		this.setState({
			isDrawerVisible: true,
			drawerTitle: "UPDATE QUESION",
			drawerButton: "UPDATE",
			panelInfo: record
		});
  }
  onChangeItemTypeCode = (itemTypeCode) => {
		const { setFieldsValue } = this.props.form;

		if(itemTypeCode === EITC_NUMERIC)
			setFieldsValue({ examItemTypeDefault: '' });

		this.setState({ selectedRsType: itemTypeCode });
	}
  onClose = () => {
		this.setState({
			isDrawerVisible: false,
		});
	};

  render() {
    const {  selectedRsType, unitOfMeasures, inputTypeCodes } = this.state;
    
		const InputTypeCodeOptions = inputTypeCodes.map(typeCode => (
			<Option value={typeCode.inputTypeCode} key={typeCode.inputTypeCode}>
				{typeCode.inputTypeName}
			</Option>
    ));
    const UnitMeasureOptions = unitOfMeasures.map(unit => {
			return (
				<Option value={unit.unitOfMeasureCode} key={unit.unitOfMeasureCode}>
					{`${unit.unitOfMeasureCode} - ${unit.unitOfMesureBase}`}
				</Option>
			);
		});
    return ( 
			<div>
        <AntRow>
          <AntCol span={6}>
            <AntForm onSubmit={this.handleSubmit}>
              <AntForm.Item label="QUESTION">
                  <AntInput />
              </AntForm.Item>
              <AntForm.Item label="CATEGORY">
                  <Select />
              </AntForm.Item>
              <AntForm.Item label="ANSWER">
								<Select onChange={this.onChangeItemTypeCode}>
									{InputTypeCodeOptions}
								</Select>
						</AntForm.Item>
						{ (selectedRsType === EITC_ALPHA_NUMERIC) && (
							<React.Fragment>
								<AntForm.Item label="ANSWER">
										<AlphaNumInput maxLength={254} />
								</AntForm.Item>
							</React.Fragment>
						)}	
                { (selectedRsType === EITC_NUMERIC) && (
                  <React.Fragment>
                    <AntForm.Item label="ANSWER">
                        <AntInput maxLength={254} />
                    </AntForm.Item>
                  </React.Fragment>
                )}
                { (selectedRsType === EITC_CHECKBOX || selectedRsType === EITC_OPTION) && (
                  // @ts-ignore
                  <DynamicForm wrappedComponentRef={(inst) => this.dynamicForm = inst} />
                )}
                { selectedRsType === EITC_TEXT_AREA && (
                  <React.Fragment>
                    <AntForm.Item label="ANSWER">
                        <AntInput maxLength={100} />
                     </AntForm.Item>
                  </React.Fragment>	
                )}
            </AntForm>
          </AntCol>
        
        </AntRow>
			</div>
    );
  }
}

const InventoryCategories = AntForm.create()(InventoryCategoriesTemplate);

export default InventoryCategories;