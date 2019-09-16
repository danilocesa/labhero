import React from 'react';
import {Table as AntTable} from 'antd';

const columns = [
    {
        title: 'TRANSACTION DATE',
        dataIndex: 'transactionDate',
        key: 'transactionDate',
    },
    {
        title: 'ITEM',
        dataIndex: 'item',
        key: 'item',
    },
    {
        title: 'DESCRIPTION',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'UNIT',
        dataIndex: 'unit',
        key: 'unit',
    },
    {
        title: 'EXPIRATION DATE',
        dataIndex: 'expirationDate',
        key: 'expirationDate',
    },
    {
        title: 'LOCATION',
        dataIndex: 'location',
        key: 'location'
    },
    {
        title: 'SECTION',
        dataIndex: 'section',
        key: 'section'
    },
    {
        title: 'PRICE',
        dataIndex: 'price',
        key: 'price'
    },
    {
        title: 'QUANTITY',
        dataIndex: 'quantity',
        key: 'quantity'
    },
];

const dataSource = [
    {
        key: '1',
        transactionDate: '09/09/2019',
        item: 'Inventory Item1',
        description: 'sample description',
        unit: 'Bag',
        expirationDate: '09/09/2029',
        location: 'Manila', 
        section: 'sec1',
        price: '999.99',
        quantity: '200',
    },
    {
        key: '2',
        transactionDate: '09/09/2019',
        item: 'Inventory Item2',
        description: 'sample description',
        unit: 'Pitcher',
        expirationDate: '09/09/2029',
        location: 'Manila', 
        section: 'sec2',
        price: '999.99',
        quantity: '200',
    },
    {
        key: '3',
        transactionDate: '09/09/2019',
        item: 'Inventory Item3',
        description: 'sample description',
        unit: 'Pitcher',
        expirationDate: '09/09/2029',
        location: 'Manila', 
        section: 'sec2',
        price: '999.99',
        quantity: '200',
    },
    {
        key: '4',
        transactionDate: '09/09/2019',
        item: 'Inventory Item4',
        description: 'sample description',
        unit: 'Box',
        expirationDate: '09/09/2029',
        location: 'Manila', 
        section: 'sec2',
        price: '999.99',
        quantity: '200',
    },
];

class NotificationsTable extends React.Component{

    render(){
        return(
            <div>
                <div>
                    <AntTable 
                    columns={columns}
                    dataSource ={dataSource}
                    />
                </div>
            </div>
        );
    }
}

export default NotificationsTable;