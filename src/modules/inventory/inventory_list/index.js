import React, { Component } from "react";
import PageTitle from "shared_components/page_title";
import SearchForm from "modules/inventory/inventory_list/search_form";
// eslint-disable-next-line import/no-named-as-default
import InventoryListTable from "modules/inventory/inventory_list/inventory_table";

export class InventoryList extends Component {
  render() {
    return (
      <div>
        <PageTitle pageTitle="INVENTORY LIST" align="left" />
        <SearchForm />
        <InventoryListTable />
      </div>
    );
  }
}

export default InventoryList;
