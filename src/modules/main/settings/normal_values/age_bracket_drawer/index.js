// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Button, Row, Col, Icon } from 'antd';
import Message from 'shared_components/message';
import TablePager from 'shared_components/search_pager/pager';
import { fetchAgeBracketList, createAgeBracket, updateAgeBracket } from 'services/settings/ageBracket';
import { getAllRangeClass } from 'services/settings/ExamItemRangeClass';
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
			ageBrackets: [],
			rangeClass: [],
			selectedAgeBracket: {},
			selectedSectionId: null,
			selectedSectionName: null
		};

		this.addForm = React.createRef();
		this.updateForm = React.createRef();
	}

	onDblClickTableRow = (row) => {
		const { ageBrackets } = this.state;
		const selectedAgeBracket = ageBrackets.find(item => item.ageBracketID === row.ageBracketID);

		this.setState({ 
			isDisplayUpdateForm: true,
			selectedAgeBracket,
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
		
		const payload = {
			...newFieldValues,
			sectionID: this.state.selectedSectionId,
			ageBracketLabel: `${newFieldValues.ageBracketLabel}`.toUpperCase()
		};

		const createdItem = await createAgeBracket(payload);

		if(createdItem) {
			Message.success({ message: messagePrompts.successCreatedAgeBracket });
			this.addForm.resetForm();
		
			this.setState({ isLoading: true }, async() => {
				const { selectedSectionId } = this.state;
				const ageBrackets = await this.fetchAgeBracketList(selectedSectionId);

				this.setState({ 
					isDisplayAddForm: false, 
					isLoading: false,
					ageBrackets 
				});
			});
		}
	}

	onSubmittingUpdateForm = async (fieldValues) => {
		const newFieldValues = Object.assign({}, fieldValues);
		const { selectedAgeBracket } = this.state;


		const payload = {
			...newFieldValues,
			sectionID: this.state.selectedSectionId,
			ageBracketLabel: `${newFieldValues.ageBracketLabel}`.toUpperCase(),
			ageBracketID: selectedAgeBracket.ageBracketID
		};

		const updatedItem = await updateAgeBracket(payload);

		if(updatedItem) {
			Message.success({ message: messagePrompts.successUpdateAgeBracket });
			this.updateForm.resetForm();
		
			this.setState({ isLoading: true, isDisplayUpdateForm: false }, async() => {
				const { selectedSectionId } = this.state;
				const ageBrackets = await this.fetchAgeBracketList(selectedSectionId);

				this.setState({ 
					isLoading: false,
					ageBrackets,
					selectedAgeBracket: {} 
				});
			});
		}
	}
	
	onChangeSection = (sectionId, sectionName) => {
		this.setState({ 
			isLoading: true, 
			selectedSectionId: sectionId,
			selectedSectionName: sectionName.props.children
		}, async() => {
			const ageBrackets = await this.fetchAgeBracketList(sectionId);
			const rangeClass = await this.fetchRangeClass(sectionId);


			this.setState({ 
				ageBrackets, 
				rangeClass,
				isLoading: false 
			});
		});
	}

	// Private functions
	fetchAgeBracketList = async (selectedSectionId) => {
		const ageBrackets = await fetchAgeBracketList();

		return ageBrackets.filter(ageBracket => ageBracket.sectionID === selectedSectionId);
	}


	fetchRangeClass = async (selectedSectionId) => {
		const rangeClass = await getAllRangeClass()

		return rangeClass.filter(item => (item.sectionID === selectedSectionId) && item.active === 1);
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
			ageBrackets,
			selectedSectionId,
			selectedSectionName,
			rangeClass,
			selectedAgeBracket
		} = this.state;

		const isInitializing = sectionList.length === 0;

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
						data={ageBrackets}
						pageSize={pageSize}
						loading={isLoading}
						onRowDblClick={this.onDblClickTableRow}
					/>
				</Drawer>
				<FillupForm 
					moduleType={formMode.add}
					rangeClass={rangeClass}
					visible={isDisplayAddForm} 
					onClose={this.onExitAddForm} 
					onSubmit={this.onSubmittingAddForm}
					selectedSectionName={selectedSectionName}
					selectedSectionId={selectedSectionId}
					wrappedComponentRef={(inst) => this.addForm = inst}
				/>
				<FillupForm 
					moduleType={formMode.update}
					rangeClass={rangeClass}
					visible={isDisplayUpdateForm} 
					onClose={this.onExitUpdateForm} 
					onSubmit={this.onSubmittingUpdateForm}
					ageBracket={selectedAgeBracket}
					selectedSectionName={selectedSectionName}
					wrappedComponentRef={(inst) => this.updateForm = inst}
				/>
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