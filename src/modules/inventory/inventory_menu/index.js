// @ts-nocheck
import React from "react";
import { Row } from "antd";

// CUSTOM MODULES
import PageTitle from "shared_components/page_title";
import {
  InvList,
  InvListLots,
  InvRestock,
  InvSettings,
  InvTakeout,
  InvTransaction
} from "images";
import InventoryCard from "./inventory_card";

import "./inventory_menu.css";

const settingsItemData = [
  {
    image: InvList,
    link: "/inventory/Transactions",
    label: "Inventory List"
  },
  {
    image: InvListLots,
    link: "/inventory/itemsetup",
    label: "Item Set Up"
  },
  {
    image: InvRestock,
    link: "../inventory/restock",
    label: "Restock"
  },
  {
    image: InvTakeout,
    link: "/inventory/takeout",
    label: "Takeout"
  },
  {
    image: InvTransaction,
    link: "/inventory/transactions",
    label: "Transactions"
  },
  {
    image: InvSettings,
    link: "/inventory/settings",
	label: "Settings"
  },
];

class InventoryMenu extends React.Component {
  render() {
    const rowItems = settingsItemData.map(el => {
      return (
        <InventoryCard
          image={el.image}
          link={el.link}
          label={el.label}
          offset={el.offset}
          className=""
          key={el.label}
        />
      );
    });

    return (
      <div>
        <PageTitle pageTitle="INVENTORY" />
        <Row gutter={20} style={{ paddingTop: "10px" }}>
          {rowItems}
        </Row>
      </div>
    );
  }
}

export default InventoryMenu;
