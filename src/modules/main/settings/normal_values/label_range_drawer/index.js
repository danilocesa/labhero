// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Button, Row, Col, Icon } from 'antd';
import { UserAccessContext } from 'context/userAccess';
import TablePager from 'shared_components/table_pager';
import Message from 'shared_components/message';
import { getAllRangeClass, createRangeClass, updateRangeClass } from 'services/settings/ExamItemRangeClass';
import LabelRangeTable from './table';
import FillupForm from './fillup_form';
import { 
	drawerTitle,
	moduleTitle, 
	buttonNames, 
	tablePageSize, 
	formMode, 
	messagePrompts
} from '../settings';
import DropDown from '../../shared/dropdown';

import './index.css';

class LabelRangeDrawer extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			isDisplayAddForm: false,
			isDisplayUpdateForm: false,
			pageSize: tablePageSize,
			rangeClass: [],
			selectedRangeClass: {},
			selectedSectionId: null,
			selectedSectionName: null
		};

		this.addForm = React.createRef();
		this.updateForm = React.createRef();
	}

	onDblClickTableRow = (row) => {

		this.setState({ 
			isDisplayUpdateForm: true,
			selectedRangeClass: row
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
		this.setState({ isDisplayUpdateForm: false, selectedRangeClass: {} });
	}
	
	onSubmittingAddForm = async (fieldValues) => {
		const newFieldValues = Object.assign({}, fieldValues);
		
		const payload = {
			...newFieldValues,
			sectionID: this.state.selectedSectionId,
			rangeClassLabel: `${newFieldValues.rangeClassLabel}`.toUpperCase() 
		};

		const createdItem = await createRangeClass(payload);

		if(createdItem) {
			Message.success({ message: messagePrompts.successCreatedRangeLabel });
			this.addForm.resetForm();
		
			this.setState({ isLoading: true }, async() => {
				const { selectedSectionId } = this.state;
				const rangeClass = await this.fetchRangeClass(selectedSectionId);

				this.setState({ 
					isDisplayAddForm: false, 
					isLoading: false,
					rangeClass
				}, () => { this.props.clearSection(); });
			});
		}
	}

	onSubmittingUpdateForm = async (fieldValues) => {
		const newFieldValues = Object.assign({}, fieldValues);
		const { selectedRangeClass } = this.state;


		const payload = {
			...newFieldValues,
			sectionID: this.state.selectedSectionId,
			rangeClassLabel: `${newFieldValues.rangeClassLabel}`.toUpperCase(),
			rangeClassID: selectedRangeClass.rangeClassID
		};

		const updatedItem = await updateRangeClass(payload);

		if(updatedItem) {
			Message.success({ message: messagePrompts.successUpdateRangeLabel });
			this.updateForm.resetForm();
		
			this.setState({ isLoading: true, isDisplayUpdateForm: false }, async() => {
				const { selectedSectionId } = this.state;
				const rangeClass = await this.fetchRangeClass(selectedSectionId);

				this.setState({ 
					isLoading: false,
					rangeClass,
					selectedRangeClass: {} 
				}, () => { this.props.clearSection(); });
			});
		}
	}
	
	onChangeSection = (sectionId, sectionName) => {
		this.setState({ 
			isLoading: true, 
			selectedSectionId: sectionId,
			selectedSectionName: sectionName.props.children
		}, async() => {
			const rangeClass = await this.fetchRangeClass(sectionId);

			this.setState({ rangeClass, isLoading: false });
		});
	}

	// Private functions
	fetchRangeClass = async (selectedSectionId) => {
		const rangeClass = await getAllRangeClass();

		return rangeClass.filter(item => item.sectionID === selectedSectionId);
	}


	render() {
		const { 
			visible, 
			onClose, 
			sectionList
		} = this.props;

		const { 
			isDisplayAddForm, 
			isDisplayUpdateForm,
			isLoading, 
			pageSize, 
			rangeClass,
			selectedSectionId,
			selectedSectionName,
			selectedRangeClass
		} = this.state;

		const isInitializing = sectionList.length === 0;

		return(
			<div>
				<Drawer 
					title={`${moduleTitle} - SETTINGS - RANGE CLASS LABEL`.toUpperCase()}
					width="1000"
					placement="right"
					closable
					onClose={onClose}
					visible={visible}
					className="ageBracket-drawer"
				>
					<section className="labelRange-drawer-section">
						<Row style={{ marginTop: 50 }}>
							<Col span={12} offset={6}>
								<DropDown 
									label="SECTION"
									placeholder="Select Section"
									content={sectionList} 
									onChange={this.onChangeSection}
									loading={isInitializing}
									value={selectedSectionId}
								/>
							</Col>
						</Row>
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
											disabled={selectedSectionId == null}
										>
											<Icon type="plus" /> {buttonNames.addRangeClass}
										</Button>
									)}
								</UserAccessContext.Consumer>
								<TablePager handleChange={this.onChangePager} />
							</>
						</Col>
					</Row>
					<LabelRangeTable
						data={rangeClass}
						pageSize={pageSize}
						loading={isLoading}
						onRowDblClick={this.onDblClickTableRow}
					/>
				</Drawer>
				<Drawer
					title={`${drawerTitle.rangeClass.add} - ${selectedSectionName}`.toUpperCase()}
					width="700"
					placement="right"
					closable
					onClose={this.onExitAddForm} 
					visible={isDisplayAddForm}
					className="label-class-drawer"
				>
					<FillupForm 
						moduleType={formMode.add}
						onClose={this.onExitAddForm} 
						onSubmit={this.onSubmittingAddForm}
						selectedSectionId={selectedSectionId}
						ref={(inst) => this.addForm = inst}
					/>
				</Drawer>
				<Drawer
					title={`${drawerTitle.rangeClass.update} - ${selectedSectionName}`.toUpperCase()}
					width="700"
					placement="right"
					closable
					onClose={this.onExitUpdateForm} 
					visible={isDisplayUpdateForm}
					className="label-class-drawer"
				>
					<FillupForm 
						moduleType={formMode.update}
						onClose={this.onExitUpdateForm} 
						onSubmit={this.onSubmittingUpdateForm}
						selectedSectionId={selectedSectionId}
						rangeClass={selectedRangeClass}
						ref={(inst) => this.updateForm = inst}
					/>
				</Drawer>
			</div>
		);
	}
}

LabelRangeDrawer.propTypes = {
	visible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	sectionList: PropTypes.array.isRequired,
	clearSection: PropTypes.func.isRequired,
};

export default LabelRangeDrawer;