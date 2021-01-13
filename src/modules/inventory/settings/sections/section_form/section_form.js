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
import "./section.css";

const { TextArea } = AntInput;
class SectionForm extends React.Component {
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
      <div className="inventory-sections-drawer">
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
                ) : null
            }

            <AntForm.Item
              name="section_code"
              label={fieldLabels.section_code}
              className="no-padding"
            >
              <AntInput disabled />
            </AntForm.Item>

            <AntForm.Item
              name="section_name"
              label={fieldLabels.section_name}
              className="no-padding"
            >
              <AntInput />
            </AntForm.Item>

            <AntForm.Item
              name="section_description"
              label={fieldLabels.section_description}
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

SectionForm.propTypes = {
  drawerButton: PropTypes.string.isRequired,
  actionType: PropTypes.string,
  onCancel: PropTypes.func
};

SectionForm.defaultProps = {
  onCancel() {
    return null;
  }
};

export default withRouter(SectionForm);
