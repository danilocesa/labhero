// @ts-nocheck
// LIBRARY
import React from 'react';
import { Select } from 'antd'; 
import ProvinceTable from 'modules/main/settings/hospital';
import BarangayTable from './barangay'
import CityTable from './city'



const { Option } = Select;

function handleChange(value) {
   if(value = "Province"){
     return 
     <div>
         <ProvinceTable/>
     </div>;
   }else if (value="Barangay"){
       return <BarangayTable />
   } else (value ="City")
   return <CityTable />
  }

class Address extends React.Component {
	
	render() {
			return(
                <div>
                    <Select
                        style={{ width: 120 }}
                        onChange={handleChange}
                    >
                        <Option value="Barangay">Barangay</Option>
                        <Option value="Province">Province</Option>
                        <Option value="City">City</Option>
                    </Select>				
                </div>
			)
	}
}


export default Address;