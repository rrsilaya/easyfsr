import React, { Component, Fragment } from 'react';
import { Modal } from 'antd';
import { Stage, Layer, Rect, Line, Text } from 'react-konva';

class Schedule extends Component {
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  canvas = {
    width: 811,
    height: 391,
    row: 391 / 13,
    col: (811 - 95) / 6,
    timeWidth: 95,
    timeSize: 12,
  };

  colors = {
    primary: '#1D161E',
    secondary: '#483440',
    light: '#E0CED9',
  };

  renderGridLines = () => {
    const lines = [];

    for (
      let i = 0, j = this.canvas.row / 4 + this.canvas.row;
      i < 48;
      i++, j += this.canvas.row / 4
    ) {
      lines.push(
        <Line
          key={i}
          points={[0, j, this.canvas.width, j]}
          stroke={this.colors.light}
          strokeWidth={1}
        />,
      );
    }

    return lines;
  };

  renderMainGrid = () => {
    const lines = [];

    for (let i = 0, j = this.canvas.row; i < 13; i++, j += this.canvas.row) {
      lines.push(
        <Line
          key={i}
          points={[0, j, this.canvas.width, j]}
          stroke={this.colors.primary}
          strokeWidth={1}
        />,
      );
    }

    return lines;
  };

  renderVerticalGrid = () => {
    const lines = [];

    for (let i = 0; i < 7; i++) {
      lines.push(
        <Line
          key={i}
          points={[
            i * this.canvas.col + this.canvas.timeWidth,
            0,
            i * this.canvas.col + this.canvas.timeWidth,
            this.canvas.height,
          ]}
          stroke={this.colors.primary}
          strokeWidth={1}
        />,
      );
    }

    return lines;
  };

  renderTimeLabels = () => {
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
          y={
            this.canvas.row / 2 -
            this.canvas.timeSize / 2 +
            (i - 6) * this.canvas.row
          }
          text={text}
          fontFamily="Arial"
          fontSize={this.canvas.timeSize}
          fill="white"
          align="center"
          width={this.canvas.timeWidth}
        />,
      );
    }

    return labels;
  };

  getTimePoints = (day, start, end) => {
    const [startHour, startMin] = start.split(':').map(parseFloat);
    const [endHour, endMin] = end.split(':').map(parseFloat);

    const offset = {
      day: this.days.indexOf(day),
      time: {
        start: startHour - 6,
        end: endHour - 6,
      },
    };

    const points = [];

    points.push(
      this.canvas.timeWidth + this.canvas.col * offset.day,
      this.canvas.row * offset.time.start,
    );
    if (startMin === 30) {
      points.push(
        this.canvas.timeWidth + this.canvas.col * (offset.day + 1),
        this.canvas.row * (offset.time.start + 1),
      );
    } else {
      points.push(
        this.canvas.timeWidth + this.canvas.col * (offset.day + 1),
        this.canvas.row * offset.time.start,
      );
    }
    points.push(
      this.canvas.timeWidth + this.canvas.col * (offset.day + 1),
      this.canvas.row * offset.time.end,
    );
    if (endMin === 30) {
      points.push(
        this.canvas.timeWidth + this.canvas.col * (offset.day + 1),
        this.canvas.row * (offset.time.end + 1),
      );
    }
    points.push(
      this.canvas.timeWidth + this.canvas.col * offset.day,
      this.canvas.row * offset.time.end,
    );

    return points;
  };

  renderSubject = (day, start, end, content) => {
    const shape = this.getTimePoints(day, start, end);
    const dayOffset = this.days.indexOf(day);
    const timeStart = parseFloat(start.split(':')[0]) - 7;
    const duration = parseFloat(end.split(':')[0]) - 7 - timeStart;

    return (
      <Fragment>
        <Line
          points={this.getTimePoints(day, start, end)}
          fill="red"
          stroke="black"
          strokeWidth={0.5}
          closed
        />
        <Text
          x={this.canvas.timeWidth + this.canvas.col * dayOffset}
          y={this.canvas.row * (timeStart + 1)}
          width={this.canvas.col}
          height={this.canvas.row * 3}
          align="center"
          offset={{ y: -4 - this.canvas.row / 2 * duration }}
          fontFamily="Arial"
          text={content}
          fill="white"
        />
      </Fragment>
    );
  };

  render() {
    return (
      <Modal title="Faculty Schedule" visible={true} width={811 + 48}>
        <Stage width={this.canvas.width} height={this.canvas.height}>
          <Layer>
            <Rect
              width={this.canvas.width}
              height={this.canvas.row}
              fill={this.colors.primary}
            />
            {this.renderGridLines()}
            <Rect
              y={this.canvas.row}
              width={this.canvas.timeWidth}
              height={this.canvas.height}
              fill={this.colors.primary}
            />
            {this.renderMainGrid()}
            {this.renderVerticalGrid()}
            {this.renderTimeLabels()}
            {this.days.map((day, i) => (
              <Text
                key={i}
                x={this.canvas.timeWidth + this.canvas.col * i}
                y={this.canvas.row / 2 - this.canvas.timeSize / 2}
                fontFamily="Arial"
                fontSize={this.canvas.timeSize}
                fill="white"
                align="center"
                width={this.canvas.col}
                text={day}
              />
            ))}
          </Layer>
          <Layer>
            {this.renderSubject('Tuesday', '8:00', '9:30', `CMSC 100\nICSMH`)}
          </Layer>
        </Stage>
      </Modal>
    );
  }
}

export default Schedule;
