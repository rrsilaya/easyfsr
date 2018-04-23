import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Card, Popconfirm, Icon } from 'antd';
import { ADMINWORK, ADD_ADMINWORK_MODAL, EDIT_ADMINWORK_MODAL } from '../duck';

import AddAdminWorkModal from './AddAdminWorkModal';
import EditAdminWorkModal from './EditAdminWorkModal';

import styles from '../styles';

class AdminWorkForm extends Component {
  componentDidMount() {
    this.props.getAdminWorks({ id: this.props.fsrID });
  }

  columns = [
    {
      title: 'Position/Nature of Administrative Work',
      dataIndex: 'position',
      key: 'position',
      align: 'center',
    },
    {
      title: 'Office/Unit',
      dataIndex: 'officeUnit',
      key: 'officeUnit',
      align: 'center',
    },
    {
      title: 'Approved Credit Units',
      dataIndex: 'approvedUnits',
      key: 'approvedUnits',
      align: 'center',
    },
    {
      render: (text, record) => (
        <div style={styles.icons}>
          <Popconfirm
            title="Are you sure you want to delete this administrative work?"
            onConfirm={() => this.props.deleteAdminWork(record.adminWorkID)}
          >
            <Link
              to="#"
              disabled={
                this.props.userID === this.props.fsr.fsr.userID ? false : true
              }
            >
              <Icon type="delete" className="text secondary" />
            </Link>
          </Popconfirm>
          <Link
            to="#"
            disabled={
              this.props.userID === this.props.fsr.fsr.userID ? false : true
            }
          >
            <Icon
              type="edit"
              className="text secondary"
              style={{ marginLeft: 10 }}
              onClick={() => this.handleToggleEditAdminWork(record)}
            />
          </Link>
        </div>
      ),
    },
  ];

  handleToggleEditAdminWork = adminWork => {
    this.props.changeSelected({ entity: ADMINWORK, data: adminWork });
    this.props.toggleModal(EDIT_ADMINWORK_MODAL);
  };

  render() {
    const {
      userID,
      fsr,
      fsrID,
      adminWorks,
      adminWork,
      addAdminWork,
      editAdminWork,
      isGettingAdminWorks,
      isAddingAdminWork,
      isEditingAdminWork,
      isAddAdminWorkModalOpen,
      isEditAdminWorkModalOpen,
      toggleModal,
      nextStep,
      prevStep,
    } = this.props;

    return (
      <Card title="Administrative Work" style={styles.formFSR}>
        <AddAdminWorkModal
          id={fsrID}
          addAdminWork={addAdminWork}
          isAddingAdminWork={isAddingAdminWork}
          isAddAdminWorkModalOpen={isAddAdminWorkModalOpen}
          toggleModal={toggleModal}
        />
        <EditAdminWorkModal
          id={fsrID}
          adminWork={adminWork}
          editAdminWork={editAdminWork}
          isEditingAdminWork={isEditingAdminWork}
          isEditAdminWorkModalOpen={isEditAdminWorkModalOpen}
          toggleModal={toggleModal}
        />
        <div style={styles.button}>
          <Button
            icon="plus-circle-o"
            type="primary"
            onClick={() => toggleModal(ADD_ADMINWORK_MODAL)}
            disabled={userID === fsr.fsr.userID ? false : true}
          >
            Add Administrative Work
          </Button>
        </div>
        <Table
          columns={this.columns}
          dataSource={adminWorks}
          loading={isGettingAdminWorks}
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

export default AdminWorkForm;
