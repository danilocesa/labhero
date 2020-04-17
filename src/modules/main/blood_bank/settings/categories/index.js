// LiBRARY
import React from 'react';
import PageTitle from 'shared_components/page_title';
import SelectedTable from './selected_table';

import { drawerUpdateTitle, buttonLabels } from './settings';

class InventoryCategoriesTemplate extends React.Component {
  state = { }

  onDragAndDropRow = (selectedExams) => {
		this.setState({ selectedExams });
  }

  render() {
    const {selectedExams } = this.state;
    return ( 
			<div>
        <PageTitle pageTitle= ' BLOOD GROUP' />
            <SelectedTable 
              wrappedComponentRef={(inst) => this.selectedTable = inst}
              data={selectedExams}
              onDragAndDropRow={this.onDragAndDropRow}
              loading={false}
            />		
			</div>
    );
  }
}

export default InventoryCategoriesTemplate;