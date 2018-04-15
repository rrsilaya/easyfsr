import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Card, Icon, Popconfirm } from 'antd';
import { ADD_SUBJECT_MODAL, EDIT_SUBJECT_MODAL } from '../duck';

import styles from '../styles';

import AddSubjectModal from './AddSubjectModal';
import EditSubjectModal from './EditSubjectModal';
import Schedule from '../../../global/schedule/Schedule';

class TeachingLoadForm extends Component {
  componentDidMount() {
    this.props.getSubjects({ id: this.props.fsrID });
  }

  columns = [
    {
      title: 'Subject',
      dataIndex: 'subjectCode',
      key: 'subjectCode',
      align: 'center',
    },
    {
      title: 'Section Code',
      dataIndex: 'sectionCode',
      key: 'sectionCode',
      align: 'center',
    },
    {
      title: 'Hours Per Week',
      dataIndex: 'hoursPerWeek',
      key: 'hoursPerWeek',
      align: 'center',
    },
    {
      title: 'No Of Students',
      dataIndex: 'noOfStudents',
      key: 'noOfStudents',
      align: 'center',
    },
    {
      title: 'Course Credits',
      dataIndex: 'teachingLoadCreds',
      key: 'teachingLoadCreds',
      align: 'center',
    },
    {
      render: (text, record) => (
        <div style={styles.icons}>
          <Popconfirm
            title="Are you sure you want to delete this subject?"
            onConfirm={() => this.props.deleteSubject(record.subjectID)}
          >
            <Link to="#">
              <Icon type="delete" className="text secondary" />
            </Link>
          </Popconfirm>
          <Link to="#">
            <Icon
              type="edit"
              className="text secondary"
              style={{ marginLeft: 10 }}
              onClick={() => this.handleToggleEditSubject(record)}
            />
          </Link>
        </div>
      ),
    },
  ];

  handleToggleEditSubject = subject => {
    this.props.changeSelectedSubject(subject);
    this.props.toggleModal(EDIT_SUBJECT_MODAL);
  };

  render() {
    const {
      fsrID,
      subjects,
      subject,
      timeslots,
      addSubject,
      editSubject,
      getTimeslots,
      isGettingSubjects,
      isAddingSubject,
      isAddingTimeslot,
      isEditingSubject,
      isAddSubjectModalOpen,
      isEditSubjectModalOpen,
      toggleModal,
      nextStep,
    } = this.props;
    const columns = this.columns;

    return (
      <Card
        loading={isGettingSubjects}
        title="Teaching Load in the College"
        style={styles.formFSR}
      >
        <AddSubjectModal
          id={fsrID}
          subject={subject}
          addSubject={addSubject}
          isAddingSubject={isAddingSubject}
          isAddingTimeslot={isAddingTimeslot}
          isAddSubjectModalOpen={isAddSubjectModalOpen}
          toggleModal={toggleModal}
        />
        {isEditSubjectModalOpen ? (
          <EditSubjectModal
            id={fsrID}
            subject={subject}
            timeslots={timeslots}
            editSubject={editSubject}
            getTimeslots={getTimeslots}
            isEditingSubject={isEditingSubject}
            isEditSubjectModalOpen={isEditSubjectModalOpen}
            toggleModal={toggleModal}
          />
        ) : (
          ''
        )}
        <Schedule data={[]} />
        <div style={styles.button}>
          <Button
            icon="plus-circle-o"
            type="primary"
            onClick={() => toggleModal(ADD_SUBJECT_MODAL)}
          >
            Add Subject
          </Button>
        </div>
        <Table columns={columns} dataSource={subjects} />
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
