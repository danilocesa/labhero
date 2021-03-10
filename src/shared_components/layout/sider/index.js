// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import URI from 'global_config/uri';
import { ReactComponent as HomeIcon } from 'icons/home.svg';
import { ReactComponent as AddIcon } from 'icons/add.svg';
import { ReactComponent as SearchIcon } from 'icons/search.svg';
import { ReactComponent as PleboIcon } from 'icons/syringe.svg';
import { ReactComponent as InventoryIcon} from 'icons/inventory.svg';
import { ReactComponent as SearchPatientIcon } from 'icons/searchpatient.svg';
import { ReactComponent as SettingsIcon } from 'icons/settings.svg';
// import { ReactComponent as PrintIcon } from 'icons/fax-machine.svg';
import { ReactComponent as EditIcon } from 'icons/edit_2.svg';
import { ReactComponent as BloodBankIcon } from 'icons/blood-bank.svg';
import { ReactComponent as RequestIcon } from 'icons/request.svg';
import { LR_REQUEST_TYPE } from 'modules/main/lab_request/steps/constants';
import { SELECTED_SIDER_KEY } from 'global_config/constant-global';

// eslint-disable-next-line import/no-extraneous-dependencies
import Icon from '@ant-design/icons';
import './sider.css';

const { Sider: AntSider } = Layout;


class Sider extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			panelVisible:''
		}
	}

	componentDidMount(){
		if (sessionStorage.LOGGEDIN_USER_DATA){
			const accessMatrix = JSON.parse(sessionStorage.ACCESS_MATRIX)
	  	const settingsView = accessMatrix.settings.view
			const userData = JSON.parse(sessionStorage.LOGGEDIN_USER_DATA)
			const UserDatatype = userData.loginType
			if (settingsView.some(data => data === UserDatatype))
				{
					this.setState({
						panelVisible:true
					})
					// window.location.reload(false);
				}
		}
	}
	handleMenuClick = ({ key }) => {
		const selectedKey = key.includes('inventory') ? 9 : key;	
		sessionStorage.setItem(SELECTED_SIDER_KEY, selectedKey);
		// workaround to avoid delays in stepsPage
		if(key === '2') 
			sessionStorage.setItem(LR_REQUEST_TYPE, 'create');
		if(key === '3')
			sessionStorage.setItem(LR_REQUEST_TYPE, 'edit');
	}

  render() {
		const { panelVisible } = this.state
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
						process.env.REACT_APP_DISPLAY_VIEW_REQUEST === '1' && (
							<Menu.Item key={URI.viewLabReq.key}>
								<Link to={URI.viewLabReq.link}>
									<Icon component={RequestIcon} />
									<span>VIEW REQUEST</span>
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
									<span>LABORATORY RESULT</span>
								</Link>
							</Menu.Item>
						)
					}
					{/* {
						process.env.REACT_APP_DISPLAY_PRINT_RESULT === '1' && (
							<Menu.Item key={URI.printLabResult.key}>
								<Link to={URI.printLabResult.link}>
									<Icon component={PrintIcon} />
									<span>PRINT LAB RESULT</span>
								</Link>
							</Menu.Item>
						)
					} */}
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
						panelVisible === true ? 
							process.env.REACT_APP_DISPLAY_SETTINGS === '1' && (
								<Menu.Item key={URI.settings.key}>
									<Link to={URI.settings.link}>
										<Icon component={SettingsIcon} />
										<span>SETTINGS</span>
									</Link>
								</Menu.Item>
							)
						:
						null
					}
					
					{ 
						process.env.REACT_APP_DISPLAY_INVENTORY === '1' && (
							<Menu.Item key={URI.inventory.key}>
								<Link to={URI.inventory.link}>
								<Icon component={InventoryIcon} />
								<span>INVENTORY</span>
								</Link>
							</Menu.Item>
						)
					}
					{
						process.env.REACT_APP_DISPLAY_BLOODBANK === '1' && (
							<Menu.Item key={URI.bloodbank.key}>
								<Link to={URI.bloodbank.link}>
									<Icon component={BloodBankIcon} />
									<span>BLOOD BANK</span>
								</Link>
							</Menu.Item>
						)
					}
					 {
						process.env.REACT_APP_DISPLAY_CASHIER === '1' && (
							<Menu.Item key={URI.cashier.key}>
								<Link to={URI.cashier.link}>
									<Icon component={SearchPatientIcon} />
									<span>CASHIER</span>
								</Link>
							</Menu.Item>
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
