import React from 'react';
import { Line } from 'react-konva';
import { canvas, colors } from '../config';

const GridLines = () => {
  const lines = [];

  for (
    let i = 0, j = canvas.row / 4 + canvas.row;
    i < 48;
    i++, j += canvas.row / 4
  ) {
    lines.push(
      <Line
        key={i}
        points={[0, j, canvas.width, j]}
        stroke={colors.light}
        strokeWidth={1}
      />,
    );
  }

  return lines;
};

export default GridLines;
