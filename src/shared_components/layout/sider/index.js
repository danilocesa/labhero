// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import URI from 'global_config/uri';
import { ReactComponent as HomeIcon } from 'icons/home.svg';
import { ReactComponent as AddIcon } from 'icons/add.svg';
import { ReactComponent as SearchIcon } from 'icons/search.svg';
import { ReactComponent as PleboIcon } from 'icons/syringe.svg';
import { ReactComponent as InventoryIcon} from 'icons/inventory.svg';
import { ReactComponent as SearchPatientIcon } from 'icons/searchpatient.svg';
import { ReactComponent as SettingsIcon } from 'icons/settings.svg';
import { ReactComponent as PrintIcon } from 'icons/fax-machine.svg';
import { ReactComponent as EditIcon } from 'icons/edit.svg';

import { SELECTED_SIDER_KEY } from '../../../global_config/constant-global';

import './sider.css';

const { Sider: AntSider } = Layout;
const { SubMenu } = Menu;


class Sider extends React.Component {
	handleMenuClick = ({ key }) => {
		// const isInventorySelected = Object.keys(URI.inventory.sub).some(i => URI.inventory.sub[i].key === key);
		// const selectedKey = isInventorySelected ? URI.inventory.key : key;

		const selectedKey = key.includes('inventory') ? 9 : key;
		sessionStorage.setItem(SELECTED_SIDER_KEY, selectedKey);

		// workaround to avoid delays in stepsPage

		switch(key){
				case '2':
					sessionStorage.setItem('REQUEST_TYPE','create');
					sessionStorage.setItem('MODULE_PROFILE','createRequest');
					break;
				case '3':	
					sessionStorage.setItem('REQUEST_TYPE','edit');
					sessionStorage.setItem('MODULE_PROFILE','editRequest');
					break;
				default:
		}
		// sessionStorage.setItem(SELECTED_SIDER_KEY, key);
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
							<Menu.Item key={URI.dashboard.key}>
								<Link to={URI.dashboard.link}>
									<Icon component={HomeIcon} />
									<span>DASHBOARD</span>
								</Link>
								<span>HOME</span>
							</Menu.Item>
						)
					}
					{
						process.env.REACT_APP_DISPLAY_LAB_REQUEST === '1' && (
							<Menu.Item key={URI.createLabReq.key}>
								<Link to={URI.createLabReq.link}>
									<Icon component={AddIcon} />
									<span>CREATE REQUEST</span>
								</Link>
							</Menu.Item>
						)
					}
					{
						process.env.REACT_APP_DISPLAY_EDIT_REQUEST === '1' && (
							<Menu.Item key={URI.editLabReq.key}>
								<Link to={URI.editLabReq.link}>
									<Icon component={EditIcon} />
									<span>EDIT REQUEST</span>
								</Link>
							</Menu.Item>
						)
					}
					{
						process.env.REACT_APP_DISPLAY_PHLEBO === '1' && (
							<Menu.Item key={URI.phlebo.key}>
								<Link to={URI.phlebo.link}>
									<Icon component={PleboIcon} />
									<span>PHLEBO</span>
								</Link>
							</Menu.Item>
						)
					}
					{
						process.env.REACT_APP_DISPLAY_LAB_RESULT === '1' && (
							<Menu.Item key={URI.editLabResult.key}>
								<Link to={URI.editLabResult.link}>
									<Icon component={SearchIcon} />
									<span>EDIT LAB RESULT</span>
								</Link>
							</Menu.Item>
						)
					}
					{
						process.env.REACT_APP_DISPLAY_PRINT_RESULT === '1' && (
							<Menu.Item key={URI.printLabResult.key}>
								<Link to={URI.printLabResult.link}>
									<Icon component={PrintIcon} />
									<span>PRINT LAB RESULT</span>
								</Link>
							</Menu.Item>
						)
					}
					{
						process.env.REACT_APP_DISPLAY_SEARCH_PATIENT === '1' && (
							<Menu.Item key={URI.searchPatient.key}>
								<Link to={URI.searchPatient.link}>
									<Icon component={SearchPatientIcon} />
									<span>EDIT PATIENT DEMOGRAPHICS</span>
								</Link>
							</Menu.Item>
						)
					}
					{
						process.env.REACT_APP_DISPLAY_SETTINGS === '1' && (
							<Menu.Item key={URI.settings.key}>
								<Link to={URI.settings.link}>
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
								<Menu.Item key={URI.inventory.sub.stocks.key}>
									<Link to={URI.inventory.sub.stocks.link}><span>Stocks</span></Link>
								</Menu.Item>
								<Menu.Item key={URI.inventory.sub.transaction.key}>
									<Link to={URI.inventory.sub.transaction.link}><span>Transactions</span></Link>
								</Menu.Item>
								<Menu.Item key={URI.inventory.sub.restock.key}>
									<Link to={URI.inventory.sub.restock.link}><span>Restock</span></Link>
								</Menu.Item>
								<Menu.Item key={URI.inventory.sub.takeout.key}>
									<Link to={URI.inventory.sub.takeout.link}><span>Takeout</span></Link>
								</Menu.Item>
								<Menu.Item key={URI.inventory.sub.notifications.key}>
									<Link to={URI.inventory.sub.notifications.link}><span>Notifications</span></Link>
								</Menu.Item>
								<Menu.Item key={URI.inventory.sub.itemsetup.key}>
									<Link to={URI.inventory.sub.itemsetup.link}><span>Item Setup</span></Link>
								</Menu.Item>
								<Menu.Item key={URI.inventory.sub.settings.key}>
									<Link to={URI.inventory.sub.settings.link}><span>Settings</span></Link>
								</Menu.Item>
							</SubMenu>
						)
					}
					{
						process.env.REACT_APP_DISPLAY_BLOODBANK === '1' && (
							<Menu.Item key={URI.bloodbank.key}>
								<Link to={URI.bloodbank.link}>
									<Icon component={SettingsIcon} />
									<span>BLOOD BANK</span>
								</Link>
							</Menu.Item>
						)
					}
					{/* {
						process.env.REACT_APP_DISPLAY_CASHIER === '1' && (
							<Menu.Item key={URI.cashier.key}>
								<Link to={URI.cashier.link}>
									<Icon component={SearchPatientIcon} />
									<span>CASHIER</span>
								</Link>
							</Menu.Item>
						)
					} */}
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
