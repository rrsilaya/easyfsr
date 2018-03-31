import React, { Component } from 'react';
import { Table, Button } from 'antd';

import AddConsultationHourModal from './AddConsultationHourModal';

import styles from '../styles';

const columns = [
  {
    title: 'Days',
    dataIndex: 'days',
    key: 'days',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Place',
    dataIndex: 'place',
    key: 'place',
  },
];

class ConsultationHoursForm extends Component {
  render() {
    const {
      isAddConsultationHourModalOpen,
      toggleAddConsultationHourModal,
      nextStep,
      prevStep,
    } = this.props;

    return (
      <div>
        <AddConsultationHourModal
          isAddConsultationHourModalOpen={isAddConsultationHourModalOpen}
          toggleAddConsultationHourModal={toggleAddConsultationHourModal}
          handleAfterClose={this.handleAfterClose}
        />
        <div style={styles.button}>
          <Button
            icon="plus-circle-o"
            type="primary"
            onClick={toggleAddConsultationHourModal}
          >
            Add Consultation Hour
          </Button>
        </div>
        <Table columns={columns} />
        <div style={styles.button}>
          <Button type="primary" onClick={prevStep} style={{ marginRight: 15 }}>
            Previous
          </Button>
          <Button type="primary" onClick={nextStep}>
            Next
          </Button>
        </div>
      </div>
    );
  }
}

export default ConsultationHoursForm;
