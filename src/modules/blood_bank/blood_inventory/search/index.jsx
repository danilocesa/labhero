import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import PageTitle from 'shared_components/page_title';
import SearchPager from 'shared_components/search_pager';
import { GLOBAL_TABLE_PAGE_SIZE } from 'global_config/constant-global';
import SearchForm from './searchForm';
import SearchTable from './table';
import BloodInventoryDetailsForm from "../blood_inventory_details";

function SearchBloodInventory() {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(GLOBAL_TABLE_PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [visibleDrawer, setvisibleDrawer] = useState(false);
  const [panelInfo, setPanelInfo] = useState({});

  function handleChangeSize(size) {
    setPageSize(size);
  }

  function displayDrawerUpdate() {
    setvisibleDrawer(true);
  }

  function onDrawerClose() {
    setvisibleDrawer(false);
  }

  useEffect(() => {
    
  }) 

  return (
    <div>
      <PageTitle pageTitle="BLOOD INVENTORY" />
      <SearchForm />
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
          // drawerButton={this.state.drawerButton}
          panelInfo={panelInfo}
          onCancel={onDrawerClose}
        />
      </Drawer>
    </div>
  );
}

export default SearchBloodInventory;