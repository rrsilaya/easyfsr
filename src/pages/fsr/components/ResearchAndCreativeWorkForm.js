import React, { Component } from 'react';
import { Table, Button, Card } from 'antd';
import { CWORK, RESEARCH } from '../duck';

import AddCWorkModal from './AddCWorkModal';
import AddResearchModal from './AddResearchModal';

import styles from '../styles';

const columns1 = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    align: 'center',
  },
  {
    title: 'Co-Workers',
    dataIndex: 'rCoWorker',
    key: 'rCoWorker',
    align: 'center',
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    key: 'startDate',
    align: 'center',
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    key: 'endDate',
    align: 'center',
  },
  {
    title: 'Funding',
    dataIndex: 'funding',
    key: 'funding',
    align: 'center',
  },
  {
    title: 'File',
    dataIndex: 'file',
    key: 'file',
    align: 'center',
  },
  {
    title: 'Approved Credit Units',
    dataIndex: 'credUnit',
    key: 'credUnit',
    align: 'center',
  },
];

const columns2 = [
  {
    title: 'Title',
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
    title: 'Co-Authors',
    dataIndex: 'cworkCoAuthor',
    key: 'cworkCoAuthor',
    align: 'center',
  },
  {
    title: 'Date of Publication',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
  },
  {
    title: 'File',
    dataIndex: 'cworkFile',
    key: 'cworkFile',
    align: 'center',
  },
  {
    title: 'Approved Credit Units',
    dataIndex: 'credUnit',
    key: 'credUnit',
    align: 'center',
  },
];

class ResearchAndCreativeWorkForm extends Component {
  render() {
    const {
      isAddCWorkModalOpen,
      isAddResearchModalOpen,
      toggleModal,
      nextStep,
      prevStep,
    } = this.props;

    return (
      <Card
        title="Research / Textbook Writing / Creative Work"
        style={styles.formFSR}
      >
        <AddResearchModal
          isAddResearchModalOpen={isAddResearchModalOpen}
          toggleModal={toggleModal}
          handleAfterClose={this.handleAfterClose}
        />
        <div style={styles.button}>
          <Button
            icon="plus-circle-o"
            type="primary"
            onClick={() => toggleModal(RESEARCH)}
          >
            Add Research
          </Button>
        </div>
        <Table columns={columns1} />
        <AddCWorkModal
          isAddCWorkModalOpen={isAddCWorkModalOpen}
          toggleModal={toggleModal}
          handleAfterClose={this.handleAfterClose}
        />
        <div style={styles.button}>
          <Button
            icon="plus-circle-o"
            type="primary"
            onClick={() => toggleModal(CWORK)}
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
      </Card>
    );
  }
}

export default ResearchAndCreativeWorkForm;
