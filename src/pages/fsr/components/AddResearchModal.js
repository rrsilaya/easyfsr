import React, { Component } from 'react';
import { Modal, Button, Form, Input, Select, DatePicker } from 'antd';
import { ADD_RESEARCH } from '../duck';

const FormItem = Form.Item;
const { Option } = Select;

class AddResearchModal extends Component {
  handleAfterClose = () => {
    this.props.form.resetFields();
  };

  handleCancel = () => {
    this.props.toggleModal(ADD_RESEARCH);
    this.handleAfterClose();
  };

  render() {
    const {
      isAddResearchModalOpen,

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
        title="Add Research"
        visible={isAddResearchModalOpen}
        onOk={() => toggleModal(ADD_RESEARCH)}
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
          <FormItem {...formItemLayout} label="Title">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: 'Please input Title',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter complete title of research" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Type">
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: 'Please input Type',
                },
              ],
            })(
              <Select placeholder="Select type of research">
                <Option value="Proposal">Proposal</Option>
                <Option value="Implementation">Implementation</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Co-Workers">
            {getFieldDecorator('rCoWorker', {
              rules: [
                {
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter name of co-workers" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Start Date">
            {getFieldDecorator('startDate', {
              rules: [
                {
                  required: true,
                  message: 'Please input start date',
                },
              ],
            })(<DatePicker />)}
          </FormItem>
          <FormItem {...formItemLayout} label="End Date">
            {getFieldDecorator('endDate')(<DatePicker />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Funding">
            {getFieldDecorator('funding')(
              <Input placeholder="Enter funding" />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Approved Credit Units">
            {getFieldDecorator('creditUnit', {
              rules: [
                {
                  required: true,
                  message: 'Please input approved credit units',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter approved credit units" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddResearchModal);
