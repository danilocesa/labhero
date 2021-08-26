// @ts-nocheck
// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Spin, Button, Col, Row } from 'antd';
import { Document, Page, pdfjs } from 'react-pdf';
import { getPrintPreviewV2 } from 'services/lab_result/result';
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PrintResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageSrc: null,
      pageNumber: 1,
      isReadyToPrint: false,
      numPages: null
    };

    this.timer = null;
  }
    
  componentDidMount() {
    window.addEventListener('message', (e) => { 
      if(e.data.isReadyToPrint) {
        this.setState({ isReadyToPrint: true });
      }
    });
  }

  onDocumentLoadSuccess = ({ numPages })=> {
    this.setState({
      numPages,
    })
  }

  async componentDidUpdate(prevProps) {
    const { requestID, sampleID } = this.props;
 
    if(prevProps.sampleID !== sampleID && prevProps.requestID !== requestID) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isReadyToPrint: false });
    }

    if(prevProps.visible === false && this.props.visible && sampleID !== null) {
      // const printPreview = await getPrintPreview(sampleID);
      const printPreview = await getPrintPreviewV2(requestID, sampleID);


      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ imageSrc: printPreview.pdf }, () => {
        this.timer = setInterval(() => {
          const { isReadyToPrint } = this.state;
          
          if(isReadyToPrint) {  
            this.printResult();

            clearInterval(this.timer);

            this.timer = null;
          }
        }, 1000);
      });
    }
  }

  printResult = () => {
    const id = 'result';
    const iframe = document.frames
      ? document.frames[id]
      : document.getElementById(id);
      
    const iframeWindow = iframe.contentWindow || iframe;

    iframe.focus();
    iframeWindow.print();
  }
  
  onCloseDrawer = () => {
    const { onClose } = this.props;

    if(this.timer) {
      clearInterval(this.timer);
    }
    
    onClose();
  }

  onNav = (action) => {
    const { pageNumber } = this.state
    this.setState({
      pageNumber: action === "NEXT" ?  pageNumber + 1 : pageNumber - 1
    })
  }

	render() {
    const { pageNumber, imageSrc, isReadyToPrint, numPages } = this.state; 
    const { visible, sampleID, requestID } = this.props;

    return (
      <Drawer 
        title="LABORATORY RESULT PRINT PREVIEW"
        width="700"
        placement="right"
        closable
        onClose={this.onCloseDrawer}
        visible={visible}
        className="ageBracket-drawer"
      >
        <div>
          { (sampleID && sampleID !== null && visible) &&                                                               
            (
              <Spin spinning={!isReadyToPrint && visible}>
                <iframe
                  id="result"
                  src={`${process.env.PUBLIC_URL}/lab/result/print/${requestID}/${sampleID}`}
                  style={{ height: 0, width: 0, position: 'absolute' }}
                  title="result"
                />
                <Document
                  file={`data:application/pdf;base64,${imageSrc}`}
                  onLoadSuccess={this.onDocumentLoadSuccess}
                  onLoadError={console.error}
                  renderMode="svg"
                >
                  <Page pageNumber={pageNumber} renderMode="svg"/>
                    <Row>
                      <Col span={8}>
                        {
                          numPages === 1 ?
                            null
                          :
                          <>
                            <Button type="text" icon={<CaretLeftOutlined />} onClick={()=> this.onNav("BACK")}/>
                            <Button type="text" icon={<CaretRightOutlined />} onClick={()=> this.onNav("NEXT")}/>
                          </>
                        }
                      </Col>
                      <Col span={8} offset={8}>
                        <p>Page {pageNumber} of {numPages}</p>
                      </Col>
                    </Row>
                </Document>
              </Spin>
            )
          }
        </div>
      </Drawer>
    );
  }
}

PrintResult.propTypes = {
  requestID: PropTypes.string,
  sampleID: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  resultStatus: PropTypes.string
};

PrintResult.defaultProps = {
  requestID: null,
  sampleID: null,
  resultStatus: null,
};

export default PrintResult;
