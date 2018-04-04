import React, { Component } from 'react';
import { Modal, Button, Form, Input, TimePicker } from 'antd';
import { ADD_COURSE } from '../duck';

const FormItem = Form.Item;

class AddCourseModal extends Component {
  render() {
    const {
      isAddCourseModalOpen,

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
        title="Add Course"
        visible={isAddCourseModalOpen}
        onOk={() => toggleModal(ADD_COURSE)}
        onCancel={() => toggleModal(ADD_COURSE)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(ADD_COURSE)}>
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
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter course number" />)}
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
          <FormItem {...formItemLayout} label="School">
            {getFieldDecorator('school', {
              rules: [
                {
                  required: true,
                  message: 'Please input school',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter name of school" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Course Credits">
            {getFieldDecorator('credit', {
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

export default Form.create()(AddCourseModal);
