import React from 'react';
import { List, Card, Tooltip, Alert, Button  } from 'antd';
import { DownloadOutlined, DeleteFilled } from '@ant-design/icons';
import { fetchXMLNames, deleteXML } from 'services/settings/reports';	
import Message from 'shared_components/message';

class TemplateList extends React.Component {

  state = { 
    xmlTemplates: []
  };

  componentDidMount = async () => {
    this.populateTemplateList();
  }

  populateTemplateList = async () => {
    const response = await fetchXMLNames();
    
    const xmlTemplates = response.filenames || [];

	  this.setState({ xmlTemplates });
	}

  onDeleteTemplate = async (templateName) => {
    const response = await deleteXML({ name: templateName });
    
    if(response.status === 200) {
      Message.success({ message: response.data.message });
      await this.populateTemplateList();
    }
    else {
      Message.error(response.data && response.data.message);
    }
  }

	render() {
    const { xmlTemplates } = this.state;
    const url = `${process.env.REACT_APP_REPORT_API}/labreport_api/download.php?file=`;
    
		return(
      <Card title="XML Templates" style={{ marginTop: 10 }}>
        <div style={{ height: 400, overflowY: 'auto' }}>
          <Alert
            message=""
            description="Uploading of same xml names will replace the existing one."
            type="warning"
            showIcon
          />
          <List 
            style={{ marginTop: 15, width: 500 }}
            size="small"
            dataSource={xmlTemplates}
            renderItem={item => (
              <List.Item
                actions={[
                  <Tooltip title="Delete">
                    <Button 
                      type="link" 
                      onClick={() => this.onDeleteTemplate(item)}
                      icon={<DeleteFilled />}
                      danger
                    />
                  </Tooltip>,
                  <a href={`${url}${item}`}>
                    <Tooltip title="Download">
                      <DownloadOutlined />
                    </Tooltip>
                  </a>
                ]}
              >
                <span style={{ marginLeft: 8 }}>{item}</span>
              </List.Item>
            )}
          />
        </div>
			</Card>
		);
	}
}


export default TemplateList;