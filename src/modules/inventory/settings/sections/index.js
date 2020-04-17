// LiBRARY
import React from "react";
import SectionForm from "./section_form/section_form";
import "./section.css";
import TablePager from "shared_components/table_pager";
import {
  Row as AntRow,
  Col as AntCol,
  Typography,
  Form as AntForm,
  Input as AntInput,
  Button as AntButton,
  Table as AntTable,
  Input,
  Button,
  Icon,
  Drawer
} from "antd";

// CUSTOM MODULES
import {
  drawerSectionTitle,
  drawerSectionTitleAdd,
  buttonLabels,
  addSectionButton
} from "../settings";

//  CONSTANTS
const { Title } = Typography;
const { TextArea } = AntInput;
const { Search } = Input;

const toInputUppercase = e => {
  e.target.value = ("" + e.target.value).toUpperCase();
};

const columns = [
  {
    title: "SECTION CODE",
    dataIndex: "section_code",
    key: "section_code"
  },
  {
    title: "SECTION NAME",
    dataIndex: "section_name",
    key: "section_name"
  },
  {
    title: "DESCRIPTION",
    dataIndex: "description",
    key: "description"
  }
];

class InventorySectionTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          key: "1",
          section_code: 1,
          section_name: "John Brown",
          description: "Description"
        },
        {
          key: "2",
          section_code: 2,
          section_name: "Jim Green",
          description: "Description"
        },
        {
          key: "3",
          section_code: 3,
          section_name: "Joe Black",
          description: "Description"
        }
      ],
      usersRef: [
        {
          key: "1",
          section_code: 1,
          section_name: "John Brown",
          description: "Description"
        },
        {
          key: "2",
          section_code: 2,
          section_name: "Jim Green",
          description: "Description"
        },
        {
          key: "3",
          section_code: 3,
          section_name: "Joe Black",
          description: "Description"
        }
      ],
      actionType: "add"
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  // Private Function
  containsString = (searchFrom, searchedVal) => {
    if (searchFrom === null || searchFrom === "") return false;

    return searchFrom
      .toString()
      .toLowerCase()
      .includes(searchedVal);
  };

  onSearch = value => {
    const searchedVal = value.toLowerCase();
    const { usersRef } = this.state;

    const filtered = usersRef.filter(item => {
      const { section_code, section_name, description } = item;

      return (
        this.containsString(section_code, searchedVal) ||
        this.containsString(section_name, searchedVal) ||
        this.containsString(description, searchedVal)
      );
    });

    this.setState({ data: filtered });
  };

  onChangeSearch = event => {
    const { usersRef } = this.state;

    if (event.target.value === "") this.setState({ data: usersRef });
  };

  displayDrawerUpdate = record => {
    this.setState({
      isDrawerVisible: true,
      drawerTitle: drawerSectionTitle,
      drawerButton: buttonLabels.update,
      actionType: "update",
      panelInfo: record
    });
  };

  displayDrawerAdd = record => {
    this.setState({
      isDrawerVisible: true,
      drawerTitle: drawerSectionTitleAdd,
      drawerButton: buttonLabels.create,
      actionType: "add",
      panelInfo: record
    });
  };

  onClose = () => {
    this.setState({
      isDrawerVisible: false
    });
  };

  handleSelectChange = value => {
    console.log(value);
    const { pagination } = this.state;
    // eslint-disable-next-line radix
    pagination.pageSize = parseInt(value);
    this.setState({ pagination });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { actionType } = this.state;
    return (
      <div>
        <AntRow>
          <AntCol span={24}>
            <div className="panel-table-options" style={{ marginTop: 10 }}>
              <AntRow>
                <AntCol span={12}>
                  <Search
                    allowClear
                    onSearch={value => this.onSearch(value)}
                    onChange={this.onChangeSearch}
                    style={{ width: 200 }}
                    className="panel-table-search-input"
                  />
                </AntCol>
                <AntCol span={12} style={{ textAlign: "right" }}>
                  <Button
                    type="primary"
                    shape="round"
                    style={{ marginRight: "15px" }}
                    onClick={this.displayDrawerAdd}
                  >
                    <Icon type="plus" />
                    {addSectionButton}
                  </Button>
                  <TablePager handleChange={this.handleSelectChange} />
                </AntCol>
              </AntRow>
            </div>
            <AntTable
              style={{ textTransform: "uppercase" }}
              columns={columns}
              dataSource={this.state.data}
              onRow={record => {
                return {
                  onDoubleClick: () => {
                    this.displayDrawerUpdate(record);
                  }
                };
              }}
            />
            <Drawer
              title={this.state.drawerTitle}
              visible={this.state.isDrawerVisible}
              onClose={this.onClose}
              width="30%"
              destroyOnClose
            >
              <SectionForm
                actionType={actionType}
                drawerButton={this.state.drawerButton}
                panelInfo={this.state.panelInfo}
                onCancel={this.onClose}
              />
            </Drawer>
          </AntCol>
        </AntRow>
      </div>
    );
  }
}

const InventorySection = AntForm.create()(InventorySectionTemplate);

export default InventorySection;
