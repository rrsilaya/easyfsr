import React, { Component } from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  TimePicker,
  InputNumber,
} from 'antd';
import { ADD_COURSE_MODAL } from '../duck';
import { getFieldValues } from '../../../utils';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;

class AddCourseModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const fieldValues = getFieldValues(values);
        fieldValues.timeStart = moment(fieldValues.timeStart).format('HH:mm');
        fieldValues.timeEnd = moment(fieldValues.timeEnd).format('HH:mm');
        this.props.addCourse({ ...fieldValues, id: this.props.id });
      }
    });
  };

  render() {
    const {
      isAddCourseModalOpen,
      isAddingCourse,
      isAddingCourseSched,

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
        onOk={() => toggleModal(ADD_COURSE_MODAL)}
        onCancel={() => toggleModal(ADD_COURSE_MODAL)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(ADD_COURSE_MODAL)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={this.handleFormSubmit}
            loading={isAddingCourse || isAddingCourseSched}
          >
            Add
          </Button>,
        ]}
      >
        <Form onSubmit={this.handleFormSubmit}>
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
            {getFieldDecorator('days', {
              rules: [
                {
                  required: true,
                  message: 'Please select the days of classes',
                },
              ],
            })(
              <Select mode="multiple" placeholder="Select days of classes">
                <Option value="MONDAY">Monday</Option>
                <Option value="TUESDAY">Tuesday</Option>
                <Option value="WEDNESDAY">Wednesday</Option>
                <Option value="THURSDAY">Thursday</Option>
                <Option value="FRIDAY">Friday</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Time Start">
            {getFieldDecorator('timeStart', {
              rules: [
                {
                  required: true,
                  message: 'Please input time start',
                },
              ],
            })(<TimePicker format="HH:mm" minuteStep={30} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Time End">
            {getFieldDecorator('timeEnd', {
              rules: [
                {
                  required: true,
                  message: 'Please input time end',
                },
              ],
            })(<TimePicker format="HH:mm" minuteStep={30} />)}
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
                },
              ],
            })(<InputNumber min={0} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddCourseModal);
