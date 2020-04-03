// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Button, Row, Col, Icon } from 'antd';
import TablePager from 'shared_components/table_pager';
import Message from 'shared_components/message';
import { getAllRangeClass, createRangeClass, updateRangeClass } from 'services/settings/ExamItemRangeClass';
import LabelRangeTable from './table';
import FillupForm from './fillup_form';
import { 
	moduleTitle, 
	buttonNames, 
	tablePageSize, 
	formMode, 
	messagePrompts
} from '../settings';
import DropDown from '../../shared/dropdown';

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
								<Button 
									shape="round"
									type="primary" 
									style={{ marginRight: 10 }}
									onClick={this.onClickAdd}
									disabled={selectedSectionId == null}
								>
									<Icon type="plus" /> {buttonNames.addRangeClass}
								</Button>
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
				<FillupForm 
					moduleType={formMode.add}
					visible={isDisplayAddForm} 
					onClose={this.onExitAddForm} 
					onSubmit={this.onSubmittingAddForm}
					selectedSectionName={selectedSectionName}
					selectedSectionId={selectedSectionId}
					wrappedComponentRef={(inst) => this.addForm = inst}
				/>
				<FillupForm 
					moduleType={formMode.update}
					visible={isDisplayUpdateForm} 
					onClose={this.onExitUpdateForm} 
					onSubmit={this.onSubmittingUpdateForm}
					selectedSectionName={selectedSectionName}
					selectedSectionId={selectedSectionId}
					rangeClass={selectedRangeClass}
					wrappedComponentRef={(inst) => this.updateForm = inst}
				/>
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