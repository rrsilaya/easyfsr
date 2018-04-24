import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Card, Tooltip, Icon, Modal } from 'antd';
import {
  CONSULTATIONHOUR,
  ADD_CONSULTATIONHOUR_MODAL,
  EDIT_CONSULTATIONHOUR_MODAL,
} from '../duck';
import moment from 'moment';

import AddConsultationHourModal from './AddConsultationHourModal';
import EditConsultationHourModal from './EditConsultationHourModal';

import styles from '../styles';

const { confirm } = Modal;

class ConsultationHoursForm extends Component {
  componentDidMount() {
    this.props.getConsultationHours({ id: this.props.fsrID });
  }

  columns = [
    {
      title: 'Days',
      dataIndex: 'day',
      key: 'day',
      align: 'center',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      render: (text, record) => (
        <span className="text primary">
          {moment(record.timeStart, 'HH:mm:ss').format('HH:mm')} -{' '}
          {moment(record.timeEnd, 'HH:mm:ss').format('HH:mm')}
        </span>
      ),
    },
    {
      title: 'Place',
      dataIndex: 'place',
      key: 'place',
      align: 'center',
    },
    {
      render: (text, record) => (
        <div style={styles.icons}>
          <Link
            to="#"
            disabled={
              this.props.userID === this.props.fsr.fsr.userID &&
              !this.props.fsr.fsr.isTurnedIn
                ? false
                : true
            }
          >
            <Tooltip title="Delete Consultation Hour" arrowPointAtCenter>
              <Icon
                type="delete"
                className="text secondary"
                onClick={() =>
                  this.handleDeleteConsultationHourConfirmation(record)
                }
              />
            </Tooltip>
          </Link>
          <Link
            to="#"
            disabled={
              this.props.userID === this.props.fsr.fsr.userID &&
              !this.props.fsr.fsr.isTurnedIn
                ? false
                : true
            }
          >
            <Tooltip title="Edit Consultation Hour" arrowPointAtCenter>
              <Icon
                type="edit"
                className="text secondary"
                style={{ marginLeft: 10 }}
                onClick={() => this.handleToggleEditConsultationHour(record)}
              />
            </Tooltip>
          </Link>
        </div>
      ),
    },
  ];

  handleToggleEditConsultationHour = consultationHour => {
    this.props.changeSelected({
      entity: CONSULTATIONHOUR,
      data: consultationHour,
    });
    this.props.toggleModal(EDIT_CONSULTATIONHOUR_MODAL);
  };

  handleDeleteConsultationHourConfirmation = ({ chID }) => {
    confirm({
      title: 'Are you sure you want to delete this consultation hour?',
      okType: 'danger',
      onOk: () => {
        this.props.deleteCreativeWork(chID);
      },
      onCancel() {},
    });
  };

  render() {
    const {
      userID,
      fsr,
      fsrID,
      consultationHours,
      consultationHour,
      addConsultationHour,
      editConsultationHour,
      isGettingConsultationHours,
      isAddingConsultationHour,
      isEditingConsultationHour,
      isAddConsultationHourModalOpen,
      isEditConsultationHourModalOpen,
      toggleModal,
      prevStep,
    } = this.props;

    return (
      <Card title="Consultation Hours" style={styles.formFSR}>
        <AddConsultationHourModal
          id={fsrID}
          addConsultationHour={addConsultationHour}
          isAddingConsultationHour={isAddingConsultationHour}
          isAddConsultationHourModalOpen={isAddConsultationHourModalOpen}
          toggleModal={toggleModal}
        />
        <EditConsultationHourModal
          id={fsrID}
          consultationHour={consultationHour}
          editConsultationHour={editConsultationHour}
          isEditingConsultationHour={isEditingConsultationHour}
          isEditConsultationHourModalOpen={isEditConsultationHourModalOpen}
          toggleModal={toggleModal}
        />
        <div style={styles.button}>
          <Button
            icon="plus-circle-o"
            type="primary"
            onClick={() => toggleModal(ADD_CONSULTATIONHOUR_MODAL)}
            disabled={
              userID === fsr.fsr.userID && !fsr.fsr.isTurnedIn ? false : true
            }
          >
            Add Consultation Hour
          </Button>
        </div>
        <Table
          columns={this.columns}
          dataSource={consultationHours}
          loading={isGettingConsultationHours}
        />
        <div style={styles.button}>
          <Button type="primary" onClick={prevStep} style={{ marginRight: 15 }}>
            Previous
          </Button>
        </div>
      </Card>
    );
  }
}

export default ConsultationHoursForm;
