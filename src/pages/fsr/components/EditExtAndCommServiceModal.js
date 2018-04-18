import React, { Component } from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
} from 'antd';
import { EDIT_EXTANDCOMMSERVICE_MODAL } from '../duck';
import { getFieldValues } from '../../../utils';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;

class EditExtAndCommServiceModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const fieldValues = getFieldValues(values);
        fieldValues.startDate = moment(fieldValues.startDate).format(
          'YYYY-MM-DD',
        );
        fieldValues.endDate = moment(fieldValues.endDate).format('YYYY-MM-DD');

        this.props.editExtAndCommService(
          this.props.extAndCommService.extAndCommServiceID,
          { ...fieldValues, id: this.props.id },
        );
      }
    });
  };

  render() {
    const {
      isEditExtAndCommServiceModalOpen,
      isEditingExtAndCommService,
      extAndCommService,

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
        title="Edit Extension and Community Service"
        visible={isEditExtAndCommServiceModalOpen}
        onOk={() => toggleModal(EDIT_EXTANDCOMMSERVICE_MODAL)}
        onCancel={() => toggleModal(EDIT_EXTANDCOMMSERVICE_MODAL)}
        destroyOnClose
        footer={[
          <Button
            key="back"
            onClick={() => toggleModal(EDIT_EXTANDCOMMSERVICE_MODAL)}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={this.handleFormSubmit}
            loading={isEditingExtAndCommService}
          >
            Edit
          </Button>,
        ]}
      >
        <Form onSubmit={this.handleFormSubmit}>
          <FormItem {...formItemLayout} label="Title of Activity">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: 'Please input title',
                  whitespace: true,
                },
              ],
              initialValue: extAndCommService.title,
            })(<Input placeholder="Enter title of activity or program" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Type">
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: 'Please input type',
                },
              ],
              initialValue: extAndCommService.type,
            })(
              <Select placeholder="Select type of extension and community service">
                <Option value="Training">Training</Option>
                <Option value="Information Dissemination">
                  Information Dissemination
                </Option>
                <Option value="Workshop">Workshop</Option>
                <Option value="Symposium">Symposium</Option>
                <Option value="Others">Others</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="No. of Hours">
            {getFieldDecorator('hours', {
              rules: [
                {
                  required: true,
                  message: 'Please input number of hours',
                },
              ],
              initialValue: extAndCommService.hours,
            })(<InputNumber min={0} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="No. of Participants">
            {getFieldDecorator('participant', {
              rules: [
                {
                  required: true,
                  message: 'Please input number of participants',
                },
              ],
              initialValue: extAndCommService.participant,
            })(<InputNumber min={0} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Start Date">
            {getFieldDecorator('startDate', {
              rules: [
                {
                  required: true,
                  message: 'Please input start date',
                },
              ],
              initialValue: moment(extAndCommService.startDate),
            })(<DatePicker />)}
          </FormItem>
          <FormItem {...formItemLayout} label="End Date">
            {getFieldDecorator('endDate', {
              rules: [
                {
                  required: true,
                  message: 'Please input end date',
                },
              ],
              initialValue: moment(extAndCommService.endDate),
            })(<DatePicker />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Role">
            {getFieldDecorator('role', {
              rules: [
                {
                  required: true,
                  message: 'Please input role',
                  whitespace: true,
                },
              ],
              initialValue: extAndCommService.role,
            })(
              <Input placeholder="Enter your role in the activity or program" />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Approved Credit Units">
            {getFieldDecorator('creditUnit', {
              rules: [
                {
                  required: true,
                  message: 'Please input approved credit units',
                },
              ],
              initialValue: extAndCommService.creditUnit,
            })(<InputNumber min={0} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(EditExtAndCommServiceModal);
