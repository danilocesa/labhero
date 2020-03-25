import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import browser from "./browser.png";
import loupe from "./loupe.png";
import Receipt from './receipt'
import {
  Layout,
  Menu,
  Card,
  Row,
  Col,
  Modal,
  Button,
  Input
} from "antd";
import "./cashier.css";
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;


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

	RedirectToReceipt(){
		window.location = "http://localhost:3000/receipt"
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
	  const { image, link, label, offset, className } = this.props;
	  return (
		<Layout
		className="layout"
		style={{
		  display: "flex",
		  justifyContent: "center",
		  alignItems: "center",
		//   height: "100vh",
		  marginTop: 10
		}}
	  >
		<div className = "Menu">
			<Row>
				<Col span={8}>
				  <Card className="cashier-item-card">
					  <img
					  onClick={this.toggleFirstModal}
					  className="browser"
					  src={browser}
					  alt="browser"
					  />
					  <br></br>
					  <span>Search By Request ID</span>
				  </Card>
				</Col>
				<Col span={8}>
				  <Card className="cashier-item-card">
					<Link to="/transactions" >
							<img
							type="primary"
							className="browser"
							src={browser}
							alt="browser"
							/>
					</Link>
					<br></br>
					  <span>View All Request</span>
				  </Card>
				</Col>
				<Col span={8}>
				  <Card className="cashier-item-card">
					<Link to="/receipt" >
						<img
							type="primary"
							className="loupe"
							src={loupe}
							alt="loupe"
							/>
							<br></br>
							<span>Search By Category</span>
						</Link>
				  </Card>
				</Col>
			</Row>
		  </div>
		  <div  id="container" >
		  <Modal
			className="modal"
			style={{ textAlign: "center" }}
			title="SEARCH BY REQUEST ID"
			visible={this.state.isFirstModalOpen}
			getContainer={this.getContainer}
			onOk={this.RedirectToReceipt}
			onCancel={this.toggleFirstModal}
		  >
			<div >
			  <Input style={{ marginBottom: 20 }}
				placeholder="Request ID"
			  />
			  <Button className="ant-btn-round" type="primary">
				1
			  </Button>
			  <Button className="ant-btn-round" type="primary">
				2
			  </Button>
			  <Button className="ant-btn-round" type="primary">
				3
			  </Button>
			</div>
			<div >
			  <Button className="ant-btn-round" type="primary">
				4
			  </Button>
			  <Button className="ant-btn-round" type="primary">
				5
			  </Button>
			  <Button className="ant-btn-round" type="primary">
				6
			  </Button>
			</div>
			<div >
			  <Button className="ant-btn-round" type="primary">
				7
			  </Button>
			  <Button className="ant-btn-round" type="primary">
				8
			  </Button>
			  <Button className="ant-btn-round" type="primary">
				9
			  </Button>
			</div>
			<Button
			  className="ant-btn-round"
			  type="primary"
			  style={{ width: 330, marginBottom: 10,marginTop: 10 }}
			>
			  0
			</Button>
		  </Modal>
		  {/* <Modal
		    className="modal"
			style={{ textAlign: "center" }}
			title="SEARCH BY CATEGORY"
			visible={this.state.isSecondModalOpen}
			getContainer={this.getContainer}
			onOk={this.RedirectToReceipt}
			onCancel={this.toggleSecondModal}
		  >
			<div>
			  <Button className="ant-btn-round" type="primary">
				Consultation
			  </Button>
			  <Button className="ant-btn-round" type="primary">
				Laboratory
			  </Button>
			  <Button className="ant-btn-round" type="primary">
				Medicine
			  </Button>
			</div>
			<div>
			  <Button className="ant-btn-round" type="primary">
				Check Up
			  </Button>
			  <Button className="ant-btn-round" type="primary">
				Book
			  </Button>
			  <Button className="ant-btn-round" type="primary">
				Pedia
			  </Button>
			</div>
			<div>
			  <Button className="ant-btn-round" type="primary">
				Optalmology
			  </Button>
			  <Button className="ant-btn-round" type="primary">
				OB Gyne
			  </Button>
			  <Button className="ant-btn-round" type="primary">
				Surgeon
			  </Button>
			</div>
			<div>
			  <Button className="ant-btn-round" type="primary">
				Theraphy
			  </Button>
			  <Button className="ant-btn-round" type="primary">
				Xray
			  </Button>
			  <Button className="ant-btn-round" type="primary">
				Ultrasound
			  </Button>
			</div>
		  </Modal> */}
		</div>
	  </Layout>
	  );
	}
  }
  
  export default Cashier;
