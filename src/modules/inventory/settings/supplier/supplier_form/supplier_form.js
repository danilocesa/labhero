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
import "./supplier_form.css";

const { TextArea } = AntInput;
class PanelFormTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.state = {
      loading: false,
    };
  }

  componentDidMount() { }

  onSubmit = () => { };

  render() {
    const { drawerButton } = this.props;

    return (
      <div className="inventory-supplier-drawer">
        <AntForm 
          ref={this.formRef}
          labelCol={{ span: 24 }}
          onFinish={this.onSubmit}
        >
          <section style={{ marginBottom: 50 }}>
            <AntRow gutter={12}>
              {
                this.props.actionType === "update" 
                ? (
                    <AntRow>
                      <div style={{ float: "left" }}>
                        <AntCol xs={24} sm={24}>
                          <AntForm.Item
                            name="active"
                            label={fieldLabels.is_active}
                            labelCol={{ span: 14 }}
                          >
                            <AntSwitch />
                          </AntForm.Item>
                        </AntCol>
                      </div>
                    </AntRow>
                  ) 
                : null
              }
            </AntRow>
            <AntRow gutter={12}>
              <AntCol span={16}>
                <AntForm.Item 
                  name="supplierName"
                  label={fieldLabels.suppliersName}
                  className="no-padding"
                >
                  <AntInput />
                </AntForm.Item>
              </AntCol>
            </AntRow>
            <AntRow gutter={12}>
              <AntCol span={8}>
                <AntForm.Item 
                  label={fieldLabels.suppliersContactPerson}
                  className="no-padding"
                >
                  <AntInput />
                </AntForm.Item>
              </AntCol>
              <AntCol span={8}>
                <AntForm.Item 
                  label={fieldLabels.suppliersContactNumber}
                  className="no-padding"
                >
                  <AntInput />
                </AntForm.Item>
              </AntCol>
              <AntCol span={8}>
                <AntForm.Item 
                  label={fieldLabels.suppliersEmailAddress}
                  className="no-padding"
                >
                  <AntInput />
                </AntForm.Item>
              </AntCol>
            </AntRow>
            <AntRow gutter={12}>
              <AntCol span={8}>
                <AntForm.Item 
                  label={fieldLabels.suppliersTin}
                  className="no-padding"
                >
                  <AntInput />
                </AntForm.Item>
              </AntCol>
              <AntCol span={8}>
                <AntForm.Item 
                  label={fieldLabels.suppliersUnit}
                  className="no-padding"
                >
                  <AntInput />
                </AntForm.Item>
              </AntCol>
              <AntCol span={8}>
                <AntForm.Item 
                  label={fieldLabels.suppliersStreet}
                  className="no-padding"
                >
                  <AntInput />
                </AntForm.Item>
              </AntCol>
            </AntRow>
            <AntRow gutter={12}>
              <AntCol span={8}>
                <AntForm.Item 
                  label={fieldLabels.suppliersBarangay}
                  className="no-padding"
                >
                  <AntInput />
                </AntForm.Item>
              </AntCol>
              <AntCol span={8}>
                <AntForm.Item 
                  label={fieldLabels.suppliersDistrict}
                  className="no-padding"  
                >
                  <AntInput />
                </AntForm.Item>
              </AntCol>
              <AntCol span={8}>
                <AntForm.Item 
                  label={fieldLabels.suppliersZipCode}
                  className="no-padding"
                >
                  <AntInput />
                </AntForm.Item>
              </AntCol>
            </AntRow>
            <AntRow gutter={12}>
              <AntCol span={16}>
                <AntForm.Item 
                  name="description"
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

PanelFormTemplate.propTypes = {
  drawerButton: PropTypes.string.isRequired,
  actionType: PropTypes.string,
  onCancel: PropTypes.func
};

PanelFormTemplate.defaultProps = {
  onCancel() { return null }
};

export default withRouter(PanelFormTemplate);

