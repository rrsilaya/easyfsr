import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { VIEW_FSR } from '../duck';

class ViewFSRModal extends Component {
  render() {
    const {
      isViewFSRModalOpen,

      toggleModal,
    } = this.props;

    return (
      <Modal
        title="View FSR"
        visible={isViewFSRModalOpen}
        onOk={() => toggleModal(VIEW_FSR)}
        onCancel={() => toggleModal(VIEW_FSR)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(VIEW_FSR)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" htmlType="submit">
            Add
          </Button>,
        ]}
      >
        <h1>View FSR</h1>
      </Modal>
    );
  }
}

export default ViewFSRModal;
