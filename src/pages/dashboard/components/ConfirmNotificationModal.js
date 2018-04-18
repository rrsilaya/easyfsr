import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import styles from '../styles';

const FormItem = Form.Item;

class ConfirmNotificationModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.createNotification(this.props.user);
        this.handleAfterClose();
      }
    });
  };

  handleCancel = () => {
    this.props.toggleConfirmNotificationModal();
    this.handleAfterClose();
  };

  handleAfterClose = () => {
    this.props.form.resetFields();
  };

  validateMessage = async (rule, value, callback) => {
    if (!value.match(/^Yes, I want to send a notification.$/))
      return callback('Please enter the correct message');
  };

  render() {
    const {
      isConfirmNotificationModalOpen,
      isConfirmingNotification,

      toggleConfirmNotificationModal,
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
        title="Confirm Notification"
        visible={isConfirmNotificationModalOpen}
        onOk={toggleConfirmNotificationModal}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={this.handleFormSubmit}
            loading={isConfirmingNotification}
          >
            Create
          </Button>,
        ]}
      >
        <p> Are you sure you want to send a notification? </p>
        <p> Please type in the message below confirm. </p>
        <p style={styles.confirmation}> Yes, I want to send a notification. </p>
        <Form onSubmit={this.handleFormSubmit}>
          <FormItem {...formItemLayout} required hasFeedback>
            {form.getFieldDecorator('confirmation@@createNotification', {
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

export default Form.create()(ConfirmNotificationModal);
