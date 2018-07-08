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
import { EDIT_SUBJECT_MODAL } from '../duck';
import { getFieldValues } from '../../../utils';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;
const hours = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
];

class EditSubjectModal extends Component {
  componentDidMount() {
    this.props.getTimeslots({ subjectID: this.props.subject.subjectID });
  }

  handleFormSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const fieldValues = getFieldValues(values);
        fieldValues.timeStart = moment(fieldValues.timeStart).format('HH:mm');
        fieldValues.timeEnd = moment(fieldValues.timeEnd).format('HH:mm');
        this.props.editSubject(this.props.subject.subjectID, {
          ...fieldValues,
          id: this.props.id,
        });
      }
    });
  };

  disabledTimeStart = () => {
    const timeEnd = this.props.form.getFieldValue('timeEnd');
    if (!timeEnd) {
      return hours.filter(hour => hour < 7 || hour > 18);
    }

    return hours.filter(
      hour => hour >= timeEnd.hour() || hour < 7 || hour > 18,
    );
  };

  disabledTimeEnd = () => {
    const timeStart = this.props.form.getFieldValue('timeStart');
    if (!timeStart) {
      return hours.filter(hour => hour < 8 || hour > 19);
    }

    return hours.filter(
      hour => hour <= timeStart.hour() || hour < 8 || hour > 19,
    );
  };

  render() {
    const {
      isEditSubjectModalOpen,
      isEditingSubject,
      subject,
      timeslots,

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

    const tStart = timeslots.map(timeslot => timeslot.timeStart);
    const tEnd = timeslots.map(timeslot => timeslot.timeEnd);

    return (
      <Modal
        title="Edit Subject"
        visible={isEditSubjectModalOpen}
        onOk={() => toggleModal(EDIT_SUBJECT_MODAL)}
        onCancel={() => toggleModal(EDIT_SUBJECT_MODAL)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(EDIT_SUBJECT_MODAL)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={this.handleFormSubmit}
            loading={isEditingSubject}
          >
            Edit
          </Button>,
        ]}
      >
        <Form onSubmit={this.handleFormSubmit}>
          <FormItem {...formItemLayout} label="Subject">
            {getFieldDecorator('subjectCode', {
              rules: [
                {
                  required: true,
                  message: 'Please input Subject Code',
                  whitespace: true,
                },
              ],
              initialValue: subject.subjectCode,
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
              initialValue: subject.sectionCode,
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
              initialValue: subject.room,
            })(<Input placeholder="Enter name of room" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Days">
            {getFieldDecorator('days', {
              rules: [
                {
                  required: true,
                  message: 'Please select the days of classes',
                },
              ],
              initialValue: timeslots.map(timeslot => timeslot.day),
            })(
              <Select
                mode="multiple"
                placeholder="Select days of classes"
                disabled
              >
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
            })(
              <TimePicker
                format="HH:mm"
                minuteStep={30}
                disabledHours={this.disabledTimeStart}
              />,
            )}
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
            })(
              <TimePicker
                format="HH:mm"
                minuteStep={30}
                disabledHours={this.disabledTimeEnd}
              />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="No of Students">
            {getFieldDecorator('noOfStudents', {
              rules: [
                {
                  required: true,
                  message: 'Please input total number of students',
                },
              ],
              initialValue: subject.noOfStudents,
            })(<InputNumber min={1} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Course Credits">
            {getFieldDecorator('teachingLoadCreds', {
              rules: [
                {
                  required: true,
                  message: 'Please input course credits',
                },
              ],
              initialValue: subject.teachingLoadCreds,
            })(<InputNumber min={0} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(EditSubjectModal);
