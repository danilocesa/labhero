import React from 'react';
import { Row } from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import {
	LabExamRequestIcon,
	UserMaintenanceIcon
} from "images";
import SettingsCard from './settings_card'


const settingsItemData = [
    {
        image: LabExamRequestIcon,
        link: '/settings/exam-request',
        label: 'Exam Request Item',
        col: '4',
        offset: 2
    },
    {
        image: LabExamRequestIcon,
        link: '/settings/profile-exam',
        label: 'Profile Exam',
        col: '4'
    },
    {
        image: LabExamRequestIcon,
        link: '/settings/lab-exam-request',
        label: 'Lab Exam Request',
        col: '4',
    },
    {
        image: LabExamRequestIcon,
        link: '../settings/panel-exam',
        label: 'Panel Exam',
        col: '4'
    },
    {
        image: UserMaintenanceIcon,
        link: '/settings/user-maintenance',
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