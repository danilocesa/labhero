// @ts-nocheck
// LIBRARY
import React from 'react';
import { Select, Row,  Col,Icon, Button, Input,Form } from 'antd'; 
import { withRouter } from 'react-router-dom';
import PageTitle from 'shared_components/page_title';
import Barangay from './barangay'
import City from './city'
import Province from './province'


const { Option } = Select;


class Address extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addressType:'Barangay'
   		}
	}	
	      
	onAddressChange = (value) => {
		this.setState({
			addressType: value
		});
	};

	render() {
		const { addressType } = this.state;
		return(
			<div>
				<section style={{ textAlign: 'center', marginTop: 5 }}>
					<PageTitle pageTitle="ADDRESS" />
						<Row style={{ marginTop: 30 }}>
								<Select
									style={{ width: 300 }}
									onChange={this.onAddressChange}
								>
									<Option value="Barangay">Barangay</Option>
									<Option value="Province">Province</Option>
									<Option value="City">City</Option>
								</Select>
						</Row>
				</section>
					<div>
						{
							addressType === "Province" 
								? <Province/> : 
							(
								addressType === "City" 
									? <City/> : 
								<Barangay/>
							)
						}
					</div>
			</div>
		)
	}
}

export default withRouter(Address);