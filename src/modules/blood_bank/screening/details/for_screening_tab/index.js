// @ts-nocheck
import React, { useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { MoreOutlined } from '@ant-design/icons';
import { Table, Input , Button, Tabs, Popover, Select, Checkbox, Row, Anchor, Col, message, Form } from 'antd';

import { extractSample, fetchExamList, screeningResultUpdate, fetchExamListWithId } from 'services/blood_bank/screening';
import Message from 'shared_components/message';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';

import messagePrompts from  './settings'
import HttpCodeMessage from 'shared_components/message_http_status'

// @ts-ignore
import { Injection } from 'images';

import NotifModal from '../../modal/NotifModal';
import { index } from "d3-array";

const EditableContext = React.createContext(null);

// CUSTOM MODULES
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Link } = Anchor;

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

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
      saveDisable: true,
      buttonData:
      [
        {
          Title:'Extraction',
          onclick:'/bloodbank/extraction/details',
        }
      ]
    };

    this.coltable = [
      {
        title: 'EXAM',  
        dataIndex: 'exam_item_name',
        editable: false
      },
      {
        title: 'RESULT',
        dataIndex: 'result',
        editable: true
      },
      {
        title: 'REFERENCE',
        dataIndex: 'normal_values',
      },
      {
        title: 'REMARK',
        dataIndex: 'remarks',
        editable: true
      },
    ];

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

    const apiResponseExamList = await fetchExamList(); //fetch Exam list if No Screening ID
    this.setState({
      loading:false,
      examList:apiResponseExamList
    })

    const apiResponseExamListWithId = await fetchExamListWithId(donorDetail.screening_id); //fetch Examlist from screening if has Screening ID
    const mappedExamListWithId = apiResponseExamListWithId.map(value =>{
      return(
        {
          key: value.exam_result.exam_result_id,
          exam_result_id: value.exam_result.exam_result_id,
          exam_remarks: value.exam_result.exam_remarks === null ? "NULL" : value.exam_result.exam_remarks,
          result: value.exam_result.exam_results === "1" ? "POSITIVE" : "NEGATIVE",
          exam_item_name: value.exam_result.exam_item_name,
          normal_values: value.exam_result.normal_values,
          remarks: "REMARK",
          last_updated_by: loggedinUser.userID
        }
      )
    })

    this.setState({
      loading:false,
      examListWithId:mappedExamListWithId,
      dataSource: donorDetail.screening_id === null ? apiResponseExamList : mappedExamListWithId
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

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  onChange = (value) => {
    this.setState({
      getRemarks: value
      });
    
  }
  redirect = () => {this.setState({ redirect: true })}

  rowSelection  = (selectedRowKeys, selectedRows) => {
      const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
      const onSelectedData = selectedRows.map(value =>{
        return(
          {
            exam_result_id: value.exam_result_id,
            exam_remarks: value.remarks,
            exam_results: value.result,
            last_updated_by: loggedinUser.userID
          }
        )
      })
      
      this.setState({
        selectedData: onSelectedData,
        saveDisable: false
      });
    }

  onClickSave = async (value) => {
    const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
    const { history } = this.props;

    const { selectedData } = this.state;
    const saveExamResult = selectedData.map(value =>{
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
      // @ts-ignore
      
      if(result.status === 200){
        // Message.success({ message: 'Exam Result Saved!' });
        // // window.location.reload();
        
        const httpMessageConfig = {
					message: messagePrompts.successCreateUser,
					// @ts-ignore
					status: result.status,	
					duration: 3, 
					// onClose: () => history.push('/bloodbank/screening/search')
				}
				  HttpCodeMessage(httpMessageConfig);	
          window.location.reload();
      }
      else
        Message.error();
    }

  render() {

    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const coltable = this.coltable.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

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
            selectedRowKeys ,
            saveDisable
          } = this.state;
    
    const { dataSource } = this.state;

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
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              rowSelection={rowSelection}
              dataSource= {dataSource} //{hasScreeningID === null ? examList : examListWithId }
              columns={coltable} 
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
            disabled={saveDisable}
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
