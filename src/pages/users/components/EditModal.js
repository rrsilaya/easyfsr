import React, { Component } from 'react';
import { Modal, Button } from 'antd';

class EditModal extends Component {
  render() {
    const {
      isEditModalOpen,

      toggleEditModal,
    } = this.props;

    return (
      <Modal
        visible={isEditModalOpen}
        onOk={toggleEditModal}
        onCancel={toggleEditModal}
        footer={[
          <Button key="back" onClick={toggleEditModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={toggleEditModal}>
            Save
          </Button>,
        ]}
      >
        <h1>Edit User</h1>
      </Modal>
    );
  }
}

export default EditModal;
