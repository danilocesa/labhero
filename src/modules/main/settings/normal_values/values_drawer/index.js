// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Input, Button, Row, Col, Icon, Form } from 'antd';
import Message from 'shared_components/message';
import TablePager from 'shared_components/search_pager/pager';
import { 
	createExamItemRage, 
	getAllItemRanges, 
	updateExamItemRage 
} from 'services/settings/examItemRange';

import NormalValuesTable from './table';
import FillupForm from '../fillup_form/index_bak';
import { 
	moduleTitle, 
	fieldLabels, 
	buttonNames, 
	tablePageSize, 
	formMode, 
	messagePrompts 
} from '../settings';

import './drawer.css';

class NormalValuesDrawer extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			isDisplayAddForm: false,
			isDisplayUpdateForm: false,
			pageSize: tablePageSize,
			itemRanges: [],
			ageBrackets: [],
			filteredAgeBrackets: [],
			selectedItemRange: {}
		};

		this.addForm = React.createRef();
		this.updateForm = React.createRef();
	}

	componentDidUpdate(prevProps) {
		if(prevProps.selectedExamItem.examItemID !== this.props.selectedExamItem.examItemID) {
			this.fetchAllExamItemRange();
		}
		
	}

	onDblClickTableRow = (row) => {
		const { ageBrackets } = this.state;
		const filteredAgeBrackets = ageBrackets.filter(item => item.examItemRangeID !== row.examItemRangeID);

		this.setState({ 
			isDisplayUpdateForm: true,
			selectedItemRange: row,
			filteredAgeBrackets
		});
	}

	onClickAdd = () => {
		this.setState({ isDisplayAddForm: true });
	}
	
	onChangePager = (pageSize) => {
		this.setState({ pageSize });
	}
	
	onExitAddForm = () => {
		this.addForm.resetForm();

		this.setState({ isDisplayAddForm: false });
	}

	onExitUpdateForm = () => {
		this.setState({ isDisplayUpdateForm: false });
	}
	
	onSubmittingAddForm = async (fieldValues) => {
		const { selectedExamItem } = this.props;
		const newFieldValues = Object.assign({}, fieldValues);

		// Object.keys(fieldValues).forEach(key => {
		// 	newFieldValues[key] = fieldValues[key] || null
		// });

		const createdItem = await createExamItemRage({
			...newFieldValues,
			autoRelease: newFieldValues.autoRelease ? 1 : 0,
			canRelease: newFieldValues.canRelease ? 1 : 0,
			examItemId: selectedExamItem.examItemID,
			rangeLabel: `${newFieldValues.rangeLabel}`.toUpperCase()
		});
	

		if(createdItem) {
			Message.success({ message: messagePrompts.successCreatedNormalValues });
			this.addForm.resetForm();

			await this.fetchAllExamItemRange();
			this.setState({ isDisplayAddForm: false });
		}
	}

	onSubmittingUpdateForm = async (fieldValues) => {
		const { selectedItemRange } = this.state;

		const isUpdated = await updateExamItemRage({
			...fieldValues,
			autoRelease: fieldValues.autoRelease ? 1 : 0,	
			canRelease: fieldValues.canRelease ? 1 : 0,
			examItemRangeID: selectedItemRange.examItemRangeID,
			rangeLabel: `${fieldValues.rangeLabel}`.toUpperCase()
		});

		if(isUpdated) {
			Message.success({ message: messagePrompts.successUpdatedNormalValues });
			// this.updateForm.resetForm();

			await this.fetchAllExamItemRange();
			this.setState({ isDisplayUpdateForm: false });
		}
	}
	

	// Private functions
	fetchAllExamItemRange = async () => {
		this.setState({ isLoading: true }, async() => {
			const { selectedExamItem } = this.props;
			
			const itemRanges = await getAllItemRanges(selectedExamItem.examItemID);
			
			const ageBrackets = itemRanges.map(item => ({ 
				examItemRangeID: item.examItemRangeID,
				from: item.ageBracket.split('-')[0], 
				to: item.ageBracket.split('-')[1]
			}));

			this.setState({ itemRanges, ageBrackets, isLoading: false });
		});
	}


	render() {
		const { 
			visible, 
			onClose, 
			selectedExamItem, 
			selectedSectionName,
			selectedSpecimenName
		} = this.props;

		const { 
			isDisplayAddForm, 
			isDisplayUpdateForm, 
			isLoading, 
			pageSize, 
			itemRanges,
			selectedItemRange,
			ageBrackets,
			filteredAgeBrackets 
		} = this.state;

		return(
			<div>
				<Drawer 
					title={`${moduleTitle} - ${selectedSectionName} / ${selectedSpecimenName}`.toUpperCase()}
					width="1000"
					placement="right"
					closable
					onClose={onClose}
					visible={visible}
					className="values-drawer"
				>
					<section className="values-drawer-examItemSection">
						<Form>
							<Row gutter={16}>
								<Col span={9} style={{ marginLeft: 10 }}>
									<Form.Item label={fieldLabels.examItemName}>
										<Input value={selectedExamItem.examItemName} disabled />
									</Form.Item>
								</Col>
								<Col span={9}>
									<Form.Item label={fieldLabels.examItemGeneralName}>
										<Input value={selectedExamItem.examItemGeneralName} disabled />
									</Form.Item>
								</Col>
								<Col span={5}>
									<Form.Item label={fieldLabels.examItemUnitCode}>
										<Input value={selectedExamItem.examItemUnitCode} disabled />
									</Form.Item>
								</Col>
							</Row>
						</Form>
					</section>
					<Row style={{ marginTop: 50 }}>
						<Col span={24} style={{ textAlign: 'right' }}>
							<>
								<Button 
									shape="round"
									type="primary" 
									style={{ marginRight: 10 }}
									onClick={this.onClickAdd}
								>
									<Icon type="plus" /> {buttonNames.addNormalValues}
								</Button>
								<TablePager handleChange={this.onChangePager} />
							</>
						</Col>
					</Row>
					<NormalValuesTable
						data={itemRanges}
						pageSize={pageSize}
						loading={isLoading}
						onRowDblClick={this.onDblClickTableRow}
					/>
				</Drawer>
				<FillupForm 
					moduleType={formMode.add}
					visible={isDisplayAddForm} 
					onClose={this.onExitAddForm} 
					onSubmit={this.onSubmittingAddForm}
					ageBrackets={ageBrackets}
					selectedSectionName={selectedSectionName}
					selectedSpecimenName={selectedSpecimenName}
					examItemName={selectedExamItem.examItemName}
					examItemGeneralName={selectedExamItem.examItemGeneralName}
					examItemUnitCode={selectedExamItem.examItemUnitCode}
					wrappedComponentRef={(inst) => this.addForm = inst}
				/>
				<FillupForm 
					moduleType={formMode.update}
					visible={isDisplayUpdateForm} 
					onClose={this.onExitUpdateForm} 
					onSubmit={this.onSubmittingUpdateForm}
					ageBrackets={filteredAgeBrackets}
					selectedSectionName={selectedSectionName}
					selectedSpecimenName={selectedSpecimenName}
					examItemName={selectedExamItem.examItemName}
					examItemGeneralName={selectedExamItem.examItemGeneralName}
					examItemUnitCode={selectedExamItem.examItemUnitCode}
					wrappedComponentRef={(inst) => this.updateForm = inst}
					selectedItemRange={selectedItemRange}
				/>
			</div>
		);
	}
}

NormalValuesDrawer.propTypes = {
	visible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	selectedExamItem: PropTypes.shape({
		examItemID: PropTypes.number,
		examItemName: PropTypes.string,
		examItemGeneralName: PropTypes.string,
		examItemUnitCode: PropTypes.string
	}).isRequired,
	selectedSectionName: PropTypes.string,
	selectedSpecimenName: PropTypes.string
};

NormalValuesDrawer.defaultProps = {
	selectedSectionName: null,
	selectedSpecimenName: null
};


export default NormalValuesDrawer;