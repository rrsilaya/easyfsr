import React from 'react';
import { Line } from 'react-konva';

import { canvas, colors } from '../config';

const Grid = () => {
  const lines = [];

  for (let i = 0, j = canvas.row; i < 13; i++, j += canvas.row) {
    lines.push(
      <Line
        key={i}
        points={[0, j, canvas.width, j]}
        stroke={colors.primary}
        strokeWidth={1}
      />,
    );
  }

  return lines;
};

export default Grid;
