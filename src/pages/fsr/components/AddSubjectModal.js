import React, { Component } from 'react';
import { Modal, Button, Form, Input, TimePicker } from 'antd';
import { ADD_SUBJECT } from '../duck';

const FormItem = Form.Item;

class AddSubjectModal extends Component {
  handleAfterClose = () => {
    this.props.form.resetFields();
  };

  handleCancel = () => {
    this.props.toggleModal(ADD_SUBJECT);
    this.handleAfterClose();
  };

  render() {
    const {
      isAddSubjectModalOpen,

      toggleModal,
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
        onOk={() => toggleModal(ADD_SUBJECT)}
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
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter subject code" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Section Code">
            {getFieldDecorator('sectionCode', {
              rules: [
                {
                  required: true,
                  message: 'Please input Section Code',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter section code" />)}
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
            })(<Input placeholder="Enter name of room" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Days">
            {getFieldDecorator('day', {
              rules: [
                {
                  required: true,
                  message: 'Please input the days',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter days of classes" />)}
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
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter number of hours per week" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="No of Students">
            {getFieldDecorator('noOfStudents', {
              rules: [
                {
                  required: true,
                  message: 'Please input number of students',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter total number of students" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Course Credits">
            {getFieldDecorator('teachingLoadCreds', {
              rules: [
                {
                  required: true,
                  message: 'Please input course credits',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter course credits" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddSubjectModal);
