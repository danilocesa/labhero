import React from 'react';
import { Form } from 'antd';
import DynamicInput from '../dynamic_input';

const EditableContext = React.createContext(null);
// const FormItem = Form.Item;

const EditableRow = ({ form, index, ...props }) => (
	<EditableContext.Provider value={form}>
		<tr {...props} />
	</EditableContext.Provider>
);

export const EditableFormRow = Form.create()(EditableRow);

export class EditableCell extends React.Component {
	constructor(props) {
		super(props);

		this.state = { editing: false };
	}

	onKeyUp = () => {}

  toggleEdit = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
		const { record, handleSave } = this.props;

		console.log('onsave triggered');

    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
			}
			
			this.toggleEdit();
			
      handleSave({ ...record, ...values });
    });
  };

  render() {
    const { editing } = this.state;
		const { editable, dataIndex, title, record, index, handleSave, ...restProps } = this.props;
		
		console.log('editable', editable);
		console.log('dataIndex', dataIndex);

    return (
	    <td {...restProps}>
		    {editable ? (
			    <EditableContext.Consumer>
				    {form => {
              this.form = form;
              return editing ? (
								<DynamicInput 
									typeCode={record.examItemTypeCode}
									unitCode={record.examItemUnitCode}
									isLock={record.examRequestItemLock === 1}
									value="a"
									form={form}
									onSave={this.save}
									fieldName={dataIndex}
									ref={node => (this.input = node)}
								/>
              ) : (
	              <div 
		              className="editable-cell-value-wrap" 
		              style={{ paddingRight: 24 }} 
									onClick={this.toggleEdit} 
									onKeyUp={this.onKeyUp}
									role="button"
									tabIndex={0}
	              >
		             {restProps.children}
	              </div>
              );
            }}
			    </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
	    </td>
    );
  }
}
