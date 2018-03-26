import React, { Component } from 'react';
import { Button, Row, Col, Pagination, Input, Modal } from 'antd';
import { DataLoader } from '../../global';

import User from './components/User';
import EditModal from './components/EditModal';
import AddModal from './components/AddModal';
import DeleteModal from './components/DeleteModal';

import styles from './styles';

const { Search } = Input;
const { confirm } = Modal;

class Users extends Component {
  showConfirmDelete = () => {
    confirm({
      title: 'Are you sure you want to delete this user?',
      content: 'You are about to archive this user.',
      okText: 'Yes',
      cancelText: 'No',
      okType: 'primary',
      onCancel() {},
    });
  };
  componentDidMount() {
    this.props.getUsers();
  }

  componentWillUnmount() {
    this.props.resetPage();
  }

  render() {
    const gridConfig = { xxl: 6, xl: 8, sm: 12, xs: 24 };
    const {
      isEditModalOpen,
      isAddModalOpen,
      isDeleteModalOpen,

      isGettingUsers,
      isAddingUser,
      isEditingUser,
      isDeletingUser,

      toggleEditModal,
      toggleAddModal,
      toggleDeleteModal,
      changeSelectedUser,

      addUser,
      editUser,
      deleteUser,

      users,
      user,
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
        <DataLoader
          isLoading={isGettingUsers}
          content={
            <Row type="flex" gutter={16}>
              {users.map((user, i) => (
                <Col key={i} {...gridConfig}>
                  <User
                    user={user}
                    title={`${user.lastName}, ${user.firstName}`}
                    description={user.acctType}
                    toggleEditModal={toggleEditModal}
                    toggleDeleteModal={toggleDeleteModal}
                    changeSelectedUser={changeSelectedUser}
                  />
                </Col>
              ))}
            </Row>
          }
        />
        <EditModal
          user={user}
          isEditModalOpen={isEditModalOpen}
          toggleEditModal={toggleEditModal}
          editUser={editUser}
          isEditingUser={isEditingUser}
          changeSelectedUser={changeSelectedUser}
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
          changeSelectedUser={changeSelectedUser}
          deleteUser={deleteUser}
          isDeletingUser={isDeletingUser}
        />
        <div className="pagination">
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    );
  }
}

export default Users;
