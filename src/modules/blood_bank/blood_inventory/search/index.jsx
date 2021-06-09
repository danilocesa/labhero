import React, { useEffect, useState } from 'react';
import { Drawer, message, Tabs } from 'antd';
import PageTitle from 'shared_components/page_title';
import SearchPager from 'shared_components/search_pager';
import { GLOBAL_TABLE_PAGE_SIZE } from 'global_config/constant-global';
import {  searchInventoryAvailableAPI , searchInventoryNearExpiryAPI } from 'services/blood_inventory/blood_inventory';
import {fetchBloodComponents} from 'services/blood_inventory/blood_components'
import SearchForm from './searchForm';
import BloodInventoryDetailsForm from "../item_detail";
import SearchTable from './table'

function SearchBloodInventory(props) {
  const { state } = props.history.location
  const [data, setData] = useState([]);
  const [BloodComponents, setBloodComponents] = useState([]);
  const [visibleDrawer, setvisibleDrawer] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [DataFromForm , setDataFromForm] = useState([])
  const [cachedPayload, setCachedPayload] = useState(null);
  
  const { TabPane } = Tabs;

  function displayDrawerUpdate(id) {
    setSelectedID(id);
    setvisibleDrawer(true);
  }

  async function refreshTableData() {
    await search(cachedPayload);
  }

  useEffect(() => {
    async function fetchData() {
      if (state.is_nearExpiry === false) {
        state.blood_product_code = 'WB'
        const apiResponseBloodComponents = await fetchBloodComponents();
        const bloodInventory = await searchInventoryAvailableAPI(state);
        setBloodComponents(apiResponseBloodComponents)
        if(bloodInventory.length > 0) {
          setData(bloodInventory);
        }
        else {
          setData([]);
          message.info('No result found');
        }
      } 
      else if (state.is_nearExpiry === true) {
        state.blood_product_code = 'WB'
        const apiResponseBloodComponents = await fetchBloodComponents();
        const bloodInventory = await searchInventoryNearExpiryAPI(state);
        setBloodComponents(apiResponseBloodComponents)
        if(bloodInventory.length > 0) {
          setData(bloodInventory);
        }
        else {
          setData([]);
          message.info('No result found');
        }
      }
      else {
        state.blood_product_code = 'WB'
        const apiResponseBloodComponents = await fetchBloodComponents();
        const bloodInventory = await searchInventoryAvailableAPI(state);
        setBloodComponents(apiResponseBloodComponents)
        if(bloodInventory.length > 0) {
          setData(bloodInventory);
        }
        else {
          setData([]);
          message.info('No result found');
        }
      }
    }
    fetchData();
  },[]) 

  async function search(payload) {  
    setDataFromForm(payload)
    setData(DataFromForm);
  }

  async function tabOnChange(key) {
    state.blood_product_code = key
    const bloodInventory = await searchInventoryAvailableAPI(state);
    if(bloodInventory.length > 0) {
      setData(bloodInventory);
    }
    else {
      setData([]);
      message.info('No result found');
    }
  }

  const TabPanes = BloodComponents === undefined ? null : BloodComponents.map((item) => (
    <TabPane 
      tab={item.blood_comp_name} 
      key={item.blood_comp_code} 
    />
  ));

  return (
    <div>
      <PageTitle pageTitle="BLOOD INVENTORY" />
      <SearchForm onFinish={search} />
      <SearchPager 
        pageTotal={data.length}
      />
      <Tabs 
        onChange={tabOnChange}
        defaultActiveKey="1"
      >
        {TabPanes}
      </Tabs>
      <SearchTable
        data={data}
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