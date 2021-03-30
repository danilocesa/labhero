import React, { useState } from 'react';
import { Row, Col, Button, Image } from 'antd';
import { useHistory } from 'react-router-dom';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Lefthand, Righthand, FingerPrint } from 'images';
import DonorRegSteps from '../steps';

import './style.css';

function FingerprintReg() {
  const history = useHistory();
  const [leftHand, setLefthand] = useState([]);
  const [rightHand, setRighthand] = useState([]);

  function onClickAdd(index, callback, reference) {
    callback([...reference, index]);
  }

  function onClickDelete(index, callback, reference) {
    callback(reference.filter(i => i !== index));
  }

  function renderButtons(reference, callback) {
    let component = [];

    for(let i=1; i<=5; i++) {
      if(reference.includes(i))
        component.push(
          <Button 
            key={i} 
            onClick={() => onClickDelete(i, callback, reference)}
            type="primary" 
            danger 
            shape="circle" 
            icon={<DeleteOutlined />} 
            className={`button${i}`} 
          />
        );
      else
        component.push(
          <Button 
            key={i} 
            shape="circle" 
            icon={<PlusOutlined />} 
            className={`button${i}`} 
            onClick={() => onClickAdd(i, callback, reference)}
          />
        );
    }

    return component;
  }

  function renderFlags(reference) {
    let component = [];
    
    for(let i=1; i<=5; i++) {
      if(reference.includes(i))
        component.push(<Image key={i} preview={false} width={40} src={FingerPrint} className={`fingerprint${i}`} />);
    }

    return component;
  }

  return (
    <div>
      <DonorRegSteps activeIndex={3} />
      <div className="bb-inv-fp-reg-container">
        <div className="bb-inv-lefthand-container">
          {renderButtons(leftHand, setLefthand)}
          {renderFlags(leftHand)}
          <Image preview={false} width={300} src={Lefthand} />
        </div>
        <div className="bb-inv-righthand-container">
          {renderButtons(rightHand, setRighthand)}
          {renderFlags(rightHand)}
          <Image preview={false} width={300} src={Righthand} />
        </div>
      </div>
      <Row justify="center">
        <Col span={20}>
          <div style={{ textAlign: 'right' }}>
            <Button 
              onClick={() => history.push('/bloodbank/donor_registration/step/4', { health_info_id: 1 })}
              type="primary" 
              htmlType="submit" 
              shape="round"
              style={{ width: 120 }}
            >
              Submit
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default FingerprintReg;