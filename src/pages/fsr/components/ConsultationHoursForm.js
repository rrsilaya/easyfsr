import React, { Component } from 'react';
import { Table, Button, Card } from 'antd';
import { CONSULTATIONHOUR } from '../duck';

import AddConsultationHourModal from './AddConsultationHourModal';

import styles from '../styles';

const columns = [
  {
    title: 'Days',
    dataIndex: 'days',
    key: 'days',
    align: 'center',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    align: 'center',
  },
  {
    title: 'Place',
    dataIndex: 'place',
    key: 'place',
    align: 'center',
  },
];

class ConsultationHoursForm extends Component {
  render() {
    const {
      isAddConsultationHourModalOpen,
      toggleModal,
      nextStep,
      prevStep,
    } = this.props;

    return (
      <Card title="Consultation Hours" style={styles.formFSR}>
        <AddConsultationHourModal
          isAddConsultationHourModalOpen={isAddConsultationHourModalOpen}
          toggleModal={toggleModal}
          handleAfterClose={this.handleAfterClose}
        />
        <div style={styles.button}>
          <Button
            icon="plus-circle-o"
            type="primary"
            onClick={() => toggleModal(CONSULTATIONHOUR)}
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
      </Card>
    );
  }
}

export default ConsultationHoursForm;
