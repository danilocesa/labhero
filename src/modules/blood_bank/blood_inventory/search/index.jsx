import React, { useState } from 'react';
import { Drawer, message } from 'antd';
import PageTitle from 'shared_components/page_title';
import SearchPager from 'shared_components/search_pager';
import { GLOBAL_TABLE_PAGE_SIZE } from 'global_config/constant-global';
import { searchInventory } from 'services/blood_bank/blood_inventory';
import SearchForm from './searchForm';
import SearchTable from './table';
import BloodInventoryDetailsForm from "../item_detail";

function SearchBloodInventory() {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(GLOBAL_TABLE_PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [visibleDrawer, setvisibleDrawer] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [cachedPayload, setCachedPayload] = useState(null);

  function handleChangeSize(size) {
    setPageSize(size);
  }

  function displayDrawerUpdate(id) {
    setSelectedID(id);
    setvisibleDrawer(true);
  }

  async function search(payload) {
    setLoading(true);
    const bloodInventory = await searchInventory(payload);
    
    setLoading(false);
    

    if(bloodInventory.length > 0) {
      setData(bloodInventory);
      setCachedPayload(payload);
    }
    else {
      setData([]);
      message.info('No result found');
    }
  }


  async function refreshTableData() {
    await search(cachedPayload);
  }

  return (
    <div>
      <PageTitle pageTitle="BLOOD INVENTORY" />
      <SearchForm onSearch={search} />
      <SearchPager 
        handleChangeSize={handleChangeSize}
        pageTotal={data.length}
        pageSize={pageSize}
      />
      <SearchTable 
        data={data}
        pageSize={pageSize}
        loading={loading}
        displayDrawerUpdate={displayDrawerUpdate}
      />
      <Drawer
        title="BLOOD INVENTORY DETAILS"
        visible={visibleDrawer}
        onClose={() => setvisibleDrawer(false)}
        width="30%"
        destroyOnClose
      >
        <BloodInventoryDetailsForm
          inventoryID={selectedID}
          refreshTableData={refreshTableData}
          closeDrawer={() => setvisibleDrawer(false)}
        />
      </Drawer>
    </div>
  );
}

export default SearchBloodInventory;