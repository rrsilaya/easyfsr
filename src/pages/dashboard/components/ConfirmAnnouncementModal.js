import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import styles from '../styles';

const FormItem = Form.Item;

class ConfirmAnnouncementModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.createAnnouncement(this.props.user);
        this.handleAfterClose();
      }
    });
  };

  handleCancel = () => {
    this.props.toggleConfirmAnnouncementModal();
    this.handleAfterClose();
  };

  handleAfterClose = () => {
    this.props.form.resetFields();
  };

  validateMessage = async (rule, value, callback) => {
    if (!value.match(/^Yes, I want to create an announcement.$/))
      return callback('Please enter the correct message');
  };

  render() {
    const {
      isConfirmAnnouncementModalOpen,
      isConfirmingAnnouncement,

      toggleConfirmAnnouncementModal,
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
        title="Confirm Announcement"
        visible={isConfirmAnnouncementModalOpen}
        onOk={toggleConfirmAnnouncementModal}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={this.handleFormSubmit}
            loading={isConfirmingAnnouncement}
          >
            Create
          </Button>,
        ]}
      >
        <p> Are you sure you want to create an announcement? </p>
        <p> Please type in the message below confirm. </p>
        <p style={styles.confirmation}>
          {' '}
          Yes, I want to create an announcement.{' '}
        </p>
        <Form onSubmit={this.handleFormSubmit}>
          <FormItem {...formItemLayout} required hasFeedback>
            {form.getFieldDecorator('confirmation@@createAnnouncement', {
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

export default Form.create()(ConfirmAnnouncementModal);
