import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { EDIT_FSR } from '../duck';

class EditFSRModal extends Component {
  render() {
    const {
      isEditFSRModalOpen,

      toggleModal,
    } = this.props;

    return (
      <Modal
        title="Edit FSR"
        visible={isEditFSRModalOpen}
        onOk={() => toggleModal(EDIT_FSR)}
        onCancel={() => toggleModal(EDIT_FSR)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(EDIT_FSR)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" htmlType="submit">
            Add
          </Button>,
        ]}
      >
        <h1>Edit FSR</h1>
      </Modal>
    );
  }
}

export default EditFSRModal;
