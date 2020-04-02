import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import browser from "./browser.png";
import loupe from "./loupe.png";
import {
  Layout,
  Menu,
  Breadcrumb,
  Card,
  Row,
  Col,
  Modal,
  Button,
  Input,
  Descriptions
} from "antd";
import "./template.css";
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

class Cashier extends React.Component {
  // state = { visible: false };
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

  toggleSecondModal() {
    this.setState(({ isSecondModalOpen }) => ({
      isSecondModalOpen: !isSecondModalOpen
    }));
  }

  getContainer() {
    return document.getElementById("container");
  }
  // showModal = () => {
  //   this.setState({
  //     visible: true
  //   });
  // };

  // handleOk = e => {
  //   console.log(e);
  //   this.setState({
  //     visible: false
  //   });
  // };

  // handleCancel = e => {
  //   console.log(e);
  //   this.setState({
  //     visible: false
  //   });
  // };
  render() {
    console.log("=== state ===", this.state);
    return (
      // <Layout>
      //   <Header className=".main-header">
      //     <div className="logo" />
      //     <h1>LABHERO/CASHIER (Beta)</h1>
      //   </Header>
      // </Layout>
      <Layout
        className="layout"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          marginTop: 10
        }}
      >
        <div id="container">
          <Modal
            className="modal"
            style={{ textAlign: "center" }}
            title="SEARCH BY TRANSACTION NUMBER"
            visible={this.state.isFirstModalOpen}
            getContainer={this.getContainer}
            onOk={this.toggleFirstModal}
            onCancel={this.toggleFirstModal}
          >
            <div>
              <Input
                style={{ width: 400, marginBottom: 10 }}
                placeholder="Transaction Number"
              />
              <Button className="button-numbers" type="primary">
                1
              </Button>
              <Button className="button-numbers" type="primary">
                2
              </Button>
              <Button className="button-numbers" type="primary">
                3
              </Button>
            </div>
            <div>
              <Button className="button-numbers" type="primary">
                4
              </Button>
              <Button className="button-numbers" type="primary">
                5
              </Button>
              <Button className="button-numbers" type="primary">
                6
              </Button>
            </div>
            <div>
              <Button className="button-numbers" type="primary">
                7
              </Button>
              <Button className="button-numbers" type="primary">
                8
              </Button>
              <Button className="button-numbers" type="primary">
                9
              </Button>
            </div>
            <Button
              className="button-numbers"
              type="primary"
              style={{ width: 400 }}
            >
              0
            </Button>
          </Modal>
          <Modal
            style={{ textAlign: "center" }}
            title="SEARCH BY CATEGORY"
            visible={this.state.isSecondModalOpen}
            getContainer={this.getContainer}
            onOk={this.toggleSecondModal}
            onCancel={this.toggleSecondModal}
          >
            <div>
              <Button className="button-numbers" type="primary">
                Consultation
              </Button>
              <Button className="button-numbers" type="primary">
                Laboratory
              </Button>
              <Button className="button-numbers" type="primary">
                Medicine
              </Button>
            </div>
            <div>
              <Button className="button-numbers" type="primary">
                Check Up
              </Button>
              <Button className="button-numbers" type="primary">
                Book
              </Button>
              <Button className="button-numbers" type="primary">
                Pedia
              </Button>
            </div>
            <div>
              <Button className="button-numbers" type="primary">
                Optalmology
              </Button>
              <Button className="button-numbers" type="primary">
                OB Gyne
              </Button>
              <Button className="button-numbers" type="primary">
                Surgeon
              </Button>
            </div>
            <div>
              <Button className="button-numbers" type="primary">
                Theraphy
              </Button>
              <Button className="button-numbers" type="primary">
                Xray
              </Button>
              <Button className="button-numbers" type="primary">
                Ultrasound
              </Button>
            </div>
          </Modal>
        </div>
        <Row
          style={{
            type: "flex",
            // display: "inline-flex",
            align: "middle",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Col span={12}>
            <Content>
              <div
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                className="site-card-border-less-wrapper"
              >
                <Card
                  title="SEARCH BY TRANSACTION NUMBER"
                  bordered={true}
                  style={{
                    textAlign: "center",
                    width: 550,
                    marginTop: 2,
                    height: 350,
                    color: "#3aa2fb!important"
                  }}
                >
                  <img
                    type="primary"
                    onClick={this.toggleFirstModal}
                    className="browser"
                    src={browser}
                    alt="browser"
                  />
                </Card>
              </div>
            </Content>
          </Col>
          <Col span={12}>
            <Content>
              <div className="site-card-border-less-wrapper">
                <Card
                  title="SEARCH BY CATEGORY"
                  bordered={true}
                  style={{
                    textAlign: "center",
                    width: 550,
                    marginTop: 2,
                    height: 350
                  }}
                >
                  <img
                    type="primary"
                    className="loupe"
                    src={loupe}
                    alt="loupe"
                    onClick={this.toggleSecondModal}
                  />
                </Card>
              </div>
            </Content>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default Cashier;
