import React, { Component } from 'react';
import { Modal, Button, Form, Input, Transfer } from 'antd';
import { CREATE_FSR } from '../duck';
import styles from '../styles';

const FormItem = Form.Item;

class CreateFSRModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // this.props.deleteUser(this.props.user);
        this.handleAfterClose();
      }
    });
  };

  handleAfterClose = () => {
    // this.props.changeSelectedUser({});
    this.props.form.resetFields();
  };

  handleCancel = () => {
    this.props.toggleDeleteModal();
    this.handleAfterClose();
  };

  render() {
    const {
      isCreateFSRModalOpen,

      toggleModal,

      users,

      form,
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
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
            Create
          </Button>,
        ]}
      >
        <Transfer showSearch dataSource={users} />
      </Modal>
    );
  }
}

export default Form.create()(CreateFSRModal);
