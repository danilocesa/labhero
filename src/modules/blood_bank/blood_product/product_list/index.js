
import React from 'react';
import { Tabs } from 'antd';
import FormSearch from './form'
import ProductListTable from './table';
import PageTitle from 'shared_components/page_title';
import TablePager from 'shared_components/search_pager';
import { fetchBloodTypes } from 'services/blood_bank/blood_types'
import { fetchBloodComponents } from 'services/blood_inventory/blood_components'
import { fetchBloodStorageForLov } from 'services/blood_inventory/blood_storage'
import { fetchBloodProessingSearch } from 'services/blood_inventory/blood_processing'

const { TabPane } = Tabs;

class ProductList extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      Data: [], 
      pageSize: 5,
      loading:false
    }
  }

  async componentDidMount(){
    const apiResponseBloodType = await fetchBloodTypes();
    const apiResponseBloodStorage = await fetchBloodStorageForLov();
    const apiResponseBloodComponents = await fetchBloodComponents();
    this.setState({
      bloodComponentsList:apiResponseBloodComponents,
      bloodTypesList:apiResponseBloodType,
      bloodStorageList:apiResponseBloodStorage
    })
  }

  tabOnChange = async (key) => {
    const { PayloadFromForm } = this.state
    if (PayloadFromForm === undefined){
      
    }
    else {
      PayloadFromForm.Blood_Components_Code = key
      const APIresponseBloodProcessing = await fetchBloodProessingSearch(PayloadFromForm); 
      this.setState({ 
        Data: APIresponseBloodProcessing.results
      });
    }
  }

  onFinish = (DataFromForm, payload) => {
    this.setState({ 
      Data: DataFromForm.results, 
      PayloadFromForm: payload,
      Count: DataFromForm.count
    });
  }

  onSumbit = (record) => {
    const { history } = this.props
    history.push('/bloodbank/blood_product/detail', record)
  }

  render() {
    const { 
      Data,
      Count,
      bloodTypesList, 
      bloodStorageList, 
      bloodComponentsList,  
    } = this.state
     
    const TabPanes = bloodComponentsList === undefined ? null : bloodComponentsList.map((item) => (
      <TabPane tab={item.blood_comp_name} key={item.blood_comp_code} />
    ));

    return (
      <div>
        <PageTitle pageTitle="BLOOD PRODUCT" />
        <FormSearch 
          bloodTypesList={bloodTypesList}
          bloodStorageList={bloodStorageList}
          onFinish={this.onFinish} 
        />
        <TablePager 
          handleChangeSize={null}
          pageSize={Count === undefined ? 0 : Count}
          pageTotal={Count === undefined ? 0 : Count}
        />
        <Tabs 
          onChange={this.tabOnChange}
          defaultActiveKey="1"
        >
          {TabPanes}
        </Tabs>
        <ProductListTable 
          onSubmit = {this.onSumbit}
          Data={Data}
          pageSize={5}
        />
      </div>
    );
  }
}



export default ProductList;