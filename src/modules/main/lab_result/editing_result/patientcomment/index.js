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
  constructor(props) {
    super(props);
    
    this.formRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { remarks } = this.props;
    if(prevProps.remarks !== remarks) {
      this.formRef.current.setFieldsValue({ remarks });
    }
  }

  getRemarks = async () => {
    let remarks = {};

    await this.formRef.current.validateFields()
    .then(values => {
      remarks = {
        value: values.remarks,
        hasError: false
      };
    })
    .catch(errorInfo => {
      remarks = {
        value: errorInfo.values.remarks,
        hasError: errorInfo !== null
      };
    });
    
    return remarks;
  }


  render() {
    const { resultStatus, onChangeResult } = this.props;

    return (
			<div className="patient-comment">
        <Form ref={this.formRef} layout="vertical">
          <Form.Item 
            name="remarks"
            label="REMARKS"
            rules={fieldRules.remarks}
          >
            <TextArea 
              rows={3} 
              disabled={resultStatus === 'Approve'}
              onChange={onChangeResult}
            />
            {/* {getFieldDecorator('remarks', { rules: fieldRules.remarks })(
              <TextArea 
                rows={3} 
                disabled={resultStatus === 'Approve'}
                onChange={onChangeResult}
              />
            )} */}
          </Form.Item>
        </Form>
			</div>
    );
  }
}

PatientComment.propTypes = {
  remarks: PropTypes.string,
  resultStatus: PropTypes.string.isRequired,
  onChangeResult: PropTypes.func.isRequired
};

PatientComment.defaultProps = {
  remarks: null
};

// export default Form.create()(PatientComment);
export default PatientComment;