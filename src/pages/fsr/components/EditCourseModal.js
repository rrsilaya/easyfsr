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
import { EDIT_COURSE_MODAL } from '../duck';
import { getFieldValues } from '../../../utils';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;

class EditCourseModal extends Component {
  componentDidMount() {
    this.props.getCourseScheds({ courseID: this.props.course.courseID });
  }

  handleFormSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const fieldValues = getFieldValues(values);
        fieldValues.timeStart = moment(fieldValues.timeStart).format('HH:mm');
        fieldValues.timeEnd = moment(fieldValues.timeEnd).format('HH:mm');
        this.props.editCourse(this.props.course.courseID, {
          ...fieldValues,
          id: this.props.id,
        });
      }
    });
  };

  render() {
    const {
      course,
      courseScheds,
      isEditCourseModalOpen,
      isEditingCourse,

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

    const tStart = courseScheds.map(courseSched => courseSched.timeStart);
    const tEnd = courseScheds.map(courseSched => courseSched.timeEnd);

    return (
      <Modal
        title="Edit Course"
        visible={isEditCourseModalOpen}
        onOk={() => toggleModal(EDIT_COURSE_MODAL)}
        onCancel={() => toggleModal(EDIT_COURSE_MODAL)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(EDIT_COURSE_MODAL)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={this.handleFormSubmit}
            loading={isEditingCourse}
          >
            Edit
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
              initialValue: course.courseNumber,
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
              initialValue: courseScheds.map(courseSched => courseSched.day),
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
              initialValue: moment(tStart[0], 'HH:mm'),
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
              initialValue: moment(tEnd[0], 'HH:mm'),
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
              initialValue: course.school,
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
              initialValue: course.credit,
            })(<InputNumber min={0} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(EditCourseModal);
