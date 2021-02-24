import React, { useState } from 'react';
import { Drawer } from 'antd';
import PageTitle from 'shared_components/page_title';
import SearchPager from 'shared_components/search_pager';
import { GLOBAL_TABLE_PAGE_SIZE } from 'global_config/constant-global';
import { searchInventory } from 'services/blood_bank/blood_inventory';
import SearchForm from './searchForm';
import SearchTable from './table';
import BloodInventoryDetailsForm from "../item_detail";

function SearchBloodInventory() {
  const [data, setData] = useState([{
    bag_id: 1,
    blood_type: 'A+',
    storage: 'Storage 1',
    date_extracted: '02-24-2021',
    expiry_date: '02-27-2021'
  }]);
  const [pageSize, setPageSize] = useState(GLOBAL_TABLE_PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [visibleDrawer, setvisibleDrawer] = useState(false);
  const [invDetail, setinvDetail] = useState({});
  
  function handleChangeSize(size) {
    setPageSize(size);
  }

  function displayDrawerUpdate(invDetail) {
    setinvDetail(invDetail);
    setvisibleDrawer(true);
  }

  function onDrawerClose() {
    setvisibleDrawer(false);
  }

  async function search(payload) {
    const bloodInventory = await searchInventory(payload);

    setData(bloodInventory);
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
        onClose={onDrawerClose}
        width="30%"
        destroyOnClose
      >
        <BloodInventoryDetailsForm
          invDetail={invDetail}
          onCancel={onDrawerClose}
        />
      </Drawer>
    </div>
  );
}

export default SearchBloodInventory;