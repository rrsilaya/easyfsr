import React, { Component } from 'react';
import { Table, Button } from 'antd';

import AddCWorkModal from './AddCWorkModal';
import AddResearchModal from './AddResearchModal';

import styles from '../styles';

const columns1 = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Co-Workers',
    dataIndex: 'rCoWorker',
    key: 'rCoWorker',
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    key: 'startDate',
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    key: 'endDate',
  },
  {
    title: 'Funding',
    dataIndex: 'funding',
    key: 'funding',
  },
  {
    title: 'Approved Credit Units',
    dataIndex: 'credUnit',
    key: 'credUnit',
  },
];

const columns2 = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Co-Authors',
    dataIndex: 'cworkCoAuthor',
    key: 'cworkCoAuthor',
  },
  {
    title: 'Date of Publication',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'File',
    dataIndex: 'cworkFile',
    key: 'cworkFile',
  },
  {
    title: 'Approved Credit Units',
    dataIndex: 'credUnit',
    key: 'credUnit',
  },
];

class ResearchAndCreativeWorkForm extends Component {
  render() {
    const {
      isAddCWorkModalOpen,
      isAddResearchModalOpen,
      toggleAddCWorkModal,
      toggleAddResearchModal,
      nextStep,
      prevStep,
    } = this.props;

    return (
      <div>
        <AddResearchModal
          isAddResearchModalOpen={isAddResearchModalOpen}
          toggleAddResearchModal={toggleAddResearchModal}
          handleAfterClose={this.handleAfterClose}
        />
        <div style={styles.button}>
          <Button
            icon="plus-circle-o"
            type="primary"
            onClick={toggleAddResearchModal}
          >
            Add Research
          </Button>
        </div>
        <Table columns={columns1} />
        <AddCWorkModal
          isAddCWorkModalOpen={isAddCWorkModalOpen}
          toggleAddCWorkModal={toggleAddCWorkModal}
          handleAfterClose={this.handleAfterClose}
        />
        <div style={styles.button}>
          <Button
            icon="plus-circle-o"
            type="primary"
            onClick={toggleAddCWorkModal}
          >
            Add Creative Work
          </Button>
        </div>
        <Table columns={columns2} />
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

export default ResearchAndCreativeWorkForm;
