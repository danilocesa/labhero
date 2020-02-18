// /* eslint-disable react/prop-types */
// // LIBRARY
import React from 'react';
import { Drawer, Form, Input, Button, Select, Switch, Row, Col } from 'antd';
import PropTypes from 'prop-types';

import { drawerTitle, fieldRules, fieldLabels, formMode, buttonNames} from '../settings';
import FillupForm from '../fillup_form';


class AddForm extends React.Component {
	render() {
        const { onClose, visible, onSuccess, selectedSectionId,selectedSpecimenId} = this.props;
        return(
            <div>
                <FillupForm 
                drawerTitle={drawerTitle.update}
                fieldRules={fieldRules}
                fieldLabels={fieldLabels}
                buttonNames={buttonNames}
				addOrUpdate={formMode.add}
				updateData={null}
                onClose={onClose}
                visible={visible}
                onSuccess={onSuccess}
                selectedSectionId={selectedSectionId}
                selectedSpecimenId={selectedSpecimenId}
                />
            </div>
        );
    }	
}

AddForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
	onSuccess: PropTypes.func.isRequired,
	selectedSectionId: PropTypes.number,
	selectedSpecimenId: PropTypes.number
};

AddForm.defaultProps = {
	selectedSectionId: null,
	selectedSpecimenId: null
};

export default Form.create()(AddForm);