import React from 'react';
import { Row, Col, Card, Typography } from 'antd';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const { Title } = Typography;

const Chart = ({ data }) => (
  <Row gutter={16} type="flex" justify="space-between">
    <Col span={24}>
      <Card>
        <Title level={3} style={{ textAlign: 'center' }}>Численность сотрудников по месяцам</Title>
        <LineChart width={900} height={400} data={data}>
          <XAxis dataKey="name" />
          <YAxis 
            domain={['dataMin - 10', 'auto']} 
            type='number' 
            allowDecimals={false} 
          />
          <CartesianGrid />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="userCount" stroke="#82ca9d" activeDot={{ r: 5 }} name="Количество сотрудников"/>
          <Line type="monotone" strokeDasharray="5 5" dataKey="plannedUserCount" stroke="orange" name="Планируемое количество сотрудников"/>
        </LineChart>
      </Card>
    </Col>
  </Row>
);

export default Chart;
