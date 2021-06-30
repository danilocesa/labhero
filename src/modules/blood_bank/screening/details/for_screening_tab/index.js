// @ts-nocheck
import React from "react"
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { MoreOutlined } from '@ant-design/icons';
import { Table, Input , Button, Tabs, Popover, Select, Checkbox, Row, Anchor, Col, message } from 'antd';

import { extractSample } from 'services/blood_bank/screening';
import Message from 'shared_components/message';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';

// @ts-ignore
import { CheckIcon } from 'images';

import NotifModal from '../../modal/NotifModal';

// CUSTOM MODULES
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Link } = Anchor;



const coltableheader = [
  {
    title: 'DATE CREATED',
    dataIndex: 'date_created',
  },
  {
    title: 'SCREENING STATUS',
    dataIndex: 'status',
  }
];

const data = [
  {
    exam: 'HIV',
    ref: '0.1/5.2',
  },
  {
    exam:  'HEPA B',
    ref: '1.1/2.2',
  },
  {
    exam:  'MALARIA',
    ref: '1.3/5.2',
  },
  {
    exam:  'HEPA C',
    ref: '5.1/2.7',
  }
];


class ForScreening extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      buttonstatus:true,
      redirect: false,
      modalVisible: false,
      getRemarks: '',
      buttonData:
      [
        {
          Title:'Extraction',
          onclick:'/bloodbank/extraction/details',
        }
      ]
    };
	} 


  coltable = [
    {
      title: 'EXAM',  
      dataIndex: 'exam',
    },
    {
      title: 'RESULT',
      render: () => (
        <div>
          <Select defaultValue="" style={{ width: 120 }}>
            <Option value="Positive">Positive</Option>
            <Option value="Negative">Negative</Option>
          </Select>
        </div>
      ),
    },
    {
      title: 'REFERENCE',
      dataIndex: 'ref',
    },
    {
      title: 'REMARK',
      render: () => (
        <div>
          <Input onChange={this.setDisable}/>
        </div>
      ),
    },
  ];

  rowSelection  = (selectedRowKeys, selectedRows) => {
		const blood_product = selectedRows.map(value =>{
			return(value.blood_product)
		})
		this.setState({blood_product, disabled:false})
	}

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  setDisable = () =>{
    this.setState({
      buttonstatus:false
    })
  }

  setModalVisible = () =>{
    this.setState({
      modalVisible: true
    })
  }

  hideModal = () => {
    this.setState({
      modalVisible: false
    });
  };


  onOkExtract = async (value) => {
    const { getRemarks } = this.state;

    const { donorDetail } = this.props.donorDetail;
    
    const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));

    const payload = {
      screening_id: donorDetail.screening_id,
      donor: donorDetail.donor_id,
      health_info: donorDetail.health_info.health_info_id,
      extraction_remarks: getRemarks,
      status: donorDetail.status_id,
      is_active: true,
      created_by: loggedinUser.userID 
    };

    const result = await extractSample(payload);

    // @ts-ignore
    if(result.status === 201)
      Message.success({ message: 'Sample Extracted!' });
    else
      Message.error();

    this.setState({
      modalVisible: false
    });
  }

  onChange = (value) => {
    this.setState({
      getRemarks: value
      });
    
  }
  redirect = () => {this.setState({ redirect: true })}

  render() {

    const rowSelection = {
			onChange: this.rowSelection
		};

    const { donorDetail } = this.props
    const Data = [donorDetail]
    const { buttonstatus, buttonData, redirect, visible, modalVisible } = this.state
    const render = buttonData.map(data => {
      return (
        <>
          <a onClick={() => this.redirect()}>{data.Title}</a>
          { redirect ? (<Redirect push to={{pathname:data.onclick,
            state: { donorDetail: donorDetail }}}/>) : null }
        </>
      );
    })
    
    const handleClick=() => {
      // this.setModalVisible();
    }
    

    return (
      <div> 
        <Table
          dataSource={Data} 
          columns={coltableheader} 
          style={{height:80}} 
          pagination={false}
        />
        <Row style={{float: 'right'}}>
          <img
              src={CheckIcon}
              alt="logo"
              style={{ width: 25, paddingBottom: '1em', marginRight: 5 }}
          />
          <a onClick={this.setModalVisible}  style={{marginRight: 10, marginTop: 5}} >EXTRACT SAMPLE</a>
          <Popover
            content={render}
            trigger="click"
            visible={visible}
            onVisibleChange={this.handleVisibleChange}
          >
            <Button icon={<MoreOutlined />}/>
          </Popover>
        </Row>
        <Tabs defaultActiveKey="1" style={{width: '100%'}}>
          <TabPane tab="FOR SCREENING">
            <Table 
              // rowSelection={rowSelection}
              dataSource={data}
              columns={this.coltable} 
              pagination={false}
            />
              REMARKS 
            <TextArea rows={3} onChange={this.setDisable}/>
          </TabPane>
        </Tabs> 
        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <Button  shape="round" style={{ width: 120, marginRight:20 }} >
            SAVE
          </Button>
          <Button  shape="round" style={{ width: 120, marginRight:20 }} >
            PRINT
          </Button>
          <Button 
            disabled={buttonstatus}
            type="primary" 
            shape="round" 
            htmlType="submit"
            style={{ width: 120 }}
          >
            SUBMIT
          </Button>
        </div>
        <NotifModal 
          title ='Do you want to extract Blood?' 
          isDisplay={modalVisible} 
          hideModal={this.hideModal} 
          onOk={this.onOkExtract}
          onChange={this.onChange}
        >
        </NotifModal>
      </div>
    )
  }
}

ForScreening.propTypes = {
  donorDetail: PropTypes.shape({
    donor_id: PropTypes.number,
    health_info_id: PropTypes.number.isRequired,
    extraction_id: PropTypes.any
  }).isRequired
}


export default ForScreening;
