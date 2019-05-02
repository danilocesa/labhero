import React from 'react';
import { Tag as AntTag } from 'antd';

const { CheckableTag } = AntTag;

class Tag extends React.Component {
  state = { checked: this.props.checked };

  handleChange = (checked) => {
    this.setState({ checked });
  }

  render() {
    return (
      <CheckableTag {...this.props} 
                    checked={this.state.checked} 
                    onChange={this.handleChange} />);
  }
}

export default Tag;