import React, { Component } from 'react';
import { Table, Button } from 'antd';

import AddExtAndCommServiceModal from './AddExtAndCommServiceModal';

import styles from '../styles';

const columns = [
  {
    title: 'Title of Activity/Program',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'No. Of Hours',
    dataIndex: 'hours',
    key: 'hours',
  },
  {
    title: 'No. Of Participants',
    dataIndex: 'participant',
    key: 'participant',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Approved Credit Units',
    dataIndex: 'creditUnit',
    key: 'creditUnit',
  },
];

class ExtAndCommServiceForm extends Component {
  render() {
    const {
      isAddExtAndCommServiceModalOpen,
      toggleAddExtAndCommServiceModal,
      nextStep,
      prevStep,
    } = this.props;

    return (
      <div>
        <AddExtAndCommServiceModal
          isAddExtAndCommServiceModalOpen={isAddExtAndCommServiceModalOpen}
          toggleAddExtAndCommServiceModal={toggleAddExtAndCommServiceModal}
          handleAfterClose={this.handleAfterClose}
        />
        <div style={styles.button}>
          <Button
            icon="plus-circle-o"
            type="primary"
            onClick={toggleAddExtAndCommServiceModal}
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
      </div>
    );
  }
}

export default ExtAndCommServiceForm;
