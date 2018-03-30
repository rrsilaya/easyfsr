import React, { Component } from 'react';
import { Modal, Button, Form, Input, TimePicker } from 'antd';

const FormItem = Form.Item;

class AddSubjectModal extends Component {
  handleAfterClose = () => {
    this.props.form.resetFields();
  };

  handleCancel = () => {
    this.props.toggleAddSubjectModal();
    this.handleAfterClose();
  };

  render() {
    const {
      isAddSubjectModalOpen,

      toggleAddSubjectModal,
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
        title="Add Subject"
        visible={isAddSubjectModalOpen}
        onOk={toggleAddSubjectModal}
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
          <FormItem {...formItemLayout} label="Subject">
            {getFieldDecorator('subjectCode', {
              rules: [
                {
                  required: true,
                  message: 'Please input Subject Code',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Section Code">
            {getFieldDecorator('sectionCode', {
              rules: [
                {
                  required: true,
                  message: 'Please input Section Code',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Room">
            {getFieldDecorator('room', {
              rules: [
                {
                  required: true,
                  message: 'Please input room',
                  whitespace: true,
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
          <FormItem {...formItemLayout} label="No of Students">
            {getFieldDecorator('noOfStudents', {
              rules: [
                {
                  required: true,
                  message: 'Please input number of students',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Course Credits">
            {getFieldDecorator('teachingLoadCreds', {
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

export default Form.create()(AddSubjectModal);
