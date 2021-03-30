import React, { Component } from 'react'
import { Select, Row } from 'antd'; 
import ProvinceAddressTable from './table/provinceTable'
import CityAddressTable from './table/cityTable'
import BarangayAddressTable from './table/barangayTable'

const { Option } = Select;
export default class Address extends Component {
  constructor(props) {
		super(props);
		this.state = { addressType:'Province' }
	}

  onAddressChange = (value) => {
		this.setState({ addressType: value });
	};

  render() {
    const { addressType } = this.state;
    return (
      <div>
        <section style={{ textAlign: 'center', marginTop: 5 }}>
          <Select style={{ width: 300 }} onChange={this.onAddressChange}>
            <Option value="Barangay">Barangay</Option>
            <Option value="Province">Province</Option>
            <Option value="City">City</Option>
          </Select>
				</section>
        {
          addressType === "Province" 
            ? <ProvinceAddressTable/> : 
          (
            addressType === "City" 
              ? <CityAddressTable/> : 
            <BarangayAddressTable/>
          )
        }
      </div>
    )
  }
}
