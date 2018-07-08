import React from 'react';
import { Text } from 'react-konva';
import { canvas, text as textConfig } from '../config';

const Time = () => {
  const labels = [];
  const HOURS = 12;

  for (let i = 7; i < 19; i++) {
    let text;

    if (i === HOURS) text = `${i}:00 - 1:00`;
    else if (i > HOURS) text = `${i - HOURS}:00 - ${i - HOURS + 1}:00`;
    else text = `${i}:00 - ${i + 1}:00`;

    labels.push(
      <Text
        key={text}
        x={0}
        y={canvas.row / 2 - canvas.timeSize / 2 + (i - 6) * canvas.row}
        text={text}
        fontSize={canvas.timeSize}
        width={canvas.timeWidth}
        {...textConfig}
      />,
    );
  }

  return labels;
};

export default Time;
