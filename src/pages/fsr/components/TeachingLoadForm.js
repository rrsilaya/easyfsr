import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Card, Icon, Tooltip, Modal } from 'antd';
import { SUBJECT, ADD_SUBJECT_MODAL, EDIT_SUBJECT_MODAL } from '../duck';

import styles from '../styles';

import AddSubjectModal from './AddSubjectModal';
import EditSubjectModal from './EditSubjectModal';
import Schedule from '../../../global/schedule/Schedule';

const { confirm } = Modal;

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
          <Link
            to="#"
            disabled={
              this.props.userID === this.props.fsr.fsr.userID ? false : true
            }
          >
            <Tooltip title="Delete Subject" arrowPointAtCenter>
              <Icon
                type="delete"
                className="text secondary"
                onClick={() => this.handleDeleteSubjectConfirmation(record)}
              />
            </Tooltip>
          </Link>
          <Link
            to="#"
            disabled={
              this.props.userID === this.props.fsr.fsr.userID ? false : true
            }
          >
            <Tooltip title="Edit Subject" arrowPointAtCenter>
              <Icon
                type="edit"
                className="text secondary"
                style={{ marginLeft: 10 }}
                onClick={() => this.handleToggleEditSubject(record)}
              />
            </Tooltip>
          </Link>
        </div>
      ),
    },
  ];

  handleToggleEditSubject = subject => {
    this.props.changeSelected({ entity: SUBJECT, data: subject });
    this.props.toggleModal(EDIT_SUBJECT_MODAL);
  };

  handleDeleteSubjectConfirmation = ({ subjectID }) => {
    confirm({
      title: 'Are you sure you want to delete this subject?',
      okType: 'danger',
      onOk: () => {
        this.props.deleteSubject(subjectID);
      },
      onCancel() {},
    });
  };

  render() {
    const {
      userID,
      fsr,
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

    return (
      <Card title="Teaching Load in the College" style={styles.formFSR}>
        <AddSubjectModal
          id={fsrID}
          subject={subject}
          addSubject={addSubject}
          isAddingSubject={isAddingSubject}
          isAddingTimeslot={isAddingTimeslot}
          isAddSubjectModalOpen={isAddSubjectModalOpen}
          toggleModal={toggleModal}
        />
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
        <div
          className="scale-down"
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Schedule data={[]} />
        </div>
        <div style={styles.button}>
          <Button
            icon="plus-circle-o"
            type="primary"
            onClick={() => toggleModal(ADD_SUBJECT_MODAL)}
            disabled={userID === fsr.fsr.userID ? false : true}
          >
            Add Subject
          </Button>
        </div>
        <Table
          columns={this.columns}
          dataSource={subjects}
          loading={isGettingSubjects}
        />
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
