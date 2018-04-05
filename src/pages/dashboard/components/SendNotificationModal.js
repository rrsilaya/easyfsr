import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { SEND_NOTIFICATION } from '../duck';

class SendNotificationModal extends Component {
  render() {
    const {
      isSendNotificationModalOpen,

      toggleModal,
    } = this.props;

    return (
      <Modal
        title="Send Notification"
        visible={isSendNotificationModalOpen}
        onOk={() => toggleModal(SEND_NOTIFICATION)}
        onCancel={() => toggleModal(SEND_NOTIFICATION)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(SEND_NOTIFICATION)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" htmlType="submit">
            Add
          </Button>,
        ]}
      >
        <h1>Send Notification</h1>
      </Modal>
    );
  }
}

export default SendNotificationModal;
