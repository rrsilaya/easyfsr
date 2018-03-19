import React, { Component } from 'react';
import { Modal, Button } from 'antd';

class EditModal extends Component {
  render() {
    const {
      isEditModalOpen,

      toggleEditModal,

      getUser,
    } = this.props;

    return (
      <Modal
        title="Edit User"
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
      />
    );
  }
}

export default EditModal;
