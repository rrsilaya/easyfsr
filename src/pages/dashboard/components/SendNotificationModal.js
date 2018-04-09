import React, { Component } from 'react';
import { Modal, Button, Input, AutoComplete } from 'antd';
import { SEND_NOTIFICATION } from '../duck';
import styles from '../styles';

const { Search } = Input;
const { TextArea } = Input;

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
            Send
          </Button>,
        ]}
      >
        <AutoComplete placeholder="Enter user name" style={styles.toUserBox} />

        <TextArea
          rows={5}
          placeholder="Enter message here..."
          style={styles.messageBox}
        />
      </Modal>
    );
  }
}

export default SendNotificationModal;
