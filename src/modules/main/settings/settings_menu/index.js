import React from 'react';
import { Row } from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import SettingsCard from './settings_card'

import {
    LabExamRequestIcon,
    UserMaintenanceIcon
} from "../../../../images";

const settingsItemData = [
    {
        image: LabExamRequestIcon,
        link: '#',
        label: 'Exam Request Item',
        col: '4',
        offset: '2'
    },
    {
        image: LabExamRequestIcon,
        link: '#',
        label: 'Profile Exam',
        col: '4'
    },
    {
        image: LabExamRequestIcon,
        link: '#',
        label: 'Lab Exam Request',
        col: '4',
    },
    {
        image: LabExamRequestIcon,
        link: '/user_maintenance',
        label: 'Panel Exam',
        col: '4'
    },
    {
        image: UserMaintenanceIcon,
        link: '../settings/user-maintenance',
        label: 'User Maintenance',
        col: '4'
    },
]

class SettingsMenu extends React.Component {
    render() {
        const Items = settingsItemData.map((item) => (
            <SettingsCard 
                classMarginBottom={item.classMarginBottom}
                image={item.image} 
                link={item.link} 
                label={item.label} 
                offset={item.offset} 
                col={4} 
            />
        ))
        return(
            <div>
                <PageTitle pageTitle="SETTINGS" />
                <Row gutter={40} style={{paddingTop: '20px'}}>
                    {Items}
                </Row>
            </div>
        );
    }
}


export default SettingsMenu;