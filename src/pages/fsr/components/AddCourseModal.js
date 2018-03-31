import React, { Component } from 'react';
import { Modal, Button, Form, Input, TimePicker } from 'antd';

const FormItem = Form.Item;

class AddCourseModal extends Component {
  handleAfterClose = () => {
    this.props.form.resetFields();
  };

  handleCancel = () => {
    this.props.toggleAddCourseModal();
    this.handleAfterClose();
  };

  render() {
    const {
      isAddCourseModalOpen,

      toggleAddCourseModal,
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
        title="Add Course"
        visible={isAddCourseModalOpen}
        onOk={toggleAddCourseModal}
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
          <FormItem {...formItemLayout} label="Course Number">
            {getFieldDecorator('courseNumber', {
              rules: [
                {
                  required: true,
                  message: 'Please input Course Number',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Days">
            {getFieldDecorator('day', {
              rules: [
                {
                  required: true,
                  message: 'Please input days',
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Time Start">
            {getFieldDecorator('timeStart', {
              rules: [
                {
                  required: true,
                  message: 'Please input time start',
                },
              ],
            })(<TimePicker />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Time End">
            {getFieldDecorator('timeEnd', {
              rules: [
                {
                  required: true,
                  message: 'Please input time end',
                },
              ],
            })(<TimePicker />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Hours Per Week">
            {getFieldDecorator('hoursPerWeek', {
              rules: [
                {
                  required: true,
                  message: 'Please input hours per week',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="School">
            {getFieldDecorator('school', {
              rules: [
                {
                  required: true,
                  message: 'Please input school',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Course Credits">
            {getFieldDecorator('credit', {
              rules: [
                {
                  required: true,
                  message: 'Please input course credits',
                },
              ],
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddCourseModal);
