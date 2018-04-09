import React, { Component } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

import { days, canvas, colors, text } from './config';
import { GridLines, Grid, VerticalGrid, Time, TimeSlot } from './components';

class Schedule extends Component {
  render() {
    return (
      <Stage width={canvas.width} height={canvas.height}>
        <Layer>
          <Rect
            width={canvas.width}
            height={canvas.row}
            fill={colors.primary}
          />
          <GridLines />
          <Rect
            y={canvas.row}
            width={canvas.timeWidth}
            height={canvas.height}
            fill={colors.primary}
          />
          <Grid />
          <VerticalGrid />
          <Time />
          {days.map((day, i) => (
            <Text
              key={i}
              x={canvas.timeWidth + canvas.col * i}
              y={canvas.row / 2 - canvas.timeSize / 2}
              fontSize={canvas.timeSize}
              width={canvas.col}
              text={day}
              {...text}
            />
          ))}
          <TimeSlot
            day="Tuesday"
            start="8:00"
            end="9:30"
            content={`CMSC 100\nICSMH`}
          />
        </Layer>
      </Stage>
    );
  }
}

export default Schedule;
