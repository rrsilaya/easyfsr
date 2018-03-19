import React, { Component } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

class AddModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.addUser(values);
        this.handleAfterClose();
      }
    });
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
      callback('Passwords do not match');
    } else callback();
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ isMatch: this.state.isMatch || !!value });
  };

  handleAfterClose = () => {
    this.props.form.resetFields();
  };

  state = {
    isMatch: false,
  };

  render() {
    const {
      isAddModalOpen,
      isAddingUser,

      toggleAddModal,

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
        visible={isAddModalOpen}
        onOk={toggleAddModal}
        onCancel={toggleAddModal}
        footer={[
          <Button key="back" onClick={toggleAddModal}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={this.handleFormSubmit}
            loading={isAddingUser}
          >
            Add
          </Button>,
        ]}
      >
        <h1>Add</h1>
        <Form onSubmit={this.handleFormSubmit}>
          <FormItem {...formItemLayout} label="E-mail">
            {form.getFieldDecorator('emailAddress', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not a valid E-mail',
                },
                {
                  required: true,
                  message: 'Please input E-mail address',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Password">
            {form.getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input password',
                },
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
                  required: true,
                  message: 'Please confirm password',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Employee ID">
            {form.getFieldDecorator('employeeID', {
              rules: [
                {
                  required: true,
                  message: 'Please input Employee ID',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="First Name">
            {form.getFieldDecorator('firstName', {
              rules: [
                {
                  required: true,
                  message: 'Please input First Name',
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Middle Name">
            {form.getFieldDecorator('middleName', {
              rules: [{ whitespace: true }],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Last Name">
            {form.getFieldDecorator('lastName', {
              rules: [
                {
                  required: true,
                  message: 'Please input Last Name',
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Office Number">
            {form.getFieldDecorator('officeNumber', {
              rules: [
                {
                  required: true,
                  message: 'Please input Office Number',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Contract Type">
            {form.getFieldDecorator('contractType', {
              rules: [
                {
                  required: true,
                  message: 'Please select Contract Type',
                },
              ],
            })(
              <Select placeholder="Select contract type">
                <Option value="full-time">Full-time Employment</Option>
                <Option value="part-time">Part-time Employment</Option>
              </Select>,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddModal);
