/* eslint-disable react/no-unused-state */
/* eslint-disable func-names */
// LIBRARY
import React from "react";
import {
  Input as AntInput,
  Form as AntForm,
  Button as AntButton,
  Switch as AntSwitch,
} from "antd";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import {
  buttonLabels,
  fieldLabels} from "../../settings";

// CSS
import "./transaction.css";

const { TextArea } = AntInput;

class TransactionTypeForm extends React.Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.state = {
      loading: false,
    };

  }

  componentDidMount() {
    
  }

  onSubmit = () => {
    
  };


  render() {
    const { drawerButton } = this.props;

    return (
      <div className="inventory-transaction-drawer">
        <AntForm 
          ref={this.formRef}
          labelCol={{ span: 24 }}
          onFinish={this.onSubmit}
        >
          <section style={{ marginBottom: 50 }}>
            {
              this.props.actionType === "update" 
              ? (
                  <div style={{float: "left"}}>
                    <AntForm.Item
                      name="active"
                      label={fieldLabels.is_active}
                      labelCol={{ span: 14 }}
                    >
                      <AntSwitch />
                    </AntForm.Item>
                  </div>
                ) 
              : null
            }

            <AntForm.Item
              name="transaction_code"
              label={fieldLabels.transactionTypeCode}
              className="no-padding"
            >
              <AntInput disabled />
            </AntForm.Item>

            <AntForm.Item
              name="transaction_type_name"
              label={fieldLabels.transactionTypeName}
              className="no-padding"
            >
              <AntInput />
            </AntForm.Item>

            <AntForm.Item
              name="transaction_type_description"
              label={fieldLabels.transactionTypeDescription}
              className="no-padding"
            >
              <TextArea rows={4} />
            </AntForm.Item>
          </section>
          <section className="drawerFooter">
            <div>
              <AntButton
                shape="round"
                style={{ marginRight: 10, width: 120 }}
                onClick={this.props.onCancel}
              >
                {buttonLabels.cancel}
              </AntButton>
              <AntButton
                type="primary"
                shape="round"
                htmlType="submit"
                loading={this.state.loading}
                style={{ margin: 10, width: 120 }}
              >
                {drawerButton}
              </AntButton>
            </div>
          </section>
        </AntForm>
      </div>
    );
  }
}

TransactionTypeForm.propTypes = {
  drawerButton: PropTypes.string.isRequired,
  actionType: PropTypes.string,
  onCancel: PropTypes.func
};

TransactionTypeForm.defaultProps = {
  onCancel() {
    return null;
  }
};

export default withRouter(TransactionTypeForm);