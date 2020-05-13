import React from "react";
import PageTitle from "shared_components/page_title";
import SearchForm from "./search_form";
import SearchResult from "./search_result";

class Transaction extends React.Component {
  render() {
    return (
      <div>
        <div
          className="ant-row-flex ant-row-flex-center"
          style={{ marginBottom: 20 }}
        >
          <h4 style={{ textAlign: "center" }} className="ant-typography">
		  INVENTORY / TRANSACTIONS
          </h4>
        </div>
        <SearchForm />
        <SearchResult />
      </div>
    );
  }
}

export default Transaction;
