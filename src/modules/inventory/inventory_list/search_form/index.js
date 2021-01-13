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
  Col as AntCol
} from "antd";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { buttonLabels, fieldLabels } from "../../settings/settings";

import "./index.css";


class InventoryListForm extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  state = {
    loading: false,
  };

  componentDidMount() {
 
  }

  onSubmit = () => {
   
  };

  render() {
    const { drawerButton } = this.props;
    const layout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };

    return (
      <div className="inventory-list-category-drawer">
        <AntForm 
          {...layout}
          onSubmit={this.onSubmit}
        >
          <section style={{ marginBottom: 50 }}>
            {
              this.props.actionType === "update" 
              ? (
                  <AntRow>
                    <div style={{float: "left"}}>
                    <AntCol xs={24} sm={24}>
                      <AntForm.Item
                        name="active"
                        label={fieldLabels.is_active}
                        labelCol={{ span: 14 }}
                        wrapperCol={{ span: 1 }}
                      >
                        <AntSwitch />
                      </AntForm.Item>
                    </AntCol>
                    </div>
                  </AntRow>
                ) 
              : null
            }

            <AntForm.Item
              name="ItemListName"
              label={fieldLabels.ItemListName}
              className="no-padding"
            >
              <AntInput disabled />
            </AntForm.Item>

            
            <AntForm.Item
              name="ItemListQuantity"
              label={fieldLabels.ItemListQuantity}
              className="no-padding"
            >
              <AntInput />
            </AntForm.Item>

            <AntForm.Item
              name="ItemListThreshold"
              label={fieldLabels.ItemListThreshold}
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

InventoryListForm.propTypes = {
  drawerButton: PropTypes.string.isRequired,
  actionType: PropTypes.string,
  onCancel: PropTypes.func
};

InventoryListForm.defaultProps = {
  form() { return null; },
  onCancel() { return null; }
};


export default withRouter(InventoryListForm);