import React from 'react';
import { Table, Typography, Select, Row, Col, Drawer } from 'antd';

import EditProfile from '../../edit_patient_info';

const { Text } = Typography;
const { Option } = Select;

const columns = [
  {
    title: 'LAST NAME',
    dataIndex: 'lname',
    key: 'lname',
  },
  {
    title: 'FIRST NAME',
    dataIndex: 'fname',
    key: 'fname',
  },
  {
    title: 'MIDDLE NAME',
    dataIndex: 'mname',
    key: 'mname',
  },
  {
    title: 'DATE OF BIRTH',
    dataIndex: 'dob',
    key: 'dob',
  },
  {
    title: 'GENDER',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'CITY ADDRESS',
    dataIndex: 'c_address',
    key: 'c_address',
  }
];

const dataSource = [
  {
    key: '1',
    lname: 'Gulapa',
    fname: 'Mike',
    mname: 'E',
    dob: '11-25-1990',
    gender: 'Male',
    c_address: 'Pasay City',
  },
  {
    key: '2',
    lname: 'Gulapa',
    fname: 'Cherry',
    mname: 'J',
    dob: '11-11-1995',
    gender: 'Female',
    c_address: 'Taguig City',
  },
  {
    key: '3',
    lname: 'Gulapa',
    fname: 'Jane',
    mname: 'O',
    dob: '5-1-1998',
    gender: 'Female',
    c_address: 'Pasig City',
  },
  {
    key: '4',
    lname: 'Gulapa',
    fname: 'Henry',
    mname: 'A',
    dob: '1-5-1990',
    gender: 'Male',
    c_address: 'Makati City',
  },
];


class SearchTableResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false }
  }

  onClickShowDrawer = () => {
    this.setState({
      visible: true,
    });
    // console.log("hi");
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return(
	<div className="search-result-table">
		<Row>
			<Col span={12} style={{ textAlign:'left' }}>
				<Text>4 items out of 4 results</Text>
			</Col>
			<Col span={12} style={{ textAlign:'right' }}>
				<Text>Display per page</Text>
				<Select 
					size="small" 
					defaultValue="10" 
					style={{ marginLeft: 10 }} 
				>
					<Option value={5}>5</Option>
					<Option value={10}>10</Option>
					<Option value={15}>15</Option>
					<Option value={20}>20</Option>
				</Select>
			</Col>
		</Row>
		
		<Table 
			onRow={dataSource=>{
        return {
          onClick: () => this.onClickShowDrawer
        }
      }}

			dataSource={dataSource} 
			columns={columns} 
			pagination={false}
			size="small"
			style={{ marginTop: '10px' }}
		/>

		{
			this.state.visible ?
			(
				<Drawer
					title="Edit Patient Profile"
					onClose={this.onClose}
					width="35%"
					visible={this.state.visible}
				>
					<EditProfile />
				</Drawer>
			)
				:
				null
		}

	</div>
    );
  }
}

export default SearchTableResults;