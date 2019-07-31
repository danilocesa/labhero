import React from 'react';
import { Row, Col } from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import {
	LabExamRequestIcon,
	UserMaintenanceIcon
} from "images";
import SettingsCard from './settings_card'

import './setting-menu.css';


const settingsItemData = [
    {
        settingsCategory: 'Exam',
        settingsCategoryItems: [
            {
                image: LabExamRequestIcon,
                link: '/settings/exam-items',
                label: 'Exam Items',
                col: '7',
                // offset: 4
            },
            {
                image: LabExamRequestIcon,
                link: '/settings/exam-request',
                label: 'Exam Request',
                col: '7',
            }
        ]
    },
    {
        settingsCategory: 'Others',
        settingsCategoryItems: [
            {
                image: LabExamRequestIcon,
                link: '../settings/panel-exam',
                label: 'Panel Exam',
                col: '7'
            },
            {
                image: UserMaintenanceIcon,
                link: '/settings/user-maintenance',
                label: 'User Maintenance',
                col: '7'
            }
        ]
    }
]

class SettingsMenu extends React.Component {
    render() {
        const rowItems = settingsItemData.map((outerItem) => {
            const menuItems = outerItem.settingsCategoryItems.map(el => {
                return (
                    <div
                        style={{
                            padding: '20px',
                            margin: '5px 5px',
                            display: 'inline-block',
                            textAlign: 'center'
                        }}
                    >
                        <SettingsCard 
                            image={el.image} 
                            link={el.link} 
                            label={el.label} 
                            col={el.col}
                        />
                    </div>
                )
            })
            return (
                <div>
                    <Row>
                        <Col span={24} className="setting-category">
                            <p>{outerItem.settingsCategory}</p>
                        </Col>
                    </Row>
                    <Row style={{textAlign:'center'}}>
                        <Col span={24}>
                            {menuItems}
                        </Col>
                    </Row>
                </div>
            );
        });

        return(
            <div>
                <PageTitle pageTitle="SETTINGS" />
                <Row gutter={30} style={{paddingTop: '20px'}}>
                    {rowItems}
                </Row>
            </div>
        );
    }
}


export default SettingsMenu;