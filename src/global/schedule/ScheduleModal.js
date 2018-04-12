import React, { Component } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';

import { Schedule } from '../../global';
const FormItem = Form.Item;
const { OptGroup, Option } = Select;

class ScheduleModal extends Component {
  handleAfterClose = () => {
    this.props.form.resetFields();
  };

  state = {
    //to be connected to redux later
    isViewingSchedule: false,
  };

  render() {
    const { user, form, viewSchedule, isViewingSchedule } = this.props;

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
        title="Schedule"
        visible={isViewingSchedule}
        onOk={viewSchedule}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        {Schedule}
      </Modal>
    );
  }
}

export default Form.create()(ScheduleModal);
