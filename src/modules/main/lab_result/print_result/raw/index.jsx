// @ts-nocheck
// LIBRARY
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { getPrintPreviewV2 } from 'services/lab_result/result';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PrintResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageSrc: null,
      pageNumber: 1,
    };
  }

  async componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { requestID, sampleID } = this.props.match.params

    const printPreview = await getPrintPreviewV2(requestID, sampleID);
    
    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({ imageSrc: printPreview.pdf });
  }

  onDocumentLoadSuccess = () => {
    window.parent.postMessage({ isReadyToPrint: true }, window.location);
  }

	render() {
    const { pageNumber, imageSrc } = this.state;

    return (
      <div style={{ width: '90%', margin: 'auto' }}>
        { imageSrc && 
          (
            <Document
              file={`data:application/pdf;base64,${imageSrc}`}
              onLoadError={console.error}
              renderMode="svg"
            >
              <Page 
                pageNumber={pageNumber} 
                renderMode="svg" 
                onRenderSuccess={this.onDocumentLoadSuccess}
              />
            </Document>
          )
        }
      </div>
    );
  }
}


export default PrintResult;
