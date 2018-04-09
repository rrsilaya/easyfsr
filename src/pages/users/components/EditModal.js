import React, { Component } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';
import ranks from './ranks';

const FormItem = Form.Item;
const { OptGroup, Option } = Select;

class EditModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        this.props.editUser(this.props.user, values);
        this.handleAfterClose();
      }
    });
  };

  handleCancel = () => {
    this.props.toggleEditModal();
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
    this.props.changeSelectedUser({});
    this.props.form.resetFields();
  };

  state = {
    //to be connected to redux later
    isMatch: false,
  };

  render() {
    const {
      isEditModalOpen,
      isEditingUser,

      toggleEditModal,

      user,
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
        title="Edit User"
        visible={isEditModalOpen}
        onOk={toggleEditModal}
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
            loading={isEditingUser}
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
          <FormItem {...formItemLayout} label="User Type">
            {form.getFieldDecorator('acctType', {
              initialValue: user.acctType,
            })(
              <Select>
                <Option value="USER">User</Option>
                <Option value="ADMIN">Admin</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Rank">
            {form.getFieldDecorator('rank', {
              initialValue: user.rank,
            })(
              <Select showSearch>
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
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(EditModal);
