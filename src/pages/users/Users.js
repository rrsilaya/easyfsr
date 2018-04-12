import React, { Component } from 'react';
import { Button, Row, Col, Pagination, Modal } from 'antd';
import { DataLoader } from '../../global';

import User from './components/User';
import EditModal from './components/EditModal';
import AddModal from './components/AddModal';
import DeleteModal from './components/DeleteModal';
import SearchUser from './components/SearchUser';

import styles from './styles';

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
    this.props.getUsers({ limit: 12 });
  }

  componentWillUnmount() {
    this.props.resetPage();
  }

  handlePageSizeChange = (page, limit) => {
    this.props.getUsers({ ...this.props.query, page, limit });
    this.props.changeQuery({ page, limit });
  };

  handlePageSizeChange = (page, limit) => {
    this.props.getUsers({ ...this.props.query, page, limit });
    this.props.changeQuery({ page, limit });
  };

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

      getUsers,
      addUser,
      editUser,
      deleteUser,

      query,
      pagination,
      users,
      user,
    } = this.props;

    return (
      <div>
        <div style={styles.add}>
          <SearchUser getUsers={getUsers} />
          <Button
            style={styles.addButton}
            size="large"
            icon="plus"
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
          <Pagination
            current={pagination.page}
            pageSize={pagination.limit}
            total={pagination.total}
            showSizeChanger
            pageSizeOptions={['12', '24', '36', '48']}
            onChange={this.handlePageSizeChange}
            onShowSizeChange={this.handlePageSizeChange}
          />
        </div>
      </div>
    );
  }
}

export default Users;
