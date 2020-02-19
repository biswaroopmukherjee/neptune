
import React from 'react';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis,
} from 'recharts';
import { render } from '@testing-library/react';

const data = [
  { x: 1, y: 45 },
  { x: 4, y: 53 },
  { x: 6, y: 15 },
  { x: 9, y: 95 }];

export default function DataChart() {
  return (

    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="y" stroke="#21a8f3" strokeWidth={5} />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="x" stroke="#ccc" />
      <YAxis stroke="#ccc" />
    </LineChart>
  );
}
