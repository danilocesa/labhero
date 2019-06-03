import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { ReactComponent as HomeIcon } from '../../../icons/home.svg';
import { ReactComponent as AddIcon } from '../../../icons/add.svg';
import { ReactComponent as SearchIcon } from '../../../icons/search.svg';
import { ReactComponent as PleboIcon } from '../../../icons/syringe.svg';
import { ReactComponent as SearchPatientIcon } from '../../../icons/searchpatient.svg';

import './sider.css';

const { Sider: AntSider } = Layout;


class Sider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentKey: '',
    }
    // this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentWillMount() {
    this.handleMenuClick = (event) => {
      this.setState({
        currentKey: event.key
      }, function keys(){
        console.log(this.state.currentKey);
       sessionStorage.setItem("currentKey", this.state.currentKey);
       sessionStorage.getItem("currentKey");
      });
    }
  }

  render() {
    return (
	    <AntSider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
	    >
        <div className="logo" />
        <Menu
              className="side-menu" 
              mode="inline" 
              defaultSelectedKeys={[
                (sessionStorage.getItem("currentKey") ?sessionStorage.getItem("currentKey") : '1' )
              ]}
              onClick={this.handleMenuClick}
        >
          <Menu.Item key="1">
            <Link to="/dashboard">
              <Icon component={HomeIcon} />
              <span>DASHBOARD</span>
            </Link>
            <span>HOME</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/request/create/step/1">
              <Icon component={AddIcon} />
              <span>REQUEST</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/pleboresult">
              <Icon component={PleboIcon} />
              <span>PHLEBO</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/searchlabresult">
              <Icon component={SearchIcon} />
              <span>SEARCH LAB RESULT</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/searchpatient">
              <Icon component={SearchPatientIcon} />
              <span>SEARCH PATIENT</span>
            </Link>
          </Menu.Item>
        </Menu>
     </AntSider>
    );
  }
}

export default Sider;
