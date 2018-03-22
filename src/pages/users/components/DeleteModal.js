import React, { Component } from 'react';
import { Modal, Button } from 'antd';

class AddModal extends Component {
  render() {
    const {
      isDeleteModalOpen,

      toggleDeleteModal,
    } = this.props;

    return (
      <Modal
        visible={isDeleteModalOpen}
        onOk={toggleDeleteModal}
        onCancel={toggleDeleteModal}
        footer={[
          <Button key="back" onClick={toggleDeleteModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={toggleDeleteModal}>
            Save
          </Button>,
        ]}
      >
        <h1>Delete</h1>
      </Modal>
    );
  }
}

export default AddModal;
