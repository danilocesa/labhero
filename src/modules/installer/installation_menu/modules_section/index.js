import React from 'react';
import { Card, Row, Col, Typography, Button, Divider } from 'antd';
import { LabExamRequestIcon, UserMaintenanceIcon, NormalValuesIcon } from 'images';
import ModuleCard from './module_card';

const { Title } = Typography;

const moduleData = [
	{
		image: LabExamRequestIcon,
		label: 'LAB REQUEST'
	},
	{
		image: LabExamRequestIcon,
		label: 'INVENTORY'
	},
	{
		image: LabExamRequestIcon,
		label: 'BLOOD BANK'
	},
	{
		image: NormalValuesIcon,
		label: 'CASHIER'
	},
]

class ModulesSection extends React.Component {
  render () {
    const moduleCards = moduleData.map(item => (
      <Col sm={12} md={6} lg={6} style={{ marginTop: 20 }} key={item.label}>
        <ModuleCard image={item.image} label={item.label} />
      </Col>
    ));

    return (
      <div style={{ marginTop: 30, marginBottom: 30 }}>
				<Title level={4}>Choose your Apps</Title>
				<Divider />
        <Row type="flex" justify="center" gutter={12}> 
          {moduleCards}
        </Row> 
				<Row type="flex" justify="end" style={{ marginTop: 20 }}>
					<Button size="large" type="primary">SUBMIT</Button>
				</Row>
      </div>
    );
  }
}

export default ModulesSection;