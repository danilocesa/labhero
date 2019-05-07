import React from 'react';
import DatePicker from 'react-datepicker';

//CSS
import 'react-datepicker/dist/react-datepicker.css';

class ReactDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        placeholderText="MM/DD/YYYY"
        className="ant-calendar-picker-input ant-input"
      />
    );
  }
}

export default ReactDatePicker;
