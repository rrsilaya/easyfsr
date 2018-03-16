import React, { Component } from 'react';
import { Modal, Button } from 'antd';

class AddModal extends Component {
  render() {
    const {
      isAddModalOpen,

      toggleAddModal,
    } = this.props;

    return (
      <Modal
        visible={isAddModalOpen}
        onOk={toggleAddModal}
        onCancel={toggleAddModal}
        footer={[
          <Button key="back" onClick={toggleAddModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={toggleAddModal}>
            Save
          </Button>,
        ]}
      >
        <h1>Add</h1>
      </Modal>
    );
  }
}

export default AddModal;
