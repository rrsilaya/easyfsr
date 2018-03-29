import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';

const FormItem = Form.Item;

class DeleteModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.deleteUser(this.props.user);
        this.handleAfterClose();
      }
    });
  };

  handleCancel = () => {
    this.props.toggleDeleteModal();
    this.handleAfterClose();
  };

  handleAfterClose = () => {
    this.props.changeSelectedUser({});
    this.props.form.resetFields();
  };

  render() {
    const {
      isDeleteModalOpen,
      isDeletingUser,

      toggleDeleteModal,
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
        title="Delete user"
        visible={isDeleteModalOpen}
        onOk={toggleDeleteModal}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={this.handleFormSubmit}
            loading={isDeletingUser}
          >
            Save
          </Button>,
        ]}
      >
        <p> You are about to archive this user. </p>
        <Form onSubmit={this.handleFormSubmit}>
          <FormItem {...formItemLayout} label="Password">
            {form.getFieldDecorator('password@@addUser', {
              rules: [
                {
                  required: true,
                  message: 'Please input password',
                },
              ],
            })(<Input type="password" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(DeleteModal);
