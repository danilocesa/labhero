import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { ReactComponent as HomeIcon } from '../../../icons/home.svg';
import { ReactComponent as AddIcon } from '../../../icons/add.svg';
import { ReactComponent as SearchIcon } from '../../../icons/search.svg';
import { ReactComponent as PleboIcon } from '../../../icons/syringe.svg';
import { ReactComponent as SearchPatientIcon } from '../../../icons/searchpatient.svg';

import { SELECTED_SIDER_KEY } from '../../constant-global';

import './sider.css';

const { Sider: AntSider } = Layout;


class Sider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SELECTED_SIDER_KEY: '',
    }
    // this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentWillMount() {
    this.handleMenuClick = (event) => {
      this.setState({
        SELECTED_SIDER_KEY: event.key
      }, function keys(){
       sessionStorage.setItem(SELECTED_SIDER_KEY, this.state.SELECTED_SIDER_KEY);
       sessionStorage.getItem(SELECTED_SIDER_KEY);
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
                (sessionStorage.getItem(SELECTED_SIDER_KEY) ? sessionStorage.getItem(SELECTED_SIDER_KEY) : "1" )
              ]}
              // defaultSelectedKeys={['1']}
              onClick={this.handleMenuClick}
        >
          <Menu.Item key="1">
            <Link to="/">
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
