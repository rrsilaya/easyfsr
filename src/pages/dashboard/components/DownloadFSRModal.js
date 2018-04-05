import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { DOWNLOAD_FSR } from '../duck';

class DownloadFSRModal extends Component {
  render() {
    const {
      isDownloadFSRModalOpen,

      toggleModal,
    } = this.props;

    return (
      <Modal
        title="Download FSR"
        visible={isDownloadFSRModalOpen}
        onOk={() => toggleModal(DOWNLOAD_FSR)}
        onCancel={() => toggleModal(DOWNLOAD_FSR)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(DOWNLOAD_FSR)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" htmlType="submit">
            Add
          </Button>,
        ]}
      >
        <h1>DownloadFSR</h1>
      </Modal>
    );
  }
}

export default DownloadFSRModal;
