// @ts-nocheck
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

import { buttonLabels, fieldLabels } from "../../settings";

// CSS
import "./category_form.css";

const { TextArea } = AntInput;
class CategoriesForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

    this.formRef = React.createRef();
  }

  

  componentDidMount() {
  
  }


  onSubmit = e => {
  
  };


  render() {
    const { drawerButton } = this.props;

    return (
      <div className="inventory-category-form">
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
              name="categories_code"
              label={fieldLabels.categories_code}
              className="no-padding"
            >
              <AntInput disabled />
            </AntForm.Item>

            <AntForm.Item
              name="categories_name"
              label={fieldLabels.categories_name}
              className="no-padding"
            >
              <AntInput />
            </AntForm.Item>

            <AntForm.Item
              name="categories_description"
              label={fieldLabels.categories_description}
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

CategoriesForm.propTypes = {
  drawerButton: PropTypes.string.isRequired,
  actionType: PropTypes.string,
  onCancel: PropTypes.func
};

CategoriesForm.defaultProps = {
  onCancel() {
    return null;
  }
};

export default withRouter(CategoriesForm);
