/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';

import './patientcomment.css';

const { TextArea } = Input;

class PatientComment extends React.Component {
  componentDidUpdate(prevProps) {
    const { form, remarks } = this.props;
    if(prevProps.remarks !== remarks) {
      form.setFieldsValue({ remarks });
    }
  }

  componentWillUnmount() {
    console.log('comment unmount');
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
        {getFieldDecorator('remarks')(
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