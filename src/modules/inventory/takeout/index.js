import React from "react";
import { Collapse } from "antd";

import PageTitle from "shared_components/page_title";
import SearchForm from "./search_form";
import TakeoutTable from "./table";
import Footer from "./footer";

// eslint-disable-next-line no-unused-vars
const { Panel } = Collapse;

class Takeout extends React.Component {
	
  state = {
      // eslint-disable-next-line react/no-unused-state
      datatable: [
        {
          key: "1",
          lot_code: "001",
          item: "ITEM DESCRIPTION",
          quantity: 200,
          amount: 150.0,
          expiry_date: "05/05/2020",
          storage: "STORAGE 1",
          supplier: "SUPPLIER 1",
          width: 250
        },
        {
          key: "2",
          lot_code: "002",
          item: "ITEM DESCRIPTION",
          quantity: 100,
          amount: 150.0,
          expiry_date: "05/05/2020",
          storage: "STORAGE 2",
          supplier: "SUPPLIER 2",
          width: 250
        },
        {
          key: "3",
          lot_code: "003",
          item: "ITEM DESCRIPTION",
          quantity: 500,
          amount: 150.0,
          expiry_date: "05/05/2020",
          storage: "STORAGE 3",
          supplier: "SUPPLIER 3",
          width: 250
        }
      ]
    };

  render() {
    return (
      <div>
        <PageTitle pageTitle="INVENTORY / TAKEOUT" align="left" />
        <Collapse bordered={false}>
          <SearchForm />
          {/* <TakeoutForm /> */}
          <TakeoutTable datatable={this.state.datatable} />
        </Collapse>
        <Footer />
      </div>
    );
  }
}

export default Takeout;
