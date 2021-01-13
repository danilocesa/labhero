import React from "react";
import { Collapse } from "antd";

import PageTitle from "shared_components/page_title";
import SearchForm from "./search_form";
// import TakeoutTable from "./table";
import Footer from "./footer";


class Takeout extends React.Component {
  render() {
    return (
      <div>
        <PageTitle pageTitle="TAKEOUT" align="CENTER" />
        <Collapse bordered={false}>
          <SearchForm />
          {/* <TakeoutForm /> */}
          {/* <TakeoutTable datatable={this.state.datatable} /> */}
        </Collapse>
        <Footer />
      </div>
    );
  }
}

export default Takeout;
