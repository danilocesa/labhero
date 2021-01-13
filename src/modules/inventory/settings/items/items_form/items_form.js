/* eslint-disable func-names */
// LIBRARY
import React from "react";
import {
  Input as AntInput,
  Form as AntForm,
  Button as AntButton,
  Row as AntRow,
  Switch as AntSwitch,
  Col as AntCol
} from "antd";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import {
  buttonLabels,
  fieldLabels,
} from "../../settings";

// CSS
import "./items_form.css";

const { TextArea } = AntInput;



class ItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
  }

  componentDidMount() { }

  onSubmit = () => { };

  render() {
    const { drawerButton } = this.props;

    return (
      <div className="inventory-items-drawer">
        <AntForm 
          ref={this.formRef}
          labelCol={{ span: 24 }}
          onFinish={this.onSubmit}
        >
          <section style={{ marginBottom: 50 }}>
            <AntRow gutter={8}>
              {
                this.props.actionType === "update" 
                ? (
                    <div style={{ float: "left" }}>
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
              <AntCol xs={24} sm={24}>
                <AntForm.Item 
                  label={fieldLabels.itemName}
                  className="no-padding"
                >
                  <AntInput />
                </AntForm.Item>
              </AntCol>
              <AntCol span={8}>
                <AntForm.Item 
                  label={fieldLabels.itemCategory}
                  className="no-padding"
                >
                  <AntInput />
                </AntForm.Item>
              </AntCol>
              <AntCol span={8}>
                <AntForm.Item 
                  label={fieldLabels.itemSection}
                  className="no-padding"
                >
                  <AntInput />
                </AntForm.Item>
              </AntCol>
              <AntCol span={8}>
                <AntForm.Item 
                  label={fieldLabels.itemUnitOfMeasure}
                  className="no-padding"
                >
                  <AntInput />
                </AntForm.Item>
              </AntCol>
              <AntCol span={8}>
                <AntForm.Item 
                  label={fieldLabels.itemDefaultAmount}
                  className="no-padding"
                >
                  <AntInput />
                </AntForm.Item>
              </AntCol>
              <AntCol span={8}>
                <AntForm.Item 
                  label={fieldLabels.itemSkuBarcode}
                  className="no-padding"
                >
                  <AntInput />
                </AntForm.Item>
              </AntCol>
              <AntCol span={8}>
                <AntForm.Item 
                  label={fieldLabels.itemsUpcBarcode}
                  className="no-padding"
                >
                  <AntInput />
                </AntForm.Item>
              </AntCol>
              <AntCol span={24}>
                <AntForm.Item 
                  name="panel_name"
                  label={fieldLabels.suppliersItemDescription}
                  className="no-padding"
                >
                  <TextArea rows={1} />
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

ItemForm.propTypes = {
  drawerButton: PropTypes.string.isRequired,
  actionType: PropTypes.string,
  onCancel: PropTypes.func
};

ItemForm.defaultProps = {
  onCancel() {
    return null;
  }
};

export default withRouter(ItemForm);