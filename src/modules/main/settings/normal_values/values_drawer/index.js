import React from 'react';
import PropTypes from 'prop-types';

import { Drawer, Input, Button, Row, Col, Icon, Form } from 'antd';
import TablePager from 'shared_components/search_pager/pager';
import HttpCodeMessage from 'shared_components/message_http_status';
import { moduleTitle, fieldLabels, buttonNames, tablePageSize, messagePrompts } from '../settings';
import NormalValuesTable from './table';
import AddForm from '../add_form';
import UpdateForm from '../update_form';

import './drawer.css';

const ActionSection = (props) => (
	<Row style={{ marginTop: 50 }}>
		<Col span={24} style={{ textAlign: 'right' }}>
			{props.rightContent}
		</Col>
	</Row>
);

const sampleData = [
	{
		gender: 'FEMALE',
		ageBracket: '0-12',
		machine: 'MACHINE',
		displayValue: '< 10.0',
		labelOfRange: 'CRITICAL LOW'
	},
	{
		gender: 'FEMALE',
		ageBracket: '0-12',
		machine: 'MACHINE',
		displayValue: '99999999',
		labelOfRange: 'NORMAL'
	},
	{
		gender: 'MALE',
		ageBracket: '0-12',
		machine: 'MACHINE',
		displayValue: 'over 9000',
		labelOfRange: 'NORMAL'
    },
    {
		gender: 'FEMALE',
		ageBracket: '0-12',
		machine: 'MACHINE',
		displayValue: '< 10.0',
		labelOfRange: 'CRITICAL LOW'
	},
	{
		gender: 'FEMALE',
		ageBracket: '0-12',
		machine: 'MACHINE',
		displayValue: '99999999',
		labelOfRange: 'NORMAL'
	},
	{
		gender: 'MALE',
		ageBracket: '0-12',
		machine: 'MACHINE',
		displayValue: 'over 9000',
		labelOfRange: 'NORMAL'
    },
    {
		gender: 'FEMALE',
		ageBracket: '0-12',
		machine: 'MACHINE',
		displayValue: '< 10.0',
		labelOfRange: 'CRITICAL LOW'
	},
	{
		gender: 'FEMALE',
		ageBracket: '0-12',
		machine: 'MACHINE',
		displayValue: '99999999',
		labelOfRange: 'NORMAL'
	},
	{
		gender: 'MALE',
		ageBracket: '0-12',
		machine: 'MACHINE',
		displayValue: 'over 9000',
		labelOfRange: 'NORMAL'
	},
];

class NormalValuesDrawer extends React.Component{
    state ={
        isInitializing: true,
		isLoading: false,
		isShowAddForm: false,
        isShowUpdateForm: false,
        pageSize: tablePageSize,
    }

    onDblClickTableRow = (selectedNormalValue) => {
        console.log('TCL->',selectedNormalValue);
		this.setState({ 
			isShowUpdateForm: true
		});
	}

	onClickAdd = () => {
		this.setState({ isShowAddForm: true });
    }
    
    onChangePager = (pageSize) => {
		this.setState({ pageSize });
    }
    
	onExitForm = () => {
		this.setState({ isShowAddForm: false, isShowUpdateForm: false });
    }
    
    onSuccessAddNormalValues = () => {
		this.setState({ isLoading: true, isShowAddForm: false });

		// @ts-ignore
		HttpCodeMessage({ status: 200, message: messagePrompts.successCreatedNormalValues });
	}


    render() {
        const { visible, selectedSectionID, selectedSpecimenID, onClose, isLoading, isShowAddForm, isShowUpdateForm, pageSize } = this.props;
        
        const breadCrumb = (
			<span>HEMA/BLOOD</span>
        );
        
        const rightSection = (
			<>
				<Button 
					shape="round"
					type="primary" 
					style={{ marginRight: 10 }}
					onClick={this.onClickAdd}
					disabled={selectedSectionID === null}
				>
					<Icon type="plus" /> {buttonNames.addNormalValues}
				</Button>
                <TablePager handleChange={this.onChangePager} />
			</>
		);

        return(
            <div>
            <Drawer 
                title={moduleTitle}
                width="1000"
                placement="right"
                closable
                onClose={onClose}
                visible={visible}
                className="values-drawer"
            >
                {breadCrumb}
                <section className="values-drawer-examItemSection">
                    <Form>
                        <Row gutter={16}>
                            <Col span={9} style={{ marginLeft: 10 }}>
                                <Form.Item label={fieldLabels.examItemName}>
                                    <Input 
                                        defaultValue={123} 
                                        disabled
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label={fieldLabels.examItemGeneralName}>
                                    <Input 
                                        defaultValue={123} 
                                        disabled
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item label={fieldLabels.examItemUnitCode}>
                                    <Input 
                                        defaultValue={123} 
                                        disabled
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </section>
                <ActionSection 
                    rightContent={rightSection}
                />
                <NormalValuesTable
                    data={sampleData}
                    pageSize={pageSize}
                    loading={isLoading}
                    onRowDblClick={this.onDblClickTableRow}
                />
            </Drawer>
            <AddForm 
                visible={isShowAddForm} 
                onClose={this.onExitForm} 
                onSuccess={this.onSuccessAddNormalValues}
                selectedSectionId={selectedSectionID}
                selectedSpecimenId={selectedSpecimenID}
            />
            <UpdateForm 
                visible={isShowUpdateForm}
                onClose={this.onExitForm} 
                onSuccess={this.onSuccessAddNormalValues}
                selectedSectionId={selectedSectionID}
                selectedSpecimenId={selectedSpecimenID}
            />
            </div>
        );
    }
}

NormalValuesDrawer.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectedSpecimenID: PropTypes.number.isRequired,
    selectedSectionID: PropTypes.number.isRequired
};

export default NormalValuesDrawer;