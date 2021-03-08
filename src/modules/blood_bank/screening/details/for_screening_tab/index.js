import React from "react"
import { Table, Input , Button, Tabs  } from 'antd'

// CUSTOM MODULES
const { TabPane } = Tabs;
const { TextArea } = Input;
const coltableheader = [
  {
    title: 'DATE CREATED',
    dataIndex: 'DC',
  },
  {
    title: 'SCREENING STATUS',
    dataIndex: 'SS',
  }
];


const coltableheaderdata = [
  {
    DC: '03/03/2021',
    SS: 'ON GOING',
  },
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
      buttonstatus:true
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
          <Input onChange={this.setDisable}/>
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
    }
  ];

  setDisable = () =>{
    this.setState({
      buttonstatus:false
    })
  }

  render() {
    const { buttonstatus } = this.state
    return (
      <div> 
        <Table 
          dataSource={coltableheaderdata} 
          columns={coltableheader} 
          style={{height:80}} 
          pagination={false}
        />
        <Tabs defaultActiveKey="1" >
          <TabPane tab="FOR SCREENING">
            <Table 
              dataSource={data}
              columns={this.coltable} 
              pagination={false}
            />
            REMARKS <TextArea rows={3} onChange={this.setDisable}/>
          </TabPane>
        </Tabs> 
        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <Button  shape="round" style={{ width: 120, marginRight:20 }} >
            SCREENED
          </Button>
          <Button  shape="round" style={{ width: 120, marginRight:20 }} >
            REJECT
          </Button>
          <Button 
            disabled={buttonstatus}
            type="primary" 
            shape="round" 
            htmlType="submit"
            style={{ width: 120 }}
          >
            APPROVE
          </Button>
        </div>
      </div>
    )
  }
}

export default ForScreening;
