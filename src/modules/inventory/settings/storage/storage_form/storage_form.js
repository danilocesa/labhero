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
import "./storage_form.css";

class PanelFormTemplate extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
   
  }

  onSubmit = () => {
    
  };

  render() {
    const { drawerButton } = this.props;

    return (
      <div className="inventory-storage-drawer">
        <AntForm 
          ref={this.formRef}
          labelCol={{ span: 24 }}
          onFinish={this.onSubmit}
        >
          <section style={{ marginBottom: 50 }}>
            {
              this.props.actionType === "update" 
              ? (
                  <AntForm.Item
                    name="active"
                    label={fieldLabels.is_active}
                    labelCol={{ span: 14 }}
                  >
                    <AntSwitch />
                  </AntForm.Item>
                ) 
              : null
            }
            <AntForm.Item
              name="storage_name"
              label={fieldLabels.storage_name}
              className="no-padding"
            >
              <AntInput />
            </AntForm.Item>

            <AntForm.Item
              name="storage_description"
              label={fieldLabels.storage_description}
              className="no-padding"
            >
              <AntInput />
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

PanelFormTemplate.propTypes = {
  drawerButton: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  actionType: PropTypes.string
};

PanelFormTemplate.defaultProps = {
  onCancel() { return null }
};



export default withRouter(PanelFormTemplate);
