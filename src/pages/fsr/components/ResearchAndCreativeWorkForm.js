import React, { Component } from 'react';
import { Table, Button, Card } from 'antd';
import { ADD_CWORK, ADD_RESEARCH } from '../duck';

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
    title: 'File',
    dataIndex: 'file',
    key: 'file',
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
            onClick={() => toggleModal(ADD_RESEARCH)}
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
            onClick={() => toggleModal(ADD_CWORK)}
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
