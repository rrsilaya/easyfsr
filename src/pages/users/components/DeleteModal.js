import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import styles from '../styles';

const FormItem = Form.Item;

class DeleteModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.deleteDashboard(this.props.user);
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

  validateMessage = async (rule, value, callback) => {
    if (!value.match(/^I am sure to archive this user.$/))
      return callback('Please enter the correct message');
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
            Delete
          </Button>,
        ]}
      >
        <p> Once archived, you can unarchive this user anytime. </p>
        <p> Please type in the message below confirm. </p>
        <p style={styles.confirmation}> I am sure to archive this user. </p>
        <Form onSubmit={this.handleFormSubmit}>
          <FormItem {...formItemLayout} required hasFeedback>
            {form.getFieldDecorator('confirmation@@deleteUser', {
              rules: [
                {
                  validator: this.validateMessage,
                },
              ],
            })(<Input type="text" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(DeleteModal);
