import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';

const FormItem = Form.Item;

class AddAdminWorkModal extends Component {
  handleAfterClose = () => {
    this.props.form.resetFields();
  };

  handleCancel = () => {
    this.props.toggleAddAdminWorkModal();
    this.handleAfterClose();
  };

  render() {
    const {
      isAddAdminWorkModalOpen,

      toggleAddAdminWorkModal,
    } = this.props;

    const { getFieldDecorator } = this.props.form;

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
        title="Add Administrative Work"
        visible={isAddAdminWorkModalOpen}
        onOk={toggleAddAdminWorkModal}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" htmlType="submit">
            Add
          </Button>,
        ]}
      >
        <Form>
          <FormItem {...formItemLayout} label="Position">
            {getFieldDecorator('position', {
              rules: [
                {
                  required: true,
                  message: 'Please input position',
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Office/Unit">
            {getFieldDecorator('officeUnit', {
              rules: [
                {
                  required: true,
                  message: 'Please input office or unit',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Approved Credit Units">
            {getFieldDecorator('approvedUnits', {
              rules: [
                {
                  required: true,
                  message: 'Please input approved credit units',
                },
              ],
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddAdminWorkModal);
