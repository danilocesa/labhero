import React from 'react';
import { Table } from 'antd';


const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
let current_datetime = new Date();
let formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + 
                    current_datetime.getFullYear() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes();


class IresultsTable extends React.Component {
    render() {

        // PARENT COLUMN HEADER
        const p_columns = [
            { title: 'RUN DATE', dataIndex: 'run_date', key: 'run_date', width: 200 },
            { title: 'MACHINE ID', dataIndex: 'machine_id', key: 'machine_id', width: 200 },
            { title: 'EXAM NAME', dataIndex: 'exam_name', key: 'exam_name',  width: 200 },
            { title: ' ', dataIndex: 'full_exam_name', key: 'full_exam_name',  width: 200 },
            { title: 'RESULTS', dataIndex: 'results', key: 'results',  width: 200 },
          ];
        
          // PARENT COLUMN HEADER
        const coldatasource = [{
            key: '1',
            run_date: formatted_date,
            machine_id: 'DXH01(-00026)',
            results: ''
        }];

        // CHILD COLUMN FUNCTION
        function expandedRowRender() {
            const c_column = [
                {
                    title: '',
                    dataIndex: 'c_exam_name',
                    key: 'c_exam_name'
                },
                {
                    title: '',
                    dataIndex: 'c_full_exam_name',
                    key: 'c_full_exam_name'
                },
                {
                    title: '',
                    dataIndex: 'c_result',
                    key: 'c_result'
                },
            ];

            const data = [];
                for (let i = 0; i < 3; ++i) {
                    data.push({
                        key: i,
                        c_exam_name: '2014-12-24 23:12:00',
                        c_full_exam_name: 'This is production name',
                        c_result: 'Upgraded: 56',
                    });
                }

            return (
                <Table
                    columns={c_column}
                    dataSource={data}
                    pagination={false}
                />
                );
            }

        return(
            <Table 
                columns={p_columns}
                dataSource={coldatasource}
                expandedRowRender={expandedRowRender}
            />
        );
    }
}

export default IresultsTable;