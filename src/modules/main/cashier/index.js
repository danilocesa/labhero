import React from "react";
import { Link } from "react-router-dom";
import { CAviewallIcon, CAviewrequestIcon, CAsearchcategoryIcon } from "images";
import { Layout, Card, Row, Col, Modal, Button } from "antd";
import "./cashier.css";
import { NumberInput } from "shared_components/pattern_input";

class Cashier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstModalOpen: false,
      isSecondModalOpen: false
    };

    this.toggleFirstModal = this.toggleFirstModal.bind(this);
    this.toggleSecondModal = this.toggleSecondModal.bind(this);
  }

  toggleFirstModal() {
    this.setState(({ isFirstModalOpen }) => ({
      isFirstModalOpen: !isFirstModalOpen
    }));
  }

  RedirectToReceipt() {
    // @ts-ignore
    window.location = "/cashier/transactions";
  }

  toggleSecondModal() {
    this.setState(({ isSecondModalOpen }) => ({
      isSecondModalOpen: !isSecondModalOpen
    }));
  }

  getContainer() {
    return document.getElementById("container");
  }

  render() {
    console.log("=== state ===", this.state);
    // const { image, link, label, offset, className } = this.props;
    return (
      <Layout
        className="layout"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10
        }}
      >
        <div className="cashier-menu">
          <div
            className="ant-row-flex ant-row-flex-center"
            style={{ marginBottom: 20 }}
          >
            <h4 className="ant-typography">CASHIER</h4>
          </div>
          <Row>
            <Col style={{ paddingLeft: 15, paddingRight: 15 }} span={8}>
              <Card
                className="cashier-item-card"
                onClick={this.toggleFirstModal}
              >
                <img
                  style={{ height: 45, width: "auto" }}
                  className="view_request"
                  src={CAviewrequestIcon}
                  alt="view_request"
                />
                <br></br>
                <br></br>
                <span>
                  SEARCH <br></br> REQUEST ID
                </span>
              </Card>
            </Col>
            <Col style={{ paddingLeft: 15, paddingRight: 15 }} span={8}>
              <Link to="/cashier/transactions">
                <Card className="cashier-item-card">
                  <img
                    style={{ height: 45, width: "auto" }}
                    className="view_all"
                    src={CAviewallIcon}
                    alt="view_all"
                  />
                  <br></br>
                  <br></br>
                  <span>
                    VIEW ALL <br></br> TRANSACTIONS
                  </span>
                </Card>
              </Link>
            </Col>
            <Col style={{ paddingLeft: 15, paddingRight: 15 }} span={8}>
              <Link to="/cashier/categories">
                <Card className="cashier-item-card">
                  <img
                    style={{ height: 45, width: "auto" }}
                    className="search_category"
                    src={CAsearchcategoryIcon}
                    alt="search_category"
                  />
                  <br></br>
                  <br></br>
                  <span>
                    SEARCH <br></br> CATEGORY
                  </span>
                </Card>
              </Link>
            </Col>
          </Row>
        </div>
        <div className="cashier-modal-container" id="container">
          <Modal
            style={{ textAlign: "center" }}
            title="SEARCH REQUEST ID"
            visible={this.state.isFirstModalOpen}
            getContainer={this.getContainer}
            onOk={this.RedirectToReceipt}
            onCancel={this.toggleFirstModal}
          >
            <NumberInput
              maxLength={20}
              style={{ marginBottom: 20, width: 320 }}
              placeholder="Request ID"
            />
            <br></br>
            <Button
              className="ant-btn-round"
              type="primary"
              style={{
                marginRight: 5,
                marginBottom: 10,
                width: 100
              }}
            >
              1
            </Button>
            <Button
              className="ant-btn-round"
              type="primary"
              style={{
                marginRight: 5,
                marginBottom: 10,
                width: 100
              }}
            >
              2
            </Button>
            <Button
              className="ant-btn-round"
              type="primary"
              style={{
                marginRight: 5,
                marginBottom: 10,
                width: 100
              }}
            >
              3
            </Button>

            <Button
              className="ant-btn-round"
              type="primary"
              style={{
                marginRight: 5,
                marginBottom: 10,
                width: 100
              }}
            >
              4
            </Button>
            <Button
              className="ant-btn-round"
              type="primary"
              style={{
                marginRight: 5,
                marginBottom: 10,
                width: 100
              }}
            >
              5
            </Button>
            <Button
              className="ant-btn-round"
              type="primary"
              style={{
                marginRight: 5,
                marginBottom: 10,
                width: 100
              }}
            >
              6
            </Button>

            <Button
              className="ant-btn-round"
              type="primary"
              style={{
                marginRight: 5,
                marginBottom: 10,
                width: 100
              }}
            >
              7
            </Button>
            <Button
              className="ant-btn-round"
              type="primary"
              style={{
                marginRight: 5,
                marginBottom: 10,
                width: 100
              }}
            >
              8
            </Button>
            <Button
              className="ant-btn-round"
              type="primary"
              style={{
                marginRight: 5,
                marginBottom: 10,
                width: 100
              }}
            >
              9
            </Button>

            <Button
              className="ant-btn-round"
              type="primary"
              style={{ width: 320, marginBottom: 10, marginTop: 10 }}
            >
              0
            </Button>
          </Modal>
        </div>
      </Layout>
    );
  }
}

export default Cashier;
