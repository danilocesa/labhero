import React, { useState } from 'react';
import { Drawer, message, Tabs } from 'antd';
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
  const { TabPane } = Tabs;
  const [key, setTabKey] = useState('1');

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
    setTabKey('1');

    if(bloodInventory.length > 0) {
      setData(bloodInventory);
      setCachedPayload(payload);
    }
    else {
      setData([]);
      message.info('No result found');
    }
  }

  async function searchTab(payload) {
    setLoading(true);
    const bloodInventory = await searchInventory(payload);
    
    setLoading(false);

    setData([]);

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

  function tabOnChange(key) {
    
    if ( key == '1'){
      let payload = {};//all

      searchTab(payload);
      setTabKey(key);
    }

    if ( key == '2'){
      let payload = {};
      payload.blood_product_id = '1'; //whole blood

      searchTab(payload);
      setTabKey(key);
    }

    if ( key == '3'){
      
      let payload = {};
      payload.blood_product_id = '2'; //red blood cell

      searchTab(payload);
      setTabKey(key);
    }

    if ( key == '4'){

      let payload = {};
      payload.blood_product_id = '3'; //white blood cell

      searchTab(payload);
      setTabKey(key);
    }

    if ( key == '5'){
      
      let payload = {};
      payload.blood_product_id = '4'; //plasma

      searchTab(payload);
      setTabKey(key);
    }

    if ( key == '6'){
      
      let payload = {};
      payload.blood_product_id = '5'; //platelets

      searchTab(payload);
      setTabKey(key);
    }

  }

  const Tab = () => (
    <Tabs defaultActiveKey={key} onChange={tabOnChange}>
      <TabPane tab="All" key="1">
        <SearchTable 
          data={data}
          pageSize={pageSize}
          loading={loading}
          displayDrawerUpdate={displayDrawerUpdate}
        />
      </TabPane>
      <TabPane tab="Whole Blood" key="2">
        <SearchTable 
          data={data}
          pageSize={pageSize}
          loading={loading}
          displayDrawerUpdate={displayDrawerUpdate}
        />
      </TabPane>
      <TabPane tab="Red Blood Cells" key="3">
        <SearchTable 
          data={data}
          pageSize={pageSize}
          loading={loading}
          displayDrawerUpdate={displayDrawerUpdate}
        />
      </TabPane>
      <TabPane tab="White Blood Cells" key="4">
        <SearchTable 
          data={data}
          pageSize={pageSize}
          loading={loading}
          displayDrawerUpdate={displayDrawerUpdate}
        />
      </TabPane>
      <TabPane tab="Plasma" key="5">
        <SearchTable 
          data={data}
          pageSize={pageSize}
          loading={loading}
          displayDrawerUpdate={displayDrawerUpdate}
        />
      </TabPane>
      <TabPane tab="Platelets" key="6">
        <SearchTable 
          data={data}
          pageSize={pageSize}
          loading={loading}
          displayDrawerUpdate={displayDrawerUpdate}
        />
      </TabPane>
    </Tabs>
  );

  return (
    <div>
      <PageTitle pageTitle="BLOOD INVENTORY" />
      <SearchForm onSearch={search} />
      <SearchPager 
        handleChangeSize={handleChangeSize}
        pageTotal={data.length}
        pageSize={pageSize}
      />
      <Tab />
      
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