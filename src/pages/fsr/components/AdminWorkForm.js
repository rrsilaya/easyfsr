import React, { Component } from 'react';
import { Table, Button, Card } from 'antd';
import { ADD_ADMINWORK } from '../duck';

import AddAdminWorkModal from './AddAdminWorkModal';

import styles from '../styles';

const columns = [
  {
    title: 'Position/Nature of Administrative Work',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: 'Office/Unit',
    dataIndex: 'officeUnit',
    key: 'officeUnit',
  },
  {
    title: 'Approved Credit Units',
    dataIndex: 'approvedUnits',
    key: 'approvedUnits',
  },
];

class AdminWorkForm extends Component {
  render() {
    const {
      isAddAdminWorkModalOpen,
      toggleModal,
      nextStep,
      prevStep,
    } = this.props;

    return (
      <Card title="Administrative Work" style={styles.formFSR}>
        <AddAdminWorkModal
          isAddAdminWorkModalOpen={isAddAdminWorkModalOpen}
          toggleModal={toggleModal}
          handleAfterClose={this.handleAfterClose}
        />
        <div style={styles.button}>
          <Button
            icon="plus-circle-o"
            type="primary"
            onClick={() => toggleModal(ADD_ADMINWORK)}
          >
            Add Administrative Work
          </Button>
        </div>
        <Table columns={columns} />
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
