import React from 'react';
import { Tag as AntTag, Tooltip } from 'antd';

const { CheckableTag } = AntTag;

const TagStyle = {
  style: {
    width: 120,
    textAlign: 'center',
    textOverFlow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    padding: '5px 0px',
    margin: 5,
    border: '1px solid #d9d9d9'
  }
};

class Tag extends React.Component {
  state = { checked: this.props.checked };

  handleChange = (checked) => {
    this.setState({ checked });
  }

  render() {
    return (
      <Tooltip title={this.props.title}>
        <CheckableTag {...this.props} 
                      checked={this.state.checked} 
                      onChange={this.handleChange} 
                      {...TagStyle}>
          {this.props.children}
        </CheckableTag>
      </Tooltip>
    );
  }
}

export default Tag;