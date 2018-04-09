import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';
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

  validateMessage = async (rule, value, callback) => {
    if (!value.match(/^Yes, I want to create a new FSR\.$/))
      return callback('Please enter the correct message');
  };

  render() {
    const {
      isCreateFSRModalOpen,

      toggleModal,

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
            Yes
          </Button>,
        ]}
      >
        <p>Are you sure you want to create a new FSR?</p>
        <p> Please type in the message below confirm. </p>
        <p style={styles.confirmation}> Yes, I want to create a new FSR. </p>
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

export default Form.create()(CreateFSRModal);
