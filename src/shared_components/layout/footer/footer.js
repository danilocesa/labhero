import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer = () => (
  <AntFooter style={{ background: 'white' }}>
    <p style={{ textAlign: 'center' }}>
      Copyright 2019 by Herohub. All Rights Reserved.
    </p>
  </AntFooter>
);

export default Footer;
