import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Card, Popconfirm, Icon } from 'antd';
import {
  EXTANDCOMMSERVICE,
  ADD_EXTANDCOMMSERVICE_MODAL,
  EDIT_EXTANDCOMMSERVICE_MODAL,
} from '../duck';
import moment from 'moment';

import AddExtAndCommServiceModal from './AddExtAndCommServiceModal';
import EditExtAndCommServiceModal from './EditExtAndCommServiceModal';

import styles from '../styles';

class ExtAndCommServiceForm extends Component {
  componentDidMount() {
    this.props.getExtAndCommServices({ id: this.props.fsrID });
  }

  columns = [
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
      render: (text, record) => (
        <span className="text primary">
          {moment(record.startDate).format('MMMM D, YYYY')} -{' '}
          {moment(record.endDate).format('MMMM D, YYYY')}
        </span>
      ),
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
    {
      render: (text, record) => (
        <div style={styles.icons}>
          <Popconfirm
            title="Are you sure you want to delete this extension and community service?"
            onConfirm={() =>
              this.props.deleteExtAndCommService(record.extAndCommServiceID)
            }
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
              onClick={() => this.handleToggleEditExtAndCommService(record)}
            />
          </Link>
        </div>
      ),
    },
  ];

  handleToggleEditExtAndCommService = extAndCommService => {
    this.props.changeSelected({
      entity: EXTANDCOMMSERVICE,
      data: extAndCommService,
    });
    this.props.toggleModal(EDIT_EXTANDCOMMSERVICE_MODAL);
  };

  render() {
    const {
      fsrID,
      extAndCommServices,
      extAndCommService,
      addExtAndCommService,
      editExtAndCommService,
      isGettingExtAndCommService,
      isAddingExtAndCommService,
      isEditingExtAndCommService,
      isAddExtAndCommServiceModalOpen,
      isEditExtAndCommServiceModalOpen,
      toggleModal,
      nextStep,
      prevStep,
    } = this.props;

    return (
      <Card title="Extension and Community Service" style={styles.formFSR}>
        <AddExtAndCommServiceModal
          id={fsrID}
          addExtAndCommService={addExtAndCommService}
          isAddingExtAndCommService={isAddingExtAndCommService}
          isAddExtAndCommServiceModalOpen={isAddExtAndCommServiceModalOpen}
          toggleModal={toggleModal}
        />
        {isEditExtAndCommServiceModalOpen ? (
          <EditExtAndCommServiceModal
            id={fsrID}
            extAndCommService={extAndCommService}
            editExtAndCommService={editExtAndCommService}
            isEditingExtAndCommService={isEditingExtAndCommService}
            isEditExtAndCommServiceModalOpen={isEditExtAndCommServiceModalOpen}
            toggleModal={toggleModal}
          />
        ) : (
          ''
        )}
        <div style={styles.button}>
          <Button
            icon="plus-circle-o"
            type="primary"
            onClick={() => toggleModal(ADD_EXTANDCOMMSERVICE_MODAL)}
          >
            Add Extension and Community Service
          </Button>
        </div>
        <Table
          columns={this.columns}
          dataSource={extAndCommServices}
          loading={isGettingExtAndCommService}
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

export default ExtAndCommServiceForm;
