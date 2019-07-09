// LIBRARY
import React from 'react';
import { Row, Col, Table, Select, Drawer, Typography, Empty, Card } from 'antd';

// CUSTOM MODULES
import PatientInfo from '../../patientinfo';


// CSS
import './searchresult.css';
import axiosCall from 'services/axiosCall';

// CONSTANTS
const { Option } = Select;
const { Text } = Typography;

class WrapperSearchLabTestResultList extends React.Component {
  state = {
		showPatientInfo: false,
		showLoading: true,
		isLoading: false
	};

  // React lifecycle
  componentWillMount() {
    // axiosCall({ method: 'get', url: 'waiverChecker', params: { waiver_id: 1, token: cookies.get('user_token') } }).then((resp) => {
    //   const showMods = resp.data.data.length !== 0 ? this.setState({ showModal: false }) : null
    //   return showMods
    // })
  }  
 
  componentDidMount() 
  {
    this.setState({
      showLoading: false
    });
  } 

 



  // Custom function
  onSampleIDClick = () => {
    this.setState({
      showPatientInfo: true,
    });
  }

  onClosePatientInfoDrawer = () => {
    this.setState({
      showPatientInfo: false,
    });
  }

  expandedRowRender = async (record) => {
    // const columns = [
    //   {
    //     title: 'REQUEST DATE',
    //     dataIndex: 'RequestDate',
    //     key: 'RequestDate',
    //     align: 'center',
    //     width:'25%',
    //   },
    //   {
    //     title: 'SAMPLE ID',
    //     dataIndex: 'SampleId',
    //     key: 'SampleId',
    //     render: text =>  <Text onClick={this.onSampleIDClick} className="sampleLabTestID">{text}</Text>,
    //     width:'25%',
    //   },
    //   { title: 'STATUS', 
    //     dataIndex: 'Status', 
    //     key: 'Status',
    //     width:'25%',
    //   },
    //   { title: 'HISLINK', 
    //     dataIndex: 'HisLink', 
    //     key: 'HisLink',
    //     width:'25%',
    //   },
    // ];
    const data = [];
    const teststatus = ['On-going', 'Verified', 'Cancelled'];
    for (let i = 1; i < 20; i+=1) {
      data.push({
        key: i*1000,
        RequestDate: '04/11/2019',
        SampleId: `100${i}`,
        Status: teststatus[Math.floor(Math.random() * teststatus.length)],
        HisLink: `190411200i${i}`,
      });
		}
		
		const exams = await this.fetchExams();
		const columns = [
      {
        title: 'sectionID',
        dataIndex: 'sectionID',
        key: 'RequestDate',
        align: 'center',
        width:'25%',
      },
      {
        title: 'sectionName',
        dataIndex: 'sectionName',
        key: 'SampleId',
        render: text =>  <Text onClick={this.onSampleIDClick} className="sampleLabTestID">{text}</Text>,
        width:'25%',
      },
      { title: 'sectionCode', 
        dataIndex: 'sectionCode', 
        key: 'Status',
        width:'25%',
      },
    ];
		
		console.log(exams);

    return (
	    <Table
		    columns={columns}
		    dataSource={exams}
		    pagination={false}
		    size="small"
		    scroll={{ y: 200 }}
	    />
		);
  };

	fetchExams = async () => {
		const response = await axiosCall({
			method: 'GET',
			url: 'Section',
		});

		return response.data;
	}

  render() {  
    const columns = [
    { 
      title: 'PATIENT ID', 
      dataIndex: 'PatientID', 
      key: 'PatientID',
      sorter: (a, b) => a.PatientID - b.PatientID, 
    },
    { 
      title: 'HOSPITAL ID', 
      dataIndex: 'HospitalID', 
      key: 'HospitalID',
      sorter: (a, b) => a.HospitalID - b.HospitalID, 
    },
    { title: 'LAST NAME', 
      dataIndex: 'LastName', 
      key: 'LastName',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => { return a.LastName.localeCompare(b.LastName)}, 
      },
    { title: 'FIRST NAME', 
      dataIndex: 'FirstName', 
      key: 'FirstName',
      sorter: (a, b) => { return a.FirstName.localeCompare(b.FirstName)},
      },
    { title: 'DATE OF BIRTH', 
      dataIndex: 'DateOfBirth', 
      key: 'DateOfBirth',
      sorter: (a, b) => a.DateOfBirth.length - b.DateOfBirth.length,
    },
    { title: 'GENDER', 
      dataIndex: 'Gender', 
      key: 'Gender',
      sorter: (a, b) => { return a.Gender.localeCompare(b.Gender)},
    },
    { title: 'ADDRESS', 
      dataIndex: 'Address', 
      key: 'Address',
      sorter: (a, b) => { return a.Address.localeCompare(b.Address)},
    },
    ];
    const data = [];
    const testfirstname = ['Dante', 'Matthew', 'Maria'];
    const testgender = ['M', 'F'];
    const testcityaddress = ['Pasig', 'Pasay', 'Manila'];
		const testlastname = ['Doe','Taylor','Green'];
		const { isLoading } = this.state;
		
    for (let i = 1; i < 1500; i += 1) {
        data.push({
        key: i*2000,
        PatientID: `000${i}`,
        HospitalID: `${i*4}00${i}`,
        LastName: testlastname[Math.floor(Math.random() * testlastname.length)],
        FirstName: testfirstname[Math.floor(Math.random() * testfirstname.length)],
        DateOfBirth: '01/01/1990',
        Gender: testgender[Math.floor(Math.random() * testgender.length)],
        Address: testcityaddress[Math.floor(Math.random() * testcityaddress.length)],
      });
    }
    const emptyTableData = <Card><Empty /></Card>
    return (
	    <div>
		    <Row style={{ paddingBottom: '0.5em' }} type="flex">
			    <Col md={12} className="gutter-row">
				    <Text strong> Search Lab Result </Text>
				    <br />
				    <Text> Showing <b>0</b> items out of <b>0</b> results </Text>
			    </Col>
			    <Col md={10} className="gutter-row" style={{ lineHeight : '2.5em'}}>
				    <Text className="gutter-box" style={{ float:'right', marginRight:'1em' }}>
              Display per page 
				    </Text>
			    </Col>
			    <Col className="gutter-row">
				    <Select defaultValue="10" style={{ width: '100%' }} className="gutter-box">
					    <Option value="10">10</Option>
					    <Option value="20">20</Option>
					    <Option value="50">50</Option>
					    <Option value="100">100</Option>
				    </Select>
			    </Col>
		    </Row>
		    <Row type="flex">
			    <Col lg={24} xs={24}>
						<Table
							className="searchLabTestResultTable"
							columns={columns}
							expandedRowRender={this.expandedRowRender}
							dataSource={data || emptyTableData}
							size="small"
							scroll={{ y: 300 }}
							loading={isLoading}
							onExpand={(exapanded, record) => { console.log('onexpand'); }}
						/>
			    </Col>
		    </Row>
					<Drawer
						title="Patient information"
						onClose={this.onClosePatientInfoDrawer}
						width="80%"
						visible={this.state.showPatientInfo}
					>
					<PatientInfo /> 
					</Drawer>
	    </div>
    );
  }
}
    
export default WrapperSearchLabTestResultList;
