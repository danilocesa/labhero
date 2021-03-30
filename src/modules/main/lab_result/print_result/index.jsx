// @ts-nocheck
// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Spin } from 'antd';
import { Document, Page, pdfjs } from 'react-pdf';
import { getPrintPreview } from 'services/lab_result/result';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PrintResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageSrc: null,
      pageNumber: 1,
      isReadyToPrint: false
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

  async componentDidUpdate(prevProps) {
    // const { sampleID, resultStatus } = this.props;
    const { sampleID, requestID } = this.props;
    
    console.log(requestID, sampleID);

    if(prevProps.sampleID !== sampleID) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isReadyToPrint: false });
    }

    if(prevProps.visible === false && this.props.visible && sampleID !== null) {
      const printPreview = await getPrintPreview(sampleID);

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ imageSrc: printPreview.data }, () => {
        this.timer = setInterval(() => {
          const { isReadyToPrint } = this.state;
          
          // if(isReadyToPrint && (resultStatus === 'Save' || resultStatus === 'Approve')) {  
          if(isReadyToPrint) {  
            this.printResult();

            clearInterval(this.timer);

            this.timer = null;
          }
        }, 1000);
      });
    }
  }

  // printResult = () => {
  //   const content = document.getElementById("printableContent");
  //   const pri = document.getElementById("ifmcontentstoprint").contentWindow;
  //   pri.document.open();
  //   pri.document.write(content.innerHTML);
  //   pri.document.close();
  //   pri.focus();
  //   pri.print();
  //   clearTimeout(this.timer);
  // }

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

	render() {
    const { pageNumber, imageSrc, isReadyToPrint } = this.state;
    const { visible, sampleID } = this.props;

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
                  src={`${process.env.PUBLIC_URL}/lab/result/print/${sampleID}`}
                  style={{ height: 0, width: 0, position: 'absolute' }}
                  title="result"
                />
                <Document
                  file={`data:application/pdf;base64,${imageSrc}`}
                  onLoadError={console.error}
                  renderMode="svg"
                >
                  <Page pageNumber={pageNumber} renderMode="svg" />
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
