// LIBRARY
import React from 'react';
import { Table, Radio, Col } from 'antd';

// CSS
import './specimen.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function onChange(e) {
	console.log(`radio checked:${e.target.value}`);
}

class SpecimenList extends React.Component {
	expandedRowRender = () => {
		const columns = [
			{
				dataIndex: 'SpecimenList',
				key: 'SpecimenList',
				width:'25%',
			},
		];
		const data = [];
		const testspecimenlist = ['CBC', 'Hemoglobin', 'Hematocrit'];
		for (let i = 1; i < 4; i+=1) {
			data.push({
				SpecimenList: testspecimenlist[Math.floor(Math.random() * testspecimenlist.length)],
			});
		}

		return (
			<div className="child-no-header-table">
				<Table
					columns={columns}
					dataSource={data}
					pagination={false}
					size="small"
				/>
			</div>
		);
	};


	render() {  
		const columns = [
		{ 
			title: 'SPECIMEN', 
			dataIndex: 'Specimen', 
			key: 'PhleboSpecimen',
		},
		{ 
			title: 'SECTION', 
			dataIndex: 'Section', 
			key: 'PhleboSection',
		},
		{ 
			title: 'STATUS',
			dataIndex: 'Status', 
			key: 'Status',
			render: 
				button => (
					<Col style={{ paddingLeft: 245, alignText: 'center' }}>
						<RadioGroup buttonStyle="solid"> 
							<RadioButton 
								onClick={onChange} 
								value="b"
							>
							EXTRACTED
								{button}
							</RadioButton>
						</RadioGroup>
					</Col>
				)
				,
		},
	];
		const data = [];
		const testspecimen = ['Blood', 'Serum'];
			for (let i = 1; i < 6; i+=1) {
					data.push({  
					Specimen: testspecimen[Math.floor(Math.random() * testspecimen.length)],
					Section: "Hema"
				});
			}
	return (
		<div>
			<Table
				className="phlebotable"
				columns={columns}
				expandedRowRender={this.expandedRowRender}
				dataSource={data}
				size="small"
				scroll={{ y: 300 }}
			/>
		</div>
		);
	}
}
export default SpecimenList;