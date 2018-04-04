import React, { Component } from 'react';
import { Table, Button, Card } from 'antd';
import { ADD_SUBJECT } from '../duck';

import styles from '../styles';

import AddSubjectModal from './AddSubjectModal';

const columns = [
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
  },
  {
    title: 'Section Code',
    dataIndex: 'sectionCode',
    key: 'sectionCode',
  },
  {
    title: 'Room',
    dataIndex: 'room',
    key: 'room',
  },
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
    title: 'Hours Per Week',
    dataIndex: 'hoursPerWeek',
    key: 'hoursPerWeek',
  },
  {
    title: 'No Of Students',
    dataIndex: 'noOfStudents',
    key: 'noOfStudents',
  },
  {
    title: 'Course Credits',
    dataIndex: 'courseCredits',
    key: 'courseCredits',
  },
];

class TeachingLoadForm extends Component {
  render() {
    const { isAddSubjectModalOpen, toggleModal, nextStep } = this.props;

    return (
      <Card title="Teaching Load in the College" style={styles.formFSR}>
        <AddSubjectModal
          isAddSubjectModalOpen={isAddSubjectModalOpen}
          toggleModal={toggleModal}
          handleAfterClose={this.handleAfterClose}
        />
        <div style={styles.button}>
          <Button
            icon="plus-circle-o"
            type="primary"
            onClick={() => toggleModal(ADD_SUBJECT)}
          >
            Add Subject
          </Button>
        </div>
        <Table columns={columns} />
        <div style={styles.button}>
          <Button type="primary" onClick={nextStep}>
            Next
          </Button>
        </div>
      </Card>
    );
  }
}

export default TeachingLoadForm;
