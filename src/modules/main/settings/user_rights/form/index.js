/* eslint-disable react/prop-types */
// LIBRARY
import React from 'react';
import { Drawer, Form, Button, TreeSelect } from 'antd';
import PropTypes from 'prop-types';
import { RegexInput } from 'shared_components/pattern_input';
import { fieldRules, drawerTitles, fieldLabels, buttonLabels } from 'modules/main/settings/user_rights/settings';

const { SHOW_ALL } = TreeSelect;

const treeData = [
  {
    title: 'DASHBOARD / HOMEPAGE',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-1',
      },
    ],
  },
  {
    title: 'REQUEST',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
  {
    title: 'PLHEBO',
    value: '0-2',
    key: '0-2',
    children: [
      {
        title: 'Child Node1',
        value: '0-2-0',
        key: '0-2-1',
      },
    ],
  },
  {
    title: 'SEARCH LAB RESULT',
    value: '0-3',
    key: '0-3',
    children: [
      {
        title: 'Child Node1',
        value: '0-3-0',
        key: '0-3-1',
      },
    ],
  },
  {
    title: 'SEARCH PATIENT',
    value: '0-4',
    key: '0-4',
    children: [
      {
        title: 'Child Node1',
        value: '0-4-0',
        key: '0-4-1',
      },
    ],
  },
  {
    title: 'SETTINGS',
    value: '0-5',
    key: '0-5',
    children: [
      {
        title: 'Child Node1',
        value: '0-5-0',
        key: '0-5-1',
      },
    ],
  },
  {
    title: 'INVENTORY',
    value: '0-6',
    key: '0-6',
    children: [
      {
        title: 'Child Node1',
        value: '0-6-0',
        key: '0-6-1',
      },
    ],
  },
];


class AddForm extends React.Component {
  state = {
    isLoading: false
  }

	onChangeItemTypeCode = () => {

	}

  onChange = value => {
    console.log('onChange ', value);
    this.setState({ value });
  };

	onSubmit = () => {
	
	}

	resetForm = () => {

	}

	render() {
		const { isLoading } = this.state;
		const { onClose, visible, type } = this.props;
    const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_ALL,
      treeDefaultExpandAll: true,
      searchPlaceholder: 'Please select',
      style: {
        width: '100%',
      },
    };

		return (
			<Drawer
				title={type === 'add' ? drawerTitles.title1 : drawerTitles.title2}
				width="30%"
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
			>
        <Form 
          onFinish={this.onSubmit}
          layout="vertical"
        >
					<section style={{ marginBottom: 50 }}>
            <Form.Item 
              name="userType"
              label={fieldLabels.label1}
              rules={fieldRules.examItemName}
            >
              <RegexInput 
                regex={/[A-Za-z0-9 -]/} 
                maxLength={200} 
              />
							{/* {getFieldDecorator('userType', { rules: fieldRules.examItemName })(
								<RegexInput 
									regex={/[A-Za-z0-9 -]/} 
                  maxLength={200} 
								/>
							)} */}
            </Form.Item>  
            <Form.Item 
              name="userDepartment"
              label={fieldLabels.label2}
              rules={fieldRules.examItemName}
            >
              <TreeSelect {...tProps} />
							{/* {getFieldDecorator('userDepartment', { rules: fieldRules.examItemName })(
								<TreeSelect {...tProps} />
							)} */}
            </Form.Item>
					</section>
					<section className="drawerFooter">
						<div>
							<Button 
								shape="round" 
								style={{ margin: 10, width: 120 }}
								onClick={onClose}
							>
								{buttonLabels.label3}
							</Button>
							<Button 
								shape="round" 
								type="primary" 
								htmlType="submit"
								loading={isLoading}
								style={{ margin: 10, width: 120 }}
							>
								{type === 'add' ? buttonLabels.label1 : buttonLabels.label2}
							</Button>
						</div>
					</section>
        </Form> 
			</Drawer>
		);
	}
}

AddForm.propTypes = {
  type: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
	selectedSectionName: PropTypes.string,
	selectedSpecimenName: PropTypes.string,
};

AddForm.defaultProps = {
	selectedSectionName: null,
	selectedSpecimenName: null
};

// export default Form.create()(AddForm);

export default AddForm;