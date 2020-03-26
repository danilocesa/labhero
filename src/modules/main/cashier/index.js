import React from 'react';
import { Link } from 'react-router-dom';
import browser from "./browser.png";
import loupe from "./loupe.png";
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
		window.location = "http://localhost:3000/cashier/transactions"
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
		<div className = "cashier-menu">
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
					<Link to="/cashier/transactions" >
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
					<Link to="/cashier/categories" >
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
			<div  className= "cashier-modal-container" id="container" >
				<Modal
					style={{ textAlign: "center", }}
					title="SEARCH BY REQUEST ID"
					visible={this.state.isFirstModalOpen}
					getContainer={this.getContainer}
					onOk={this.RedirectToReceipt}
					onCancel={this.toggleFirstModal}
				>
					
					<Input style={{ marginBottom: 20, width: 320 }}
						placeholder="Request ID"
					/>
					<br></br>
					<Button className="ant-btn-round" type="primary" style={{marginRight: 5, marginButtom: 10, width: 100, width: 100}}>
						1
					</Button>
					<Button className="ant-btn-round" type="primary" style={{marginRight: 5, marginButtom: 10, width: 100, width: 100}}>
						2
					</Button>
					<Button className="ant-btn-round" type="primary" style={{marginRight: 5, marginButtom: 10, width: 100, width: 100}}>
						3
					</Button>
					
					
					<Button className="ant-btn-round" type="primary" style={{marginRight: 5, marginButtom: 10, width: 100, width: 100}}>
						4
					</Button>
					<Button className="ant-btn-round" type="primary" style={{marginRight: 5, marginButtom: 10, width: 100, width: 100}}>
						5
					</Button>
					<Button className="ant-btn-round" type="primary" style={{marginRight: 5, marginButtom: 10, width: 100, width: 100}}>
						6
					</Button>
					
					
					<Button className="ant-btn-round" type="primary"style={{marginRight: 5, marginButtom: 10, width: 100, width: 100}}>
						7
					</Button>
					<Button className="ant-btn-round" type="primary" style={{marginRight: 5, marginButtom: 10, width: 100, width: 100}}>
						8
					</Button>
					<Button className="ant-btn-round" type="primary" style={{marginRight: 5, marginButtom: 10, width: 100, width: 100}}>
						9
					</Button>
					
					<Button
					className="ant-btn-round"
					type="primary"
					style={{ width: 320, marginBottom: 10,marginTop: 10 }}
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
