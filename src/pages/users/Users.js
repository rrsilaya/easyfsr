import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';

import User from './components/User';
import EditModal from './components/EditModal';
import AddModal from './components/AddModal';
import DeleteModal from './components/DeleteModal';

import styles from './styles';
import userData from './user-data';

class Users extends Component {
  render() {
    const gridConfig = { xxl: 6, xl: 8, sm: 12, xs: 24 };
    const {
      isEditModalOpen,
      isAddModalOpen,
      isDeleteModalOpen,

      toggleEditModal,
      toggleAddModal,
      toggleDeleteModal,
    } = this.props;

    return (
      <div>
        <div style={styles.button}>
          <Button
            size="large"
            icon="plus-circle-o"
            ghost
            onClick={toggleAddModal}
          >
            Add User
          </Button>
        </div>
        <Row type="flex" gutter={16}>
          {userData.map((user, i) => (
            <Col key={i} {...gridConfig}>
              <User
                title={`${user.lastName}, ${user.firstName}`}
                description={user.type}
                toggleEditModal={toggleEditModal}
                toggleDeleteModal={toggleDeleteModal}
              />
            </Col>
          ))}
        </Row>
        <EditModal
          isEditModalOpen={isEditModalOpen}
          toggleEditModal={toggleEditModal}
        />
        <AddModal
          isAddModalOpen={isAddModalOpen}
          toggleAddModal={toggleAddModal}
        />
        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          toggleDeleteModal={toggleDeleteModal}
        />
      </div>
    );
  }
}

export default Users;
