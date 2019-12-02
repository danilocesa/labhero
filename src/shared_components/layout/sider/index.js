import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { ReactComponent as HomeIcon } from 'icons/home.svg';
import { ReactComponent as AddIcon } from 'icons/add.svg';
import { ReactComponent as SearchIcon } from 'icons/search.svg';
import { ReactComponent as PleboIcon } from 'icons/syringe.svg';
import { ReactComponent as InventoryIcon} from 'icons/inventory.svg';
import { ReactComponent as SearchPatientIcon } from 'icons/searchpatient.svg';
import { ReactComponent as SettingsIcon } from 'icons/settings.svg';

import { SELECTED_SIDER_KEY } from '../../constant-global';

import './sider.css';

const { Sider: AntSider } = Layout;


class Sider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SELECTED_SIDER_KEY: '',
    }
  }

	// UNSAFE_componentWillMount()
  componentDidMount() {
    this.handleMenuClick = (event) => {
      this.setState({
        SELECTED_SIDER_KEY: event.key,
        
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
						(sessionStorage.getItem(SELECTED_SIDER_KEY) ? sessionStorage.getItem(SELECTED_SIDER_KEY) : '1' )
					]}
					// defaultSelectedKeys={['1']}
					onClick={this.handleMenuClick}
        >
					{
						process.env.REACT_APP_DISPLAY_HOME === '1' && (
							<Menu.Item key="1">
								<Link to="/">
									<Icon component={HomeIcon} />
									<span>DASHBOARD</span>
								</Link>
								<span>HOME</span>
							</Menu.Item>
						)
					}
					{
						process.env.REACT_APP_DISPLAY_LAB_REQUEST === '1' && (
							<Menu.Item key="2">
								<Link to="/request/create/step/1">
									<Icon component={AddIcon} />
									<span>REQUEST {process.env.REACT_APP_DISPLAY_LAB_REQUEST}</span>
								</Link>
							</Menu.Item>
						)
					}
					{
						process.env.REACT_APP_DISPLAY_PHLEBO === '1' && (
							<Menu.Item key="4">
								<Link to="/phleboresult">
									<Icon component={PleboIcon} />
									<span>PHLEBO</span>
								</Link>
							</Menu.Item>
						)
					}
					{
						process.env.REACT_APP_DISPLAY_LAB_RESULT === '1' && (
							<Menu.Item key="3">
								<Link to="/searchlabresult">
									<Icon component={SearchIcon} />
									<span>SEARCH LAB RESULT</span>
								</Link>
							</Menu.Item>
						)
					}
					{
						process.env.REACT_APP_DISPLAY_SEARCH_PATIENT === '1' && (
							<Menu.Item key="5">
								<Link to="/searchpatient">
									<Icon component={SearchPatientIcon} />
									<span>PATIENT DEMOGRAPHICS</span>
								</Link>
							</Menu.Item>
						)
					}
					{
						process.env.REACT_APP_DISPLAY_SETTINGS === '1' && (
							<Menu.Item key="6">
								<Link to="/settings">
									<Icon component={SettingsIcon} />
									<span>SETTINGS {process.env.REACT_APP_DISPLAY_INVENTORY}</span>
								</Link>
							</Menu.Item>
						)
					}
					{ 
						process.env.REACT_APP_DISPLAY_INVENTORY === '1' && (
							<Menu.Item key="7">
								<Link to="/inventory">
									<Icon component={InventoryIcon} />
									<span>INVENTORY</span>
								</Link>
							</Menu.Item>
						)
					}
        </Menu>
     </AntSider>
    );
  }
}

export default Sider;
