import React, { Component } from 'react';
import { Table, Button } from 'antd';

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
      toggleAddAdminWorkModal,
      nextStep,
      prevStep,
    } = this.props;

    return (
      <div>
        <AddAdminWorkModal
          isAddAdminWorkModalOpen={isAddAdminWorkModalOpen}
          toggleAddAdminWorkModal={toggleAddAdminWorkModal}
          handleAfterClose={this.handleAfterClose}
        />
        <div style={styles.button}>
          <Button
            icon="plus-circle-o"
            type="primary"
            onClick={toggleAddAdminWorkModal}
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
      </div>
    );
  }
}

export default AdminWorkForm;
