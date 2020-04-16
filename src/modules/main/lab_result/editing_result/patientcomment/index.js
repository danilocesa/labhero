/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';
import errorMessage from 'global_config/error_messages';

import './patientcomment.css';

const { TextArea } = Input;

export const fieldRules = {
	remarks: [{ required: true, message: errorMessage.required }],
};

class PatientComment extends React.Component {
  componentDidUpdate(prevProps) {
    const { form, remarks } = this.props;
    if(prevProps.remarks !== remarks) {
      form.setFieldsValue({ remarks });
    }
  }

  getRemarks = () => {
		const { form } = this.props;
    let remarks = {};

		form.validateFieldsAndScroll((err, fieldsValue) => {
      remarks = {
        value: fieldsValue.remarks,
        hasError: err !== null
      };
    });
    
    return remarks;
  }


  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
			<div className="patient-comment">
        <Form.Item label="REMARKS">
        {getFieldDecorator('remarks', { rules: fieldRules.remarks })(
          <TextArea rows={3} />
        )}
        </Form.Item>
			</div>
    );
  }
}

PatientComment.propTypes = {
  remarks: PropTypes.string
};

PatientComment.defaultProps = {
  remarks: null
};

export default Form.create()(PatientComment);