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
import { buttonLabels, fieldLabels } from "../../settings/settings";

import "./index.css";

class LotsPerInventoryForm extends React.Component {
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

    return (
      <div className="lots-per-inventory-form">
        <AntForm 
          labelCol={{ span: 24 }}
          labelAlign="left"
          onSubmit={this.onSubmit}
        >
          <section style={{ marginBottom: 50 }}>
            {
              this.props.actionType === "update" 
              ? 
                (
                  <div style={{float: "left"}}>
                    <AntForm.Item
                      name="active"
                      label={fieldLabels.is_active}
                      labelCol={{ span: 14 }}
                      wrapperCol={{ span: 1 }}
                    >
                      <AntSwitch />
                    </AntForm.Item>
                  </div>
                ) 
              : null
            }

            <AntForm.Item
              name="lotCode"
              label="LOT CODE"
              className="no-padding"
            >
              <AntInput disabled />
            </AntForm.Item>

            <AntForm.Item
              name="itemName"
              label="ITEM"
              className="no-padding"
            >
              <AntInput  />
            </AntForm.Item>

            <AntForm.Item
              name="onHand"
              label="ON HAND"
              className="no-padding"
            >
              <AntInput  />
            </AntForm.Item>

            <AntForm.Item
              name="quantity"
              label="QUANTITY"
              className="no-padding"
            >
              <AntInput  />
            </AntForm.Item>

            <AntForm.Item
              name="amount"
              label="AMOUNT"
              className="no-padding"
            >
              <AntInput  />
            </AntForm.Item>

            <AntForm.Item
              name="expiryDate"
              label="EXPIRATION DATE"
              className="no-padding"
            >
              <AntInput  />
            </AntForm.Item>

            <AntForm.Item
              name="storage"
              label="STORAGE"
              className="no-padding"
            >
              <AntInput  />
            </AntForm.Item>

            <AntForm.Item
              name="supplier"
              label="SUPPLIER"
              className="no-padding"
            >
              <AntInput  />
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

LotsPerInventoryForm.propTypes = {
  panelInfo: PropTypes.object,
  drawerButton: PropTypes.string.isRequired,
  actionType: PropTypes.string,
  onCancel: PropTypes.func
};

LotsPerInventoryForm.defaultProps = {
  panelInfo: null,
  onCancel() { return null; }
};


export default withRouter(LotsPerInventoryForm);
