import React, { Component } from 'react';
import { Modal, Button, Form, Select, Input, TimePicker } from 'antd';
import { ADD_CONSULTATIONHOUR } from '../duck';

const FormItem = Form.Item;
const { Option } = Select;

class AddConsultationHourModal extends Component {
  handleAfterClose = () => {
    this.props.form.resetFields();
  };

  handleCancel = () => {
    this.props.toggleModal(ADD_CONSULTATIONHOUR);
    this.handleAfterClose();
  };

  render() {
    const {
      isAddConsultationHourModalOpen,

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
        onOk={() => toggleModal(ADD_CONSULTATIONHOUR)}
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
