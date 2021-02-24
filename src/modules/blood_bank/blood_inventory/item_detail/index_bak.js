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
import { buttonLabels, fieldLabels } from "../settings";

// import "./index.css";

class BloodInventoryDetails extends React.Component {
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
              name="bagID"
              label="BAG ID"
              className="no-padding"
            >
              <AntInput disabled />
            </AntForm.Item>

            <AntForm.Item
              name="bloodType"
              label="BLOOD TYPE"
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
              name="dateExtracted"
              label="DATE EXTRACTED"
              className="no-padding"
            >
              <AntInput  />
            </AntForm.Item>

            <AntForm.Item
              name="expirationDate"
              label="EXPIRATION DATE"
              className="no-padding"
            >
              <AntInput  />
            </AntForm.Item>

            <AntForm.Item
              name="hospitalName"
              label="HOSPITAL"
              className="no-padding"
            >
              <AntInput  />
            </AntForm.Item>

            <AntForm.Item
              name="donorID"
              label="DONOR ID"
              className="no-padding"
            >
              <AntInput disabled />
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

BloodInventoryDetails.propTypes = {
  panelInfo: PropTypes.object,
  drawerButton: PropTypes.string.isRequired,
  actionType: PropTypes.string,
  onCancel: PropTypes.func
};

BloodInventoryDetails.defaultProps = {
  panelInfo: null,
  onCancel() { return null; }
};

export default withRouter(BloodInventoryDetails);
