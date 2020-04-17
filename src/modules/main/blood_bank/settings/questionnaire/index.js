// LiBRARY
import React from 'react';
import CategoriesForm from '../categories/categories_form';
import { 
  Drawer,
  Row as AntRow, 
  Col as AntCol, 
  Typography, 
  Form as AntForm, 
  Input as AntInput, 
  Button as AntButton,
  Table as AntTable,
  Menu,
  Dropdown,
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
import { AlphaNumInput, RegexInput, NumberInput } from 'shared_components/pattern_input';

// CUSTOM MODULES
import DynamicForm from './dynamic_form';
import { drawerUpdateTitle, drawerAddTitle, tablePageSize, tableSize, buttonLabels } from './settings';
import getUnitOfMeasures from 'services/settings/unitOfMeasure';
import getInputTypeCode from 'services/settings/inputType';
//  CONSTANTS
const { Option } = Select;
const { Title } = Typography;
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'QUESTION',
    dataIndex: 'question',
    key: 'question'
  },
  {
    title: 'CATEGORIES',
    dataIndex: 'categories',
    key: 'categories'
  },
  {
    title: 'ANSWER',
    dataIndex: 'ANSWER',
    key: 'ANSWER',
  }
];

const data = [
  {
    key: '1',
    id: 1,
    order: 'John Brown',
    categories_name: 'Joe Black',
    description:"sample"
  },
  {
    key: '2',
    id: 2,
    order: 'Jim Green',
    categories_name: 'Joe Black',
    description:"sample"
  },
  {
    key: '3',
    id: 3,
    order: 'sample',
    categories_name: 'Joe Black',
    description:"sample"
  },
];



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
			drawerTitle: drawerUpdateTitle,
			drawerButton: buttonLabels.update,
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
    const { isLoading, selectedRsType, unitOfMeasures, inputTypeCodes } = this.state;
    
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
		
    const { getFieldDecorator } = this.props.form;
    return ( 
			<div>
        <AntRow>
          <AntCol span={6}>
            <Title level={4}>QUESTION</Title>
            <AntForm onSubmit={this.handleSubmit} >
              <AntForm.Item label="QUESTION">
                {getFieldDecorator('question', {
                  rules: [{ required: true, message: 'Please input!' }],
                })(
                  <AntInput />
                )}
              </AntForm.Item>
              <AntForm.Item label="CATEGORY">
                {getFieldDecorator('category', {
                  rules: [{ required: true, message: 'Please input!' }],
                })(
                  <Select />
                )}
              </AntForm.Item>
              <AntForm.Item label= "ANSWER">
							{getFieldDecorator('examItemTypeCode')(
								<Select onChange={this.onChangeItemTypeCode}>
									{InputTypeCodeOptions}
								</Select>
							)}
						</AntForm.Item>
						{ (selectedRsType === EITC_ALPHA_NUMERIC) && (
							<React.Fragment>
						
								<AntForm.Item label="ANSWER">
									{getFieldDecorator('examItemTypeDefault', { 
									
										// initialValue: 1 
									})(
										<AlphaNumInput maxLength={254} />
									)}
								</AntForm.Item>
							</React.Fragment>
						)}	
                { (selectedRsType === EITC_NUMERIC) && (
                  <React.Fragment>
                
                    <AntForm.Item label= "ANSWER">
                      {getFieldDecorator('examItemTypeDefault', { 
                         
                        // initialValue: 1 
                      })(
                        <AntInput maxLength={254} />
                      )}
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
                      {getFieldDecorator('examItemTypeDefault', { 
                        
                        // initialValue: 1 
                      })(
                        <AntInput maxLength={100} />
                      )}
                    </AntForm.Item>
                  </React.Fragment>	
                )}
            

                  {/* BUTTON */}
              <AntRow>
                <AntCol span={24} style={{ textAlign: 'right' }} >
                  <AntButton onClick={this.handleReset} shape="round">
                    CLEAR
                  </AntButton>
                  <AntButton type="primary" htmlType="submit" style={{ marginLeft: 8 }}shape="round"> 
                    ADD
                  </AntButton>
                </AntCol>
              </AntRow>
            </AntForm>
          </AntCol>
          <AntCol span={2} />
          <AntCol span={16}>
          <AntTable 
					className="settings-panel-table"
					size={tableSize}
					dataSource={data}
					pagination={this.state.pagination}
					loading={this.state.loading} 
          columns={columns}
          
					rowKey={record => record.key}
					onRow={(record) => {
						return {
							onDoubleClick: () => {
								this.displayDrawerUpdate(record);
							}
						}
					}}
				/>
        <Drawer 
					title={this.state.drawerTitle}
					visible={this.state.isDrawerVisible}
					onClose={this.onClose}
					width="40%"
					destroyOnClose
				>
					<CategoriesForm 
						drawerButton={this.state.drawerButton} 
						panelInfo={this.state.panelInfo}
						onCancel={this.onClose}
					/>
				</Drawer>
          </AntCol>
        </AntRow>
			</div>
    );
  }
}

const InventoryCategories = AntForm.create()(InventoryCategoriesTemplate);

export default InventoryCategories;