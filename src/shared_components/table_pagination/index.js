import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, Button } from 'antd';
import {fetchPatientsNext}  from 'services/blood_bank/extraction';


class TablePagination extends React.Component {


  onChange = async (page) =>{
    const { parentCallback} = this.props
    parentCallback(page)
  }

	render() {
    const {pageSize, count} = this.props

		return (
			<div style={{ display: "flex" }}>
        <Pagination
          style={{ marginLeft: "auto" }}
          pageSize={pageSize}
          total={count}
          onChange={this.onChange}
        />
			</div>
		);
	}
}

TablePagination.propTypes = {
	pageSize:PropTypes.number.isRequired,
  count:PropTypes.number.isRequired
};

export default TablePagination;