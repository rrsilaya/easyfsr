import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { CREATE_FSR } from '../duck';

class CreateFSRModal extends Component {
  render() {
    const {
      isCreateFSRModalOpen,

      toggleModal,
    } = this.props;

    return (
      <Modal
        title="Create FSR"
        visible={isCreateFSRModalOpen}
        onOk={() => toggleModal(CREATE_FSR)}
        onCancel={() => toggleModal(CREATE_FSR)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(CREATE_FSR)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" htmlType="submit">
            Add
          </Button>,
        ]}
      >
        <h1>Create FSR</h1>
      </Modal>
    );
  }
}

export default CreateFSRModal;
