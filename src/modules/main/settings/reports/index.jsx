import React from 'react';


import PageTitle from 'shared_components/page_title';
import TemplateList from './template_list';
import UploadButton from './upload_button';

class Reports extends React.Component {
	constructor() {
		super();

		this.templatelistRef = React.createRef();
	}
	
	repopulateTemplateList = async () => {
		await this.templatelistRef.populateTemplateList();
	}

	render() {
		return(
			<div>
				<PageTitle pageTitle="REPORTS" />
				<UploadButton onSuccessUpload={this.repopulateTemplateList} />
				<TemplateList ref={(inst) => this.templatelistRef = inst}/>
			</div>
		);
	}
}

export default Reports;