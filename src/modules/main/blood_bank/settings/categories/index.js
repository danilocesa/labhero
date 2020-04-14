// LiBRARY
import React from 'react';
import { Table } from 'antd';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import SelectedTable from './selected_table';

import { drawerUpdateTitle, drawerAddTitle, tablePageSize, tableSize, buttonLabels } from './settings';
import { 
  Drawer,
  Row as AntRow, 
  Col as AntCol, 
  Typography, 
  Form as AntForm, 
  Input as AntInput, 
  Button as AntButton,
} from 'antd';
let dragingIndex = -1;

const { Title } = Typography;


class InventoryCategoriesTemplate extends React.Component {
  state = { }

  onDragAndDropRow = (selectedExams) => {
		this.setState({ selectedExams });
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
  onClose = () => {
		this.setState({
			isDrawerVisible: false,
		});
	};

  render() {
    const { isLoading, isFetchingData, examList, selectedExams } = this.state;
    const { getFieldDecorator } = this.props.form;
    return ( 
			<div>
        <AntRow>
          <AntCol span={6}>
            <Title level={4}>CATEGORIES</Title>
            <AntForm onSubmit={this.handleSubmit} >
              <AntForm.Item label="ORDER">
                {getFieldDecorator('category_name', {
                  rules: [{ required: true, message: 'Please input!' }],
                })(
                  <AntInput />
                )}
              </AntForm.Item>
              <AntForm.Item label="CATEGORY NAME">
                {getFieldDecorator('category_name', {
                  rules: [{ required: true, message: 'Please input!' }],
                })(
                  <AntInput />
                )}
              </AntForm.Item>
              <AntForm.Item label="DESCRIPTION">
                {getFieldDecorator('category_name', {
                  rules: [{ required: true, message: 'Please input!' }],
                })(
                  <AntInput />
                )}
              </AntForm.Item>
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

          {/* Drag and Drop */}
          <SelectedTable 
										wrappedComponentRef={(inst) => this.selectedTable = inst}
										data={selectedExams}
										onDragAndDropRow={this.onDragAndDropRow}
										loading={false}
									/>		
          </AntCol>
        </AntRow>
			</div>
    );
  }
}

const InventoryCategories = AntForm.create()(InventoryCategoriesTemplate);

export default InventoryCategories;