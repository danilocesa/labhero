// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Button, Row, Col, Icon } from 'antd';
import Message from 'shared_components/message';
import TablePager from 'shared_components/search_pager/pager';
import { fetchAgeBracketList, createAgeBracket } from 'services/settings/ageBracket';
import DropDown from '../../shared/dropdown';
import AgeBracketTable from './table';
import FillupForm from './fillup_form';
import { 
	moduleTitle, 
	buttonNames, 
	tablePageSize, 
	formMode, 
	messagePrompts 
} from '../settings';

class AgeBracketDrawer extends React.Component{
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
			selectedItemRange: {},
			selectedSectionId: null,
			selectedSectionName: null
		};

		this.addForm = React.createRef();
		this.updateForm = React.createRef();
	}

	// componentDidUpdate(prevProps) {

	// 	if(prevProps.ddSections !== this.props.ddSections) {
	// 		this.fetchAllExamItemRange();
	// 	}
		
	// }

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
		const newFieldValues = Object.assign({}, fieldValues);
		
		const createdItem = await createAgeBracket({
			sectionID				: this.state.selectedSectionId,
			ageBracketLabel : newFieldValues.ageBracketRangeLabel,
			bracketFrom			: newFieldValues.ageBracketFrom,
			bracketFromUnit : newFieldValues.ageBracketUnitFrom,
			bracketTo				: newFieldValues.ageBracketTo,
			bracketToUnit		: newFieldValues.ageBracketUnitTo,
			rangeLabel			: `${newFieldValues.rangeLabel}`.toUpperCase()
		});
	

		if(createdItem) {
			Message.success({ message: messagePrompts.successCreatedAgeBracket });
			this.addForm.resetForm();

			// await this.fetchAllExamItemRange();
			this.setState({ isDisplayAddForm: false });
		}
	}

	onSubmittingUpdateForm = async (fieldValues) => {
		const { selectedItemRange } = this.state;

		const isUpdated = await createAgeBracket({
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
	
	onChangeSection = (sectionId, sectionName) => {
		this.setState({ isLoading: true, selectedSectionId: sectionId, selectedSectionName: sectionName.props.children });
	}

	// Private functions
	fetchAgeBracketList = async () => {
		this.setState({ isLoading: true }, async() => {
			
			const ageBrackets = await fetchAgeBracketList();

			this.setState({ ageBrackets, isLoading: false });
		});
	}


	render() {
		const { 
			visible, 
			onClose, 
			sectionList
		} = this.props;

		const { 
			isDisplayAddForm, 
			// isDisplayUpdateForm, 
			isLoading, 
			pageSize, 
			itemRanges,
			// selectedItemRange,
			// ageBrackets,
			// filteredAgeBrackets,
			isInitializing,
			selectedSectionId,
			selectedSectionName
		} = this.state;

		return(
			<div>
				<Drawer 
					title={`${moduleTitle} - SETTINGS - AGE RANGE`.toUpperCase()}
					width="1000"
					placement="right"
					closable
					onClose={onClose}
					visible={visible}
					className="ageBracket-drawer"
				>
					<section className="ageBracket-drawer-section">
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
									<Icon type="plus" /> {buttonNames.addAgeBracket}
								</Button>
								<TablePager handleChange={this.onChangePager} />
							</>
						</Col>
					</Row>
					<AgeBracketTable
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
					selectedSectionName={selectedSectionName}
					selectedSectionId={selectedSectionId}
					wrappedComponentRef={(inst) => this.addForm = inst}
				/>
				{/* <FillupForm 
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
				/> */}
			</div>
		);
	}
}

AgeBracketDrawer.propTypes = {
	visible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	sectionList: PropTypes.array.isRequired
};

export default AgeBracketDrawer;