// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Input, Button, Row, Col, Icon, Form } from 'antd';
import Message from 'shared_components/message';
import TablePager from 'shared_components/table_pager';
import { 
	createExamItemRage, 
	getAllItemRanges, 
	updateExamItemRage 
} from 'services/settings/examItemRange';
import { UserAccessContext } from 'context/userAccess';
import NormalValuesTable from './table';
import FillupForm from '../fillup_form';
import { 
	drawerTitle,
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
				ageBracketLabel: item.ageBracketLabel
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
			selectedSpecimenName,
			selectedSectionID
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
						<Form layout="vertical">
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
								<UserAccessContext.Consumer>
									{value => value.userAccess.settings.create && (
										<Button 
											shape="round"
											type="primary" 
											style={{ marginRight: 10 }}
											onClick={this.onClickAdd}
										>
											<Icon type="plus" /> {buttonNames.addNormalValues}
										</Button>
									)}
								</UserAccessContext.Consumer>
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
				<Drawer
					title={`${drawerTitle.normalValue.add} - ${selectedSectionName} / ${selectedSpecimenName}`.toUpperCase()}
					width="700"
					placement="right"
					closable
					onClose={this.onExitAddForm} 
					visible={isDisplayAddForm}
				>
					<FillupForm 
						moduleType={formMode.add}
						onClose={this.onExitAddForm} 
						onSubmit={this.onSubmittingAddForm}
						ageBrackets={ageBrackets}
						selectedSectionID={selectedSectionID}
						examItemName={selectedExamItem.examItemName}
						examItemGeneralName={selectedExamItem.examItemGeneralName}
						examItemUnitCode={selectedExamItem.examItemUnitCode}
						ref={(inst) => this.addForm = inst}
					/>
				</Drawer>
				<Drawer
					title={`${drawerTitle.normalValue.update} - ${selectedSectionName} / ${selectedSpecimenName}`.toUpperCase()}
					width="700"
					placement="right"
					closable
					onClose={this.onExitUpdateForm} 
					visible={isDisplayUpdateForm}
				>
					<FillupForm 
						moduleType={formMode.update}
						onClose={this.onExitUpdateForm} 
						onSubmit={this.onSubmittingUpdateForm}
						ageBrackets={filteredAgeBrackets}
						selectedSectionID={selectedSectionID}
						examItemName={selectedExamItem.examItemName}
						examItemGeneralName={selectedExamItem.examItemGeneralName}
						examItemUnitCode={selectedExamItem.examItemUnitCode}
						ref={(inst) => this.updateForm = inst}
						selectedItemRange={selectedItemRange}
					/>
				</Drawer>
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
	selectedSectionID: PropTypes.number,
	selectedSectionName: PropTypes.string,
	selectedSpecimenName: PropTypes.string
};

NormalValuesDrawer.defaultProps = {
	selectedSectionID: null,
	selectedSectionName: null,
	selectedSpecimenName: null
};


export default NormalValuesDrawer;