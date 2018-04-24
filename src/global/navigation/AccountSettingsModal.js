import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';

const FormItem = Form.Item;

class AccountSettingsModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        this.props.editSettings(this.props.user, values);
        this.handleAfterClose();
      }
    });
  };

  handleCancel = () => {
    this.props.toggleAccountSettings();
    this.handleAfterClose();
  };

  validateNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.isMatch) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Passwords do not match.');
    } else callback();
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ isMatch: this.state.isMatch || !!value });
  };

  handleAfterClose = () => {
    this.props.form.resetFields();
  };

  state = {
    //to be connected to redux later
    isMatch: false,
  };

  render() {
    const {
      user,
      form,
      toggleAccountSettings,
      isAccountSettingsToggled,
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
        title="Account Settings"
        visible={isAccountSettingsToggled}
        onOk={toggleAccountSettings}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={this.handleFormSubmit}
          >
            Save
          </Button>,
        ]}
      >
        <Form onSubmit={this.handleFormSubmit}>
          <FormItem {...formItemLayout} label="E-mail">
            <Input value={user.emailAddress} disabled />
          </FormItem>
          <FormItem {...formItemLayout} label="Password">
            {form.getFieldDecorator('password', {
              rules: [
                {
                  validator: this.validateNextPassword,
                },
              ],
            })(<Input type="password" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Confirm Password">
            {form.getFieldDecorator('confirm', {
              rules: [
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AccountSettingsModal);
