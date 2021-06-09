import React from "react"
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { MoreOutlined } from '@ant-design/icons';
import { Table, Input , Button, Tabs, Popover, Select, Checkbox } from 'antd'

// CUSTOM MODULES
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

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

  redirect = () => {this.setState({ redirect: true })}

  render() {
    const rowSelection = {
			onChange: this.rowSelection
		};
    const { donorDetail } = this.props
    const Data = [donorDetail]
    const { buttonstatus, buttonData, redirect, visible } = this.state
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
        {/* <Popover
          content={render}
          trigger="click"
          visible={visible}
          onVisibleChange={this.handleVisibleChange}
          placement="bottomRight"
        >
          <Button icon={<MoreOutlined />}/>
        </Popover> */}
        <Table
          dataSource={Data} 
          columns={coltableheader} 
          style={{height:80}} 
          pagination={false}
        />
        <Tabs defaultActiveKey="1" >
          <TabPane tab="FOR SCREENING">
            <Table 
              rowSelection={rowSelection}
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
