import React, { Component } from 'react';
import { Button, Row, Col, Pagination, Input } from 'antd';

import User from './components/User';
import EditModal from './components/EditModal';
import AddModal from './components/AddModal';
import DeleteModal from './components/DeleteModal';

import styles from './styles';
import userData from './user-data';

const { Search } = Input;

class Users extends Component {
  render() {
    const gridConfig = { xxl: 6, xl: 8, sm: 12, xs: 24 };
    const {
      isEditModalOpen,
      isAddModalOpen,
      isDeleteModalOpen,

      isAddingUser,

      toggleEditModal,
      toggleAddModal,
      toggleDeleteModal,

      addUser,
    } = this.props;

    return (
      <div>
        <div style={styles.search}>
          <Search
            placeholder="Search user..."
            enterButton="Search"
            size="large"
            style={styles.searchBar}
          />
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
          addUser={addUser}
          isAddingUser={isAddingUser}
        />
        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          toggleDeleteModal={toggleDeleteModal}
        />
        <div style={styles.pagination}>
          <Pagination defaultCurrent={1} total={50} size="small" />
        </div>
      </div>
    );
  }
}

export default Users;
