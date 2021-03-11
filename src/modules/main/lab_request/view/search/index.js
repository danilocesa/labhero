import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Table from 'shared_components/search_patient_table';
import PageTitle from 'shared_components/page_title';
import SearchFormEdit from 'modules/main/lab_request/steps/search/form_for_edit';
import TableHeader from 'modules/main/lab_request/steps/search/table_header';
import { GLOBAL_TABLE_PAGE_SIZE } from 'global_config/constant-global';


function SearchPage(props) {
  const history = useHistory();
  const [patients, setPatients] = useState([]);
  const [pageSize, setPageSize] = useState(GLOBAL_TABLE_PAGE_SIZE)
  const [loading, setLoading] = useState(false);

  function handleTableDoubleClick(record) {
    const { requestHeader, ...persoInfo } = record;
    const { userID, requestDateTime, ...otherInfo } = record.requestHeader;

		history.push('/request/view/summary', { persoInfo, otherInfo });
	}

  return (
    <div>
      <PageTitle pageTitle="VIEW REQUEST" />
      <div style={{ marginTop: 60 }}>
        <SearchFormEdit
          populatePatients={setPatients}
          displayLoading={setLoading} 
        />
        <TableHeader 
          pageSize={pageSize}
          pageTotal={patients.length} 
          handleChangeSize={setPageSize} 
        />
        <Table 
          data={patients}
          pageSize={pageSize}
          loading={loading} 
          handleDoubleClick={handleTableDoubleClick}
        />
      </div>
    </div>
  );
}

export default SearchPage;