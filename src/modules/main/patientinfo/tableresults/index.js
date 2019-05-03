import React from 'react';
import { Table, Input, Form, Typography } from 'antd';
import 'antd/dist/antd.css';

import './table.css';



const FormItem = Form.Item;
const EditableContext = React.createContext();
const { Text } = Typography;

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }
};

class EditableCell extends React.Component {
  state = {
    editing: false,
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  save = (e) => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `${title} is required.`,
                      }],
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                        onBlur={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                  <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                  >
                    {restProps.children}
                  </div>
                )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'EXAM NAME',
      dataIndex: 'name',
      width: 200,
    },{
      title: 'INSTRUMENT RESULT',
      dataIndex: 'inst_result',
      width: 200,
    },{
      title: 'RESULT',
      dataIndex: 'result',
      editable: true,
      width: 200,
    }, {
      title: 'NORMAL VALUES',
      dataIndex: 'values',
      width: 200,
    }, {
      title: 'STATUS',
      dataIndex: 'status',
      width: 200,
    }];

    this.state = {
      dataSource: [{
        key: '0',
        name: 'Hemoglobin',
        inst_result: '85',
        result: '85',
        values: '14.0 - 17.5',
        status: <Text type="danger">HIGH</Text>
      },{
        key: '1',
        name: 'Hematocrit',
        inst_result: '0.257',
        result: '0.257',
        values: '41.5 - 50.4',
        status: <Text style={{ color: 'blue' }}>LOW</Text>
      },{
        key: '2',
        name: 'Exam 1',
        inst_result: '0.257',
        result: '0.257',
        values: '41.5 - 50.4',
        status: <Text style={{ color: 'blue' }}>LOW</Text>
      },{
        key: '3',
        name: 'Exam 2',
        inst_result: '0.257',
        result: '0.257',
        values: '41.5 - 50.4',
        status: <Text style={{ color: 'blue' }}>LOW</Text>
      },{
        key: '4',
        name: 'Exam 3',
        inst_result: '0.257',
        result: '0.257',
        values: '41.5 - 50.4',
        status: <Text style={{ color: 'blue' }}>LOW</Text>
      }]
    };
  }

 
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  }

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
        <div className="patient-table">
          <Table
          components={components}
          rowClassName={() => 'editable-row'}
          dataSource={dataSource}
          columns={columns}
          rowSelection={rowSelection}
          scroll={{ x: 800 }}
          size="small"
          pagination={false}
        />
        </div>
    );
  }
}

export default EditableTable