import React, { Component } from 'react';
import { Modal, Button, Form, Input, Select, Switch } from 'antd';

import { getFieldValues } from '../../../utils';
import { getUsers } from '../../../api';
import ranks from './ranks';
import committees from './committees';

const FormItem = Form.Item;
const { OptGroup, Option } = Select;

class AddModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.addUser(getFieldValues(values));
        this.handleAfterClose();
      }
    });
  };

  validateNextPassword = (rule, value, callback) => {
    const { form } = this.props;

    if (value && this.state.isMatch) {
      form.validateFields(['confirm@@addUser'], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;

    if (value && value !== form.getFieldValue('password@@addUser')) {
      callback('Passwords do not match.');
    } else callback();
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ isMatch: this.state.isMatch || !!value });
  };

  handleAfterClose = () => {
    this.props.form.resetFields();
  };

  handleCancel = () => {
    this.props.toggleAddModal();
    this.handleAfterClose();
  };

  validateEmployeeID = async (rule, value, callback) => {
    if (!value) return callback('Please input employee ID');

    const { data } = await getUsers({
      employeeID: value,
      page: 1,
      limit: 1,
    });

    if (data.total) return callback('Employee ID must be unique.');
    callback();
  };

  validateEmail = async (rule, value, callback) => {
    if (!value) return callback('Please input email address.');
    if (!value.match(/^[\w\d]+$/))
      return callback('Please enter a valid email address.');

    const { data } = await getUsers({
      emailAddress: value + '@up.edu.ph',
      page: 1,
      limit: 1,
    });

    if (data.total) return callback('Email address must be unique.');
  };

  changeToggle = checked => {
    console.log(checked);
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
        title="Add User"
        visible={isAddModalOpen}
        onOk={toggleAddModal}
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
            loading={isAddingUser}
          >
            Add
          </Button>,
        ]}
      >
        <Form onSubmit={this.handleFormSubmit}>
          <FormItem
            {...formItemLayout}
            label="Employee ID"
            required
            hasFeedback
          >
            {form.getFieldDecorator('employeeID@@addUser', {
              rules: [{ validator: this.validateEmployeeID }],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="First Name">
            {form.getFieldDecorator('firstName@@addUser', {
              rules: [
                {
                  required: true,
                  message: 'Please input first name',
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Middle Name">
            {form.getFieldDecorator('middleName@@addUser')(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Last Name">
            {form.getFieldDecorator('lastName@@addUser', {
              rules: [
                {
                  required: true,
                  message: 'Please input last name',
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="E-mail" required>
            {form.getFieldDecorator('emailAddress@@addUser', {
              rules: [{ validator: this.validateEmail }],
            })(<Input addonAfter="@up.edu.ph" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Password">
            {form.getFieldDecorator('password@@addUser', {
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
            {form.getFieldDecorator('confirm@@addUser', {
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
          <FormItem {...formItemLayout} label="Rank">
            {form.getFieldDecorator('rank@@addUser', {
              rules: [
                {
                  required: true,
                  message: 'Please select rank of user',
                },
              ],
            })(
              <Select placeholder="Select User Rank" showSearch>
                {ranks.map(rank => (
                  <OptGroup key={rank.title}>
                    {rank.children.map(opt => (
                      <Option key={opt.title} value={opt.title}>
                        {opt.title}
                      </Option>
                    ))}
                  </OptGroup>
                ))}
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Committee">
            {form.getFieldDecorator('committee@@addUser')(
              <Select showSearch>
                {committees.map(committee => (
                  <Option key={committee} value={committee}>
                    {committee}
                  </Option>
                ))}
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Contract Type">
            {form.getFieldDecorator('contractType@@addUser', {
              rules: [
                {
                  required: true,
                  message: 'Please select contract type',
                },
              ],
            })(
              <Select placeholder="Select Contract Type">
                <Option value="FULL-TIME">Full-time Employment</Option>
                <Option value="PART-TIME">Part-time Employment</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Room Number">
            {form.getFieldDecorator('officeNumber')(
              <Input placeholder="C-112" />,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddModal);
