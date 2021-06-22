
import React, { useEffect, useState } from 'react';
import { Drawer, message, Tabs } from 'antd';
import PageTitle from 'shared_components/page_title';
import SearchPager from 'shared_components/search_pager';
import {  searchInventoryAvailableAPI , searchInventoryNearExpiryAPI, tabSearch } from 'services/blood_inventory/blood_inventory';
import {fetchBloodComponents} from 'services/blood_inventory/blood_components'
import SearchForm from './searchForm';
import BloodInventoryDetailsForm from "../item_detail";
import SearchTable from './table';
import {
  tableSize,
  buttonLabels,
  tableYScroll,
  tablePageSize,
} from "modules/inventory/settings/settings";

function SearchBloodInventory(props) {
  const { state } = props.history.location
  console.log("🚀 ~ file: index.jsx ~ line 14 ~ SearchBloodInventory ~ state", state)
  const [data, setData] = useState([]);
  const [BloodComponents, setBloodComponents] = useState([]);
   const [loading, setLoading] = useState(false);
  const [visibleDrawer, setvisibleDrawer] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [DataFromForm , setDataFromForm] = useState([])
  const [cachedPayload, setCachedPayload] = useState(null);
  const [bloodInventoryData, setBloodInventoryData] = useState(null);
  const [key, setTabKey] = useState('1');
  
  const { TabPane } = Tabs;

  function displayDrawerUpdate(id) {
    setSelectedID(id);
    setvisibleDrawer(true);
  }

  async function searchTab(payload) {
    setLoading(true);
    const bloodInventory = await tabSearch(payload.toString());
    
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
  },[]
  ) 

  async function search(payload) {  
    setDataFromForm(payload)
    setData(DataFromForm);
  }

  async function tabOnChange(key) {

    if ( key == '1'){

      searchTab('WB');
      setTabKey(key);
    }

    if ( key == '2'){

      searchTab('RBC');
      setTabKey(key);
    }

    if ( key == '3'){

      searchTab('WBC');
      setTabKey(key);
    }

    if ( key == '4'){

      searchTab('PLASMA');
      setTabKey(key);
    }

    if ( key == '5'){

      searchTab('PLATELET');
      setTabKey(key);
    }
    // state.blood_product_code = key
    // const bloodInventory = await searchInventoryAvailableAPI(state);
    // if(bloodInventory.length > 0) {
    //   setData(bloodInventory);
    // }
    // else {
    //   setData([]);
    //   message.info('No result found');
    // }
  }

  function handleSelectChange(value) {
    const { pagination } = this.state;
    pagination.pageSize = parseInt(value);
    this.setState({ pagination });
  };


  // const TabPanes = BloodComponents === undefined ? null : BloodComponents.map((item, index) => (
  //   <TabPane
  //     tab={item.blood_comp_name}
  //     // key={item.blood_comp_code} 
  //     key={index}//"1"//{state.TabKey}
  //   >
  //   </TabPane>
  // ));

  return (  
    <div>
      <PageTitle pageTitle="BLOOD INVENTORY" />
      <SearchForm onFinish={search} />
      <SearchPager 
        pageTotal={data.length}
        pageSize={tablePageSize}
        handleChangeSize={handleSelectChange}
      />
      {/* state.actionType === 'ManualSearch' ? 1 : */}
      <Tabs 
        onChange={tabOnChange}
        defaultActiveKey = {state.actionType === "ManualSearch" ? 1 : state.TabKey }
      >
        <TabPane
          tab="Whole Blood"
          key="1"
        >
        </TabPane>
        <TabPane
          tab="Red Blood Cell"
          key="2"
        >
        </TabPane>
        <TabPane
          tab="White Blood Cell"
          key="3"
        >
        </TabPane>
        <TabPane
          tab="Plasma"
          key="4"
        >
        </TabPane>
        <TabPane
          tab="Platelet"
          key="5"
        >
        </TabPane>
      </Tabs>
      <SearchTable
        data={data}
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