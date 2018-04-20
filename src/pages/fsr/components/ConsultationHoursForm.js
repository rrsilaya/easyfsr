import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Card, Popconfirm, Icon } from 'antd';
import {
  CONSULTATIONHOUR,
  ADD_CONSULTATIONHOUR_MODAL,
  EDIT_CONSULTATIONHOUR_MODAL,
} from '../duck';
import moment from 'moment';

import AddConsultationHourModal from './AddConsultationHourModal';
import EditConsultationHourModal from './EditConsultationHourModal';

import styles from '../styles';

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
          <Popconfirm
            title="Are you sure you want to delete this consultation hour?"
            onConfirm={() => this.props.deleteConsultationHour(record.chID)}
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
              onClick={() => this.handleToggleEditConsultationHour(record)}
            />
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

  render() {
    const {
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
      nextStep,
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
        {isEditConsultationHourModalOpen ? (
          <EditConsultationHourModal
            id={fsrID}
            consultationHour={consultationHour}
            editConsultationHour={editConsultationHour}
            isEditingConsultationHour={isEditingConsultationHour}
            isEditConsultationHourModalOpen={isEditConsultationHourModalOpen}
            toggleModal={toggleModal}
          />
        ) : (
          ''
        )}
        <div style={styles.button}>
          <Button
            icon="plus-circle-o"
            type="primary"
            onClick={() => toggleModal(ADD_CONSULTATIONHOUR_MODAL)}
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
          <Button type="primary" onClick={nextStep}>
            Next
          </Button>
        </div>
      </Card>
    );
  }
}

export default ConsultationHoursForm;
