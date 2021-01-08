import React from "react";
import image1 from "./image1.png";
import image2 from "./image2.png";
import image3 from "./image3.png";
import {
  Table,
  Card,
  Row,
  Col,
  Collapse,
  Button
} from "antd";

import "./breakdown.css";
const styles = {
  rootContainer: {
    backgroundColor: "#1A1A1D",
    height: "100%"
  },
  content: {
    height: "65%",
    padding: "1%"
  },
  header: {
    height: "30%",
    backgroundColor: "transparent",
    marginTop: "5%"
  },
  card: {
    maxHeight: "100%",
    height: 500,
    marginLeft: 1,
    width: 300
  },
  cardBody: {
    maxHeight: 300,
    overflow: "auto"
  }
};
const columns = [
  {
    title: "Item",
    dataIndex: "item",
    key: "name",
    render: text => <Button type="link">{text}</Button>
  },
  {
    title: "",
    dataIndex: "img",
    key: "img"
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity"
  },

  {
    title: "Price",
    dataIndex: "price",
    key: "price"
  }
];

const data = [
  {
    key: "1",
    item: "1",
    img: <img className="image1" src={image1} alt="image1" />,
    description: "Consultation",
    quantity: "(x)1",
    price: "P500.00"
  },
  {
    key: "2",
    item: "2",
    img: <img className="image2" src={image2} alt="image2" />,
    description: "Anti Biotic",
    quantity: "(x)100",
    price: "P25.00"
  },
  {
    key: "3",
    item: "3",
    img: <img className="image3" src={image3} alt="image3" />,
    description: "Professional Fee",
    quantity: "(x)13",
    price: "P2000.00"
  }
];
class Breakdown extends React.Component {
  render() {
    return (
      <Row className="container">
        <div className="breakdown">
          <Col span={18}>
            <Card title="ITEMS" bordered={true}>
              <Table columns={columns} dataSource={data} />
            </Card>
          </Col>
        </div>
        <Col span={6}>
          <div className="Receipt">
            <Card
              title="RECEIPT"
              bordered={true}
              style={{
                width: 300,
                marginTop: 2,
                height: 550,
                marginLeft: 10,
                ...styles.card
              }}
              // @ts-ignore
              // style={styles.card}
              bodyStyle={styles.cardBody}
            >
              <Collapse accordion>
                <p>Consultation P500.00</p>
                <p>Anti Biotic P150.00</p>
                <p>Professional Fee P1,250.00</p>
                <p>---------------------------</p>
                <p>
                  <b>Total (3) P1,900.00</b>
                </p>
                <p>Cash P2,000.00</p>
                <p>Change P100.00</p>
                <p></p>
                <p>Vatable P 0.00</p>
                <p>Vat_Tax P 0.00</p>
                <p>Zero Rated P 0.00</p>
              </Collapse>
            </Card>
          </div>
        </Col>
      </Row>
    );
  }
}
export default Breakdown;
