import React from "react";
import PageTitle from "shared_components/page_title";
import SearchForm from "./search_form";
import SearchResult from "./search_result";

class Transaction extends React.Component {
  render() {
    return (
      <div>
        <PageTitle pageTitle="TRANSACTIONS" align="CENTER" />
        <SearchForm />
        <SearchResult />
      </div>
    );
  }
}

export default Transaction;
