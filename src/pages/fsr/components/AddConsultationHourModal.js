import React, { Component } from 'react';
import { Modal, Button, Form, Select, Input, TimePicker } from 'antd';
import { ADD_CONSULTATIONHOUR_MODAL } from '../duck';
import { getFieldValues } from '../../../utils';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;

class AddConsultationHourModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const fieldValues = getFieldValues(values);
        fieldValues.timeStart = moment(fieldValues.timeStart).format('HH:mm');
        fieldValues.timeEnd = moment(fieldValues.timeEnd).format('HH:mm');

        this.props.addConsultationHour({ ...fieldValues, id: this.props.id });
      }
    });
  };

  render() {
    const {
      isAddConsultationHourModalOpen,
      isAddingConsultationHour,

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
        title="Add Consultation Hour"
        visible={isAddConsultationHourModalOpen}
        onOk={() => toggleModal(ADD_CONSULTATIONHOUR_MODAL)}
        onCancel={() => toggleModal(ADD_CONSULTATIONHOUR_MODAL)}
        destroyOnClose
        footer={[
          <Button
            key="back"
            onClick={() => toggleModal(ADD_CONSULTATIONHOUR_MODAL)}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={this.handleFormSubmit}
            loading={isAddingConsultationHour}
          >
            Add
          </Button>,
        ]}
      >
        <Form onSubmit={this.handleFormSubmit}>
          <FormItem {...formItemLayout} label="Day">
            {getFieldDecorator('day', {
              rules: [
                {
                  required: true,
                  message: 'Please input day of consultation hour',
                },
              ],
            })(
              <Select placeholder="Select day of consultation hour">
                <Option value="Monday">Monday</Option>
                <Option value="Tuesday">Tuesday</Option>
                <Option value="Wednesday">Wednesday</Option>
                <Option value="Thursday">Thursday</Option>
                <Option value="Friday">Friday</Option>
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
          <FormItem {...formItemLayout} label="Place">
            {getFieldDecorator('place', {
              rules: [
                {
                  required: true,
                  message: 'Please input place',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter place for consultation hour" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddConsultationHourModal);
