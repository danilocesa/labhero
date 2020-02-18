
// LIBRARY
import React from 'react';
import { Drawer, Form, Input, Button, Select, Switch, Row, Col } from 'antd';
import PropTypes from 'prop-types';

import { drawerTitle, fieldRules, fieldLabels, formMode, buttonNames} from '../settings';

import FillupForm from '../fillup_form';

class UpdateForm extends React.Component{

    render() {
        const { onClose, visible, onSuccess, selectedSectionId,selectedSpecimenId, updateData } = this.props;

        return(
            <div>
                <FillupForm 
                drawerTitle={drawerTitle.update}
                fieldRules={fieldRules}
                fieldLabels={fieldLabels}
                buttonNames={buttonNames}
                addOrUpdate={formMode.update}
                onClose={onClose}
                visible={visible}
                onSuccess={onSuccess}
                updateData={updateData}
                selectedSectionId={selectedSectionId}
                selectedSpecimenId={selectedSpecimenId}
                />
            </div>
        );
    }
}

UpdateForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
	onSuccess: PropTypes.func.isRequired,
	updateData: PropTypes.object,
	selectedSectionId: PropTypes.number,
	selectedSpecimenId: PropTypes.number
};

UpdateForm.defaultProps = {
	updateData: {},
	selectedSectionId: null,
	selectedSpecimenId: null
};

export default Form.create()(UpdateForm);