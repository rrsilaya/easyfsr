import React, { Fragment } from 'react';
import { Line, Text } from 'react-konva';
import { days, canvas, text } from '../config';

const getTimePoints = (day, start, end) => {
  const [startHour, startMin] = start.split(':').map(parseFloat);
  const [endHour, endMin] = end.split(':').map(parseFloat);

  const offset = {
    day: days.indexOf(day),
    time: {
      start: startHour - 6,
      end: endHour - 6,
    },
  };

  const points = [];

  points.push(
    canvas.timeWidth + canvas.col * offset.day,
    canvas.row * offset.time.start,
  );
  if (startMin === 30) {
    points.push(
      canvas.timeWidth + canvas.col * (offset.day + 1),
      canvas.row * (offset.time.start + 1),
    );
  } else {
    points.push(
      canvas.timeWidth + canvas.col * (offset.day + 1),
      canvas.row * offset.time.start,
    );
  }
  points.push(
    canvas.timeWidth + canvas.col * (offset.day + 1),
    canvas.row * offset.time.end,
  );
  if (endMin === 30) {
    points.push(
      canvas.timeWidth + canvas.col * (offset.day + 1),
      canvas.row * (offset.time.end + 1),
    );
  }
  points.push(
    canvas.timeWidth + canvas.col * offset.day,
    canvas.row * offset.time.end,
  );

  return points;
};

const TimeSlot = ({ day, start, end, content, color = '#000' }) => {
  const shape = getTimePoints(day, start, end);
  const dayOffset = days.indexOf(day);
  const timeStart = parseFloat(start.split(':')[0]) - 7;
  const duration = parseFloat(end.split(':')[0]) - 7 - timeStart;

  return (
    <Fragment>
      <Line points={shape} fill={color} closed />
      <Text
        x={canvas.timeWidth + canvas.col * dayOffset}
        y={canvas.row * (timeStart + 1) + duration * canvas.row / 2 - 12}
        width={canvas.col}
        text={content}
        {...text}
      />
    </Fragment>
  );
};

export default TimeSlot;
