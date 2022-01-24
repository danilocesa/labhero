// @ts-nocheck
import React from "react"
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { MoreOutlined } from '@ant-design/icons';
import { Table, Input , Button, Tabs, Popover, Select, Checkbox, Row, Anchor, Col, message } from 'antd';

import { extractSample, fetchExamList, screeningResultUpdate, fetchExamListWithId } from 'services/blood_bank/screening';
import Message from 'shared_components/message';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';

// @ts-ignore
import { Injection } from 'images';

import NotifModal from '../../modal/NotifModal';
import { index } from "d3-array";

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

class ForScreening extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      buttonstatus:true,
      redirect: false,
      modalVisible: false,
      selectedData: [],
      disableExtract: false,
      loading: false,
      getRemarks: '',
      screeningData: [],
      examList: [],
      examListWithId: [],
      hasScreeningID: null,
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
        key: 'exam_item_id',
        title: 'EXAM',  
        dataIndex: 'exam_item_name',
      },
      {
        key: 'exam_item_id',
        title: 'RESULT',
        dataIndex: 'result',
        render: (e) => (
          <div>
            <Select defaultValue="" style={{ width: 120 }}>
              <Option value="Positive">Positive</Option>
              <Option value="Negative">Negative</Option>
            </Select>
          </div>
        ),
      },
      {
        key: 'exam_item_id',
        title: 'REFERENCE',
        dataIndex: 'normal_values',
      },
      {
        key: 'exam_item_id',
        title: 'REMARK',
        dataIndex: 'remarks',
        render: (e) => (
          <div>
            <Input onChange={this.setDisable}/>
          </div>
        ),
      },
    ];

  rowSelection  = (selectedRowKeys, selectedRows) => {
  console.log("🚀 ~ file: index.js ~ line 94 ~ ForScreening ~ selectedRowKeys", selectedRowKeys)
  console.log("🚀 ~ file: index.js ~ line 92 ~ ForScreening ~ selectedRows", selectedRows)

  const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
    //dito
  const selectedData = selectedRows.map(value =>{
		return(
			{
        exam_result_id: 1,//rowData.exam_result_id,
        exam_remarks: 'test remarks',//rowData.exam_remarks,
        exam_results: 'test',//rowData.exam_results,
        last_updated_by: loggedinUser
			}
		)
	})

  const { rowData } = selectedData ;
  console.log("🚀 ~ file: index.js ~ line 94 ~ ForScreening ~ rowData", rowData)

  // payload = {
  //   exam_result_id: rowData.exam_result_id,
  //   exam_remarks: rowData.exam_remarks,
  //   exam_results:rowData.exam_results,
  //   last_updated_by: rowData.created_by
  // };

  // screeningResultUpdate
  

    // const mappedRowData = rowData.map((value , index ) =>{
    //   return ({
    //     ...value, key:index
    //   })
    // })

		// this.setState({selectedData: rowData})
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

  async componentDidMount(){

    const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));

    this.setState({
      loading:true
    });
    
    const { donorDetail, donorHealthInfo } = this.props.donorDetail;

    this.setState({
      hasScreeningID: donorDetail.screening_id
    });

    const apiResponseExamList = await fetchExamList();
    this.setState({
      loading:false,
      examList:apiResponseExamList
    })

    const apiResponseExamListWithId = await fetchExamListWithId(donorDetail.screening_id);

    const mappedExamListWithId = apiResponseExamListWithId.map(value =>{
      return(
        {
          exam_result_id: value.exam_result.exam_result_id,
          exam_remarks: value.exam_result.exam_remarks,
          exam_results: value.exam_result.exam_results,
          exam_item_name: value.exam_result.exam_item_name,
          normal_values: value.exam_result.normal_values,
          last_updated_by: loggedinUser.userID
        }
      )
    })

    this.setState({
      loading:false,
      examListWithId:mappedExamListWithId
    })

  }


  onOkExtract = async (value) => {
    
    const { getRemarks } = this.state;
    const { donorDetail } = this.props.donorDetail;
    const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));

    const payload = {
      screening_id: 14720,//donorDetail.screening_id,
      donor: donorDetail.donor_id,
      health_info: donorDetail.health_info.health_info_id,
      extraction_remarks: getRemarks,
      status: 1,//donorDetail.status_id,
      is_active: true,
      created_by: loggedinUser.userID 
    };
    const result = await extractSample(payload);

    const { exam_results } = result.data;

    const mappeddata = exam_results.map((value , index ) =>{
      return ({
        ...value, key:index
      })
    })

    // @ts-ignore
    if(result.status === 201){
      Message.success({ message: 'Sample Extracted!' });

      this.setState({
        modalVisible: false,
        disableExtract: true,
        loading: false,
        screeningData: mappeddata
      });
    }
      
    else
      Message.error();
      
  }

  onChange = (value) => {
    this.setState({
      getRemarks: value
      });
    
  }
  redirect = () => {this.setState({ redirect: true })}

  onClickSave = async (value) => {
    const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));

    const { examListWithId } = this.state;

    const saveExamResult = examListWithId.map(value =>{
      return(
        {
          exam_result_id: value.exam_result_id,
          exam_remarks: value.exam_remarks,
          exam_results: value.exam_results,
          last_updated_by: value.last_updated_by
        }
      )
    })

    const result = await screeningResultUpdate(saveExamResult);
    console.log("🚀 ~ file: index.js ~ line 270 ~ ForScreening ~ onClickSave= ~ result", result)
      // @ts-ignore
      
      if(result.status === 200){
        Message.success({ message: 'Exam Result Saved!' });
      }
      else
        Message.error();
    }

  render() {

  const rowSelection = {
    onChange: this.rowSelection
  };

    const { donorDetail } = this.props
    const Data = [donorDetail]

    const { 
            buttonstatus, 
            buttonData, 
            redirect, 
            visible, 
            modalVisible, 
            disableExtract,
            examList, 
            loading, 
            hasScreeningID, 
            examListWithId,
            screeningData,
            selectedRowKeys 
          } = this.state;

    const render = buttonData.map(data => {
      return (
        <>
          <a onClick={() => this.redirect()}>{data.Title}</a>
          { redirect ? (<Redirect push to={{pathname:data.onclick,
            state: { donorDetail: donorDetail }}}/>) : null }
        </>
      );
    })
    
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
              src={Injection}
              alt="logo"
              style={{ width: 30, paddingBottom: '1em' }}
          />
          <Button type="link" disabled={disableExtract} onClick={this.setModalVisible}  style={{marginRight: 10, marginTop: 5}}>EXTRACT SAMPLE</Button>
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
              // rowSelection={{...rowSelection}}
              rowSelection={rowSelection}
              dataSource={hasScreeningID === null ? examList : examListWithId }
              columns={this.coltable} 
              pagination={false}
              loading={loading}
            />
              REMARKS 
            <TextArea rows={3} onChange={this.setDisable}/>
          </TabPane>
        </Tabs> 
        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <Button  
            shape="round" 
            style={{ width: 120, marginRight:20 }} 
            onClick={this.onClickSave}
          >
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
