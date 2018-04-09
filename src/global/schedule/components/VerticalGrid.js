import React from 'react';
import { Line } from 'react-konva';
import { canvas, colors } from '../config';

const VerticalGrid = () => {
  const lines = [];

  for (let i = 0; i < 7; i++) {
    lines.push(
      <Line
        key={i}
        points={[
          i * canvas.col + canvas.timeWidth,
          0,
          i * canvas.col + canvas.timeWidth,
          canvas.height,
        ]}
        stroke={colors.primary}
        strokeWidth={1}
      />,
    );
  }

  return lines;
};

export default VerticalGrid;
