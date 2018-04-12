import React, { Component } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

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
        title="Edit Profile"
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
          <FormItem {...formItemLayout} label="Employee No.">
            <Input value={user.employeeID} disabled />
          </FormItem>
          <FormItem {...formItemLayout} label="Room No.">
            <Input placeholder="C-112" />
          </FormItem>
          <FormItem {...formItemLayout} label="User Type">
            {form.getFieldDecorator('contractType', {
              initialValue: user.contractType,
            })(
              <Select>
                <Option value="FULL-TIME">FULL-TIME</Option>
                <Option value="PART-TIME">PART-TIME</Option>
              </Select>,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(EditModal);
