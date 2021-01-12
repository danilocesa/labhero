import React from 'react';
import PropTypes from 'prop-types';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


class UploadButton extends React.Component {

  render() {
    const { onSuccessUpload } = this.props;
    const APIbaseURL = process.env.REACT_APP_REPORT_API;
    const config = {
      action: `${APIbaseURL}/lab_report/upload.php`,
      headers: {
        APIKEY: process.env.REACT_APP_REPORT_API_KEY,
      },
      name: 'file',
      accept: '.jrxml',
      showUploadList: false,
      onChange(info) {
        if (info.file.status !== 'uploading') {
          // Do something while uploading
        }

        if (info.file.status === 'done') {
          if(info.file.response && info.file.response.is_success) {
            message.success(`${info.file.name} file uploaded successfully.`);
            onSuccessUpload();
          }
          else
            message.error(info.file.response.message);
        } 

        else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return ( 
      <Upload {...config}>
        <Button 
          className="form-button"
          shape="round" 
          type="primary" 
          icon={<UploadOutlined />}
        >
          Click to Upload
        </Button>
      </Upload>
    )
  }
}


UploadButton.propTypes = {
	onSuccessUpload: PropTypes.func.isRequired
};

export default UploadButton;