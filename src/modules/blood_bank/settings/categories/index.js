// LiBRARY
import React from 'react';
import SelectedTable from './selected_table';


class InventoryCategoriesTemplate extends React.Component {
  state = { }

  onDragAndDropRow = (selectedExams) => {
		this.setState({ selectedExams });
  }

  render() {
    const {selectedExams } = this.state;
    return ( 
			<div style={{marginTop: -50}}>
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