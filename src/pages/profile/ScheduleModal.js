import React, { Component } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';

import { Schedule } from './Schedule';
const FormItem = Form.Item;
const { OptGroup, Option } = Select;

class ScheduleModal extends Component {
  state = {
    //to be connected to redux later
    visible: false,
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  handleAfterClose = () => {
    this.props.form.resetFields();
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
      <div>
        <Button type="primary" onClick={this.showModal}>
          Schedule
        </Button>
        <Modal
          visible={true}
          title="Schedule"
          //isViewingSchedule={this.state.isViewingSchedule}

          onOk={this.handleOk}
          onCancel={this.handleCancel}
          data={[]}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
          ]}
        >
          <Schedule data={[]} />
        </Modal>
      </div>
    );
  }
}

export default Form.create()(ScheduleModal);
