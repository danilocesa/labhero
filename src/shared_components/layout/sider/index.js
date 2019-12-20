// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { ReactComponent as HomeIcon } from 'icons/home.svg';
import { ReactComponent as AddIcon } from 'icons/add.svg';
import { ReactComponent as SearchIcon } from 'icons/search.svg';
import { ReactComponent as PleboIcon } from 'icons/syringe.svg';
import { ReactComponent as InventoryIcon} from 'icons/inventory.svg';
import { ReactComponent as SearchPatientIcon } from 'icons/searchpatient.svg';
import { ReactComponent as SettingsIcon } from 'icons/settings.svg';
import { ReactComponent as PrintIcon } from 'icons/fax-machine.svg';
import { ReactComponent as EditIcon } from 'icons/edit.svg';

import { SELECTED_SIDER_KEY } from '../../constant-global';

import './sider.css';

const { Sider: AntSider } = Layout;
const { SubMenu } = Menu;


class Sider extends React.Component {
	handleMenuClick = ({ key }) => {
		const selectedKey = key.includes('inventory') ? 9 : key;

		sessionStorage.setItem(SELECTED_SIDER_KEY, selectedKey);
	}

  render() {
		const { collapsed } = this.props;

    return (
	    <AntSider
        trigger={null}
        collapsible
        collapsed={collapsed}
	    >
        <div className="logo" />
        <Menu
					className="side-menu" 
					mode="inline" 
					defaultSelectedKeys={[sessionStorage.getItem(SELECTED_SIDER_KEY) || '1']}
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
									<span>CREATE REQUEST</span>
								</Link>
							</Menu.Item>
						)
					}
					{
						process.env.REACT_APP_DISPLAY_EDIT_REQUEST === '1' && (
							<Menu.Item key="3">
								<Link to="/request/edit/step/1">
									<Icon component={EditIcon} />
									<span>EDIT REQUEST</span>
								</Link>
							</Menu.Item>
						)
					}
					{
						process.env.REACT_APP_DISPLAY_PHLEBO === '1' && (
							<Menu.Item key="4">
								<Link to="/phlebo/result">
									<Icon component={PleboIcon} />
									<span>PHLEBO</span>
								</Link>
							</Menu.Item>
						)
					}
					{
						process.env.REACT_APP_DISPLAY_LAB_RESULT === '1' && (
							<Menu.Item key="5">
								<Link to="/lab/result/edit">
									<Icon component={SearchIcon} />
									<span>EDIT LAB RESULT</span>
								</Link>
							</Menu.Item>
						)
					}
					{
						process.env.REACT_APP_DISPLAY_PRINT_RESULT === '1' && (
							<Menu.Item key="6">
								<Link to="/lab/result/print">
									<Icon component={PrintIcon} />
									<span>PRINT LAB RESULT</span>
								</Link>
							</Menu.Item>
						)
					}
					{
						process.env.REACT_APP_DISPLAY_SEARCH_PATIENT === '1' && (
							<Menu.Item key="7">
								<Link to="/patient/search">
									<Icon component={SearchPatientIcon} />
									<span>EDIT PATIENT DEMOGRAPHICS</span>
								</Link>
							</Menu.Item>
						)
					}
					{
						process.env.REACT_APP_DISPLAY_SETTINGS === '1' && (
							<Menu.Item key="8">
								<Link to="/settings">
									<Icon component={SettingsIcon} />
									<span>SETTINGS</span>
								</Link>
							</Menu.Item>
						)
					}
					{ 
						process.env.REACT_APP_DISPLAY_INVENTORY === '1' && (
							<SubMenu
								key="9"
								title={(
									<span>
											<Icon component={InventoryIcon} />
											<span>INVENTORY</span>
									</span>
								)}
							>
								<Menu.Item key="inventory1">
									<Link to="/inventory/stocks"><span>Stocks</span></Link>
								</Menu.Item>
								<Menu.Item key="inventory2">
									<Link to="/inventory/transaction"><span>Transactions</span></Link>
								</Menu.Item>
								<Menu.Item key="inventory3">
									<Link to="/inventory/restock"><span>Restock</span></Link>
								</Menu.Item>
								<Menu.Item key="inventory4">
									<Link to="/inventory/takeout"><span>Takeout</span></Link>
								</Menu.Item>
								<Menu.Item key="inventory5">
									<Link to="/inventory/notifications"><span>Notifications</span></Link>
								</Menu.Item>
								<Menu.Item key="inventory6">
									<Link to="/inventory/itemsetup"><span>Item Setup</span></Link>
								</Menu.Item>
								<Menu.Item key="inventory7">
									<Link to="/inventory/settings"><span>Settings</span></Link>
								</Menu.Item>
							</SubMenu>
						)
					}
        </Menu>
     </AntSider>
    );
  }
}

Sider.propTypes = {
	collapsed: PropTypes.bool
};

Sider.defaultProps = {
	collapsed: null
}

export default Sider;
