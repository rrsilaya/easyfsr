import React, { Component } from 'react';
import { Table, Button, Card } from 'antd';
import { EXTANDCOMMSERVICE } from '../duck';

import AddExtAndCommServiceModal from './AddExtAndCommServiceModal';

import styles from '../styles';

const columns = [
  {
    title: 'Activity/Program',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
  },
  {
    title: 'Hours',
    dataIndex: 'hours',
    key: 'hours',
    align: 'center',
  },
  {
    title: 'Participants',
    dataIndex: 'participant',
    key: 'participant',
    align: 'center',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
    align: 'center',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    align: 'center',
  },
  {
    title: 'Approved Credit Units',
    dataIndex: 'creditUnit',
    key: 'creditUnit',
    align: 'center',
  },
];

class ExtAndCommServiceForm extends Component {
  render() {
    const {
      isAddExtAndCommServiceModalOpen,
      toggleModal,
      nextStep,
      prevStep,
    } = this.props;

    return (
      <Card title="Extension and Community Service" style={styles.formFSR}>
        <AddExtAndCommServiceModal
          isAddExtAndCommServiceModalOpen={isAddExtAndCommServiceModalOpen}
          toggleModal={toggleModal}
          handleAfterClose={this.handleAfterClose}
        />
        <div style={styles.button}>
          <Button
            icon="plus-circle-o"
            type="primary"
            onClick={() => toggleModal(EXTANDCOMMSERVICE)}
          >
            Add Extension and Community Service
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

export default ExtAndCommServiceForm;
