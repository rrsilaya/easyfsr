import React, { Component } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

import { days, canvas, colors, text, theme } from './config';
import { GridLines, Grid, VerticalGrid, Time, TimeSlot } from './components';

class Schedule extends Component {
  render() {
    const { data } = this.props;

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
          {data.map((timeslot, i) => (
            <TimeSlot
              key={i}
              day={timeslot.day}
              start={timeslot.timeStart}
              end={timeslot.timeEnd}
              content={`${timeslot.subjectCode ||
                timeslot.courseNumber}\n${timeslot.room ||
                timeslot.university}`}
              color={theme[i % 10]}
            />
          ))}
        </Layer>
      </Stage>
    );
  }
}

export default Schedule;
