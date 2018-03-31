import React, { Component } from 'react';
import { Modal, Button, Form, Input, Select, DatePicker } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

class AddExtAndCommServiceModal extends Component {
  handleAfterClose = () => {
    this.props.form.resetFields();
  };

  handleCancel = () => {
    this.props.toggleAddExtAndCommServiceModal();
    this.handleAfterClose();
  };

  render() {
    const {
      isAddExtAndCommServiceModalOpen,

      toggleAddExtAndCommServiceModal,
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
        title="Add Extension and Community Service"
        visible={isAddExtAndCommServiceModalOpen}
        onOk={toggleAddExtAndCommServiceModal}
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
          <FormItem {...formItemLayout} label="Title of Activity">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: 'Please input title',
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Type">
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: 'Please input type',
                },
              ],
            })(
              <Select placeholder="Select type of extension and community service">
                <Option value="Training">Training</Option>
                <Option value="Information Dissemination">
                  Information Dissemination
                </Option>
                <Option value="Workshop">Workshop</Option>
                <Option value="Symposium">Symposium</Option>
                <Option value="Others">Others</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="No. of Hours">
            {getFieldDecorator('hours', {
              rules: [
                {
                  required: true,
                  message: 'Please input number of hours',
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="No. of Participants">
            {getFieldDecorator('participant', {
              rules: [
                {
                  required: true,
                  message: 'Please input number of participants',
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Start Date">
            {getFieldDecorator('startDate', {
              rules: [
                {
                  required: true,
                  message: 'Please input start date',
                },
              ],
            })(<DatePicker />)}
          </FormItem>
          <FormItem {...formItemLayout} label="End Date">
            {getFieldDecorator('endDate', {
              rules: [
                {
                  required: true,
                  message: 'Please input end date',
                },
              ],
            })(<DatePicker />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Role">
            {getFieldDecorator('role', {
              rules: [
                {
                  required: true,
                  message: 'Please input role',
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Approved Credit Units">
            {getFieldDecorator('creditUnit', {
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

export default Form.create()(AddExtAndCommServiceModal);
