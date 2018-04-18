import React, { Component } from 'react';
import { Modal, Button, Input } from 'antd';
import styles from '../styles';

import { CREATE_ANNOUNCEMENT } from '../duck';

const { TextArea } = Input;
const { confirm } = Modal;

class CreateAnnouncementModal extends Component {
  handleToggleConfirmAnnouncementModal = () => {
    this.props.toggleConfirmAnnouncementModal();
  };

  render() {
    const {
      isCreateAnnouncementModalOpen,

      toggleModal,
    } = this.props;

    return (
      <Modal
        title="Create Announcement"
        visible={isCreateAnnouncementModalOpen}
        onOk={() => toggleModal(CREATE_ANNOUNCEMENT)}
        onCancel={() => toggleModal(CREATE_ANNOUNCEMENT)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(CREATE_ANNOUNCEMENT)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={this.props.toggleConfirmAnnouncementModal}
          >
            Create
          </Button>,
        ]}
      >
        <TextArea rows={5} placeholder="Enter announcement here..." />
      </Modal>
    );
  }
}

export default CreateAnnouncementModal;
