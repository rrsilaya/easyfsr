import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { SETTINGS } from '../duck';
// import styles from '../styles';

// const FormItem = Form.Item;

class SettingsModal extends Component {
  render() {
    const {
      isSettingsModalOpen,

      toggleModal,

      // form,
    } = this.props;

    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 8 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 16 },
    //   },
    // };
    return (
      <Modal
        title="Settings"
        visible={isSettingsModalOpen}
        onOk={() => toggleModal(SETTINGS)}
        onCancel={() => toggleModal(SETTINGS)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(SETTINGS)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" htmlType="submit">
            Yes
          </Button>,
        ]}
      />
    );
  }
}

export default SettingsModal;
