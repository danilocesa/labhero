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
			height: "100vh",
			marginTop: 10
		  }}
		>
		  <div  id="container" >
			<Modal
			  className="modal"
			  style={{ textAlign: "center" }}
			  title="SEARCH BY TRANSACTION NUMBER"
			  visible={this.state.isFirstModalOpen}
			  getContainer={this.getContainer}
			  onOk={this.RedirectToReceipt}
			  onCancel={this.toggleFirstModal}
			>
			  <div id = "container">
				<Input
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
			  onOk={this.RedirectToReceipt}
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
		  <div className = "menu">
				<Card className="cashier-item-card">
					<Row>
						<img
						type="primary"
						onClick={this.toggleFirstModal}
						className="browser"
						src={browser}
						alt="browser"
						/>
					</Row>
					<Row>
						<Col 
							span={24} 
							style={{ 
									marginTop:'10px', 
									fontWeight: "bold", 
									fontSize: '15px'
							}} 
							className={className}
						>
							<span>{label}</span>
						</Col>
					</Row>
				</Card>
				<Card className="cashier-item-card">
					<Row>
						<Link to="/transactions" >
							<img
							type="primary"
							className="browser"
							src={browser}
							alt="browser"
							/>
						</Link>
					</Row>
					<Row>
						<Col 
							span={24} 
							style={{ 
									marginTop:'10px', 
									fontWeight: "bold", 
									fontSize: '15px'
							}} 
							className={className}
						>
							<span>{label}</span>
						</Col>
					</Row>
				</Card>
				<Card className="cashier-item-card">
					<Row>
						<img
						type="primary"
						className="loupe"
						src={loupe}
						alt="loupe"
						onClick={this.toggleSecondModal}
						/>
					</Row>
					<Row>
						<Col 
							span={24} 
							style={{ 
									marginTop:'10px', 
									fontWeight: "bold", 
									fontSize: '15px'
							}} 
							className={className}
						>
							<span>{label}</span>
						</Col>
					</Row>
				</Card>
			</div>
		</Layout>
	  );
	}
  }
  
  export default Cashier;
