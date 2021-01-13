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
  Row as AntRow,
  Col as AntCol,
} from "antd";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// CUSTOM MODULES
import HttpCodeMessage from "shared_components/message_http_status";

import {
  updateInventoryItems,
  createInventoryItems,
} from "services/inventory/inventoryCategory";
import {
  messagePrompts,
  buttonLabels,
  fieldLabels,
  drawerAdd,
} from "../../settings";

// CSS
import "./category_form.css";

const { TextArea } = AntInput;
class PanelFormTemplate extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  state = {
    // eslint-disable-next-line react/no-unused-state
    examRequestData: [],
    SelectedCategoryRequest: [],
    loading: false,
    examRequestValidation: false,
  };

  handleSubmit = () => {
    // event.preventDefault(); event
    const { form, drawerButton, panelInfo } = this.props;

    form.validateFields(async (err, values) => {
      if (!err) {
        const vData = {
          category_id: panelInfo.category_id,
          category_code: values.category_code.toUpperCase(),
          category_desc: values.category_desc.toUpperCase(),
          category_name: values.category_name.toUpperCase(),
          is_active: values.active === "checked" ? true : false,
          created_by: 1,
        };

        if (drawerButton === drawerAdd) {
          const createdUserResponse = await createInventoryItems(vData);
          console.log("createUserAPI:", createdUserResponse);

          if (createdUserResponse.status === 201) {
            const httpMessageConfig = {
              message: messagePrompts.successAddCategoryInv,
              // @ts-ignore
              status: createdUserResponse.status,
              duration: 3,
              onClose: () => this.props.onCancel(),
            };
            HttpCodeMessage(httpMessageConfig);
          }
        } else {
          // vData.category_code = values.category_code;
          const updatecategoryResponse = await updateInventoryItems(
            vData
          ).catch((reason) => console.log("TCL->", reason));

          if (updatecategoryResponse.status === 200) {
            const httpMessageConfig = {
              message: messagePrompts.successUpdateUser,
              // @ts-ignore
              status: updatecategoryResponse.status,
              duration: 3,
              onClose: () => this.props.onCancel(),
            };
            HttpCodeMessage(httpMessageConfig);
          }
        }
      }
    });
  };

  render() {
    const { panelInfo, drawerButton } = this.props;
    const disabled = panelInfo.is_active === true;
    const disableField = !(drawerButton === drawerAdd);
    console.log("value from table", panelInfo);
    return (
      <div className="inventory-category-drawer">
        <AntForm
          layout="vertical"
          onFinish={this.handleSubmit}
          initialValues={{
            category_code: panelInfo.category_code,
            category_name: panelInfo.category_name,
            category_desc: panelInfo.category_desc,
          }}
        >
          <section style={{ marginBottom: 50 }}>
            <AntRow gutter={12}>
              {this.props.actionType === "update" ? (
                <AntRow>
                  <div style={{ float: "left" }}>
                    <AntCol xs={24} sm={24}>
                      <AntForm.Item
                        label={fieldLabels.is_active}
                        // labelCol={{ span: 14 }}
                        // wrapperCol={{ span: 1 }}
                        name="active"
                      >
                        <AntSwitch defaultChecked={disabled} />
                      </AntForm.Item>
                    </AntCol>
                  </div>
                </AntRow>
              ) : null}
              <AntCol span={24}>
                <AntForm.Item
                  label={fieldLabels.categories_code}
                  className={panelInfo ? null : "hide"}
                  name="category_code"
                >
                  <AntInput disabled={disableField} />
                </AntForm.Item>
              </AntCol>
              <AntCol span={24}>
                <AntForm.Item
                  label={fieldLabels.categories_name}
                  className={panelInfo ? null : "hide"}
                  name="category_name"
                >
                  <AntInput />
                </AntForm.Item>
              </AntCol>
              <AntCol span={24}>
                <AntForm.Item
                  label={fieldLabels.categories_description}
                  className={panelInfo ? null : "hide"}
                  name="category_desc"
                >
                  <TextArea rows={4} />
                </AntForm.Item>
              </AntCol>
            </AntRow>
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
  panelInfo: PropTypes.object,
  drawerButton: PropTypes.string.isRequired,
  form: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  actionType: PropTypes.string,
  onCancel: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  onClose: PropTypes.func,
};

PanelFormTemplate.defaultProps = {
  panelInfo: null,
  form() {
    return null;
  },
  onCancel() {
    return null;
  },
  onClose() {
    return null;
  },
};

// const PanelForm = AntForm.create()(withRouter(PanelFormTemplate));

export default withRouter(PanelFormTemplate);
