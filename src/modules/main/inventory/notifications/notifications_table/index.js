import React from 'react';
import {Table as AntTable, Modal, Button} from 'antd';

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

const modalColumns = [
    {
        title: 'DR No.',
        dataIndex: 'drNumber',
        key: 'drNumber',
    },
    {
        title: 'ITEM',
        dataIndex: 'item',
        key: 'item',
    },
    {
        title: 'ITEM DESCRIPTION',
        dataIndex: 'itemDescription',
        key: 'itemDescription',
    },
    {
        title: 'EXPIRATION DATE',
        dataIndex: 'expirationDate',
        key: 'expirationDate',
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
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            loading: false,
        };
    }

    componentDidMount = () => {
        this.showModal();
    }

    handleApi =( {params} ) =>{

    }

    handleDelete = () => {
        var v_method = 'Update';
        console.log('We don/t delete we ',v_method);
        //code to delete here
        this.setState({ visible:false });
    }

    handleExit = () =>{
        this.setState({ visible:false });
    }

    showModal = () =>{
        this.setState({ visible:true });
    }

    render(){
        const { visible } = this.state;
        return(
            <div>
                <div>
                    <AntTable 
                    columns={columns}
                    dataSource ={dataSource}
                    />
                </div>
                <Modal
                    visible={visible}   
                    width={800} 
                    footer={[
                        <Button key="back" onClick={this.handleExit}>
                            Exit
                        </Button>,
                        <Button key="submit" type="danger" onClick={this.handleDelete}>
                            Delete
                        </Button>
                    ]}
                >
                    <div>
                        <AntTable columns={modalColumns} />
                    </div>
                 </Modal>
            </div>
        );
    }
}

export default NotificationsTable;