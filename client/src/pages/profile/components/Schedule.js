import React, { Component } from 'react';
import { Modal } from 'antd';

import { DataLoader, Schedule } from '../../../global';

class ScheduleModal extends Component {
  componentDidMount() {
    this.props.getUserSchedule(this.props.employeeID);
  }

  render() {
    const {
      isSchedModalOpen,
      toggleScheduleModal,
      isGettingSchedule,
      schedule,
    } = this.props;

    const sched = schedule.map(timeslot => {
      timeslot.day = timeslot.day.toUpperCase();

      return timeslot;
    });

    return (
      <Modal
        title="Schedule"
        visible={isSchedModalOpen}
        footer={null}
        onCancel={toggleScheduleModal}
        width={811 + 48}
        destroyOnClose
      >
        <DataLoader
          isLoading={isGettingSchedule}
          content={<Schedule data={sched} />}
          color="#fff"
          spinColor="#483440"
          opaque
        />
      </Modal>
    );
  }
}

export default ScheduleModal;
