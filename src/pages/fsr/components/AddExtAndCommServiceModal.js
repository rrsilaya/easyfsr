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
import { ADD_EXTANDCOMMSERVICE_MODAL } from '../duck';
import { getFieldValues } from '../../../utils';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;

class AddExtAndCommServiceModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const fieldValues = getFieldValues(values);
        fieldValues.startDate = moment(fieldValues.startDate).format(
          'YYYY-MM-DD',
        );
        fieldValues.endDate = moment(fieldValues.endDate).format('YYYY-MM-DD');

        this.props.addExtAndCommService({ ...fieldValues, id: this.props.id });
      }
    });
  };

  disabledStartDate = startDate => {
    const endDate = this.props.form.getFieldValue('endDate');
    if (!startDate || !endDate) {
      return false;
    }

    return startDate.valueOf() > endDate.valueOf();
  };

  disabledEndDate = endDate => {
    const startDate = this.props.form.getFieldValue('startDate');
    if (!endDate || !startDate) {
      return false;
    }

    return endDate.valueOf() <= startDate.valueOf();
  };

  render() {
    const {
      isAddExtAndCommServiceModalOpen,
      isAddingExtAndCommService,

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
        title="Add Extension and Community Service"
        visible={isAddExtAndCommServiceModalOpen}
        onOk={() => toggleModal(ADD_EXTANDCOMMSERVICE_MODAL)}
        onCancel={() => toggleModal(ADD_EXTANDCOMMSERVICE_MODAL)}
        destroyOnClose
        footer={[
          <Button
            key="back"
            onClick={() => toggleModal(ADD_EXTANDCOMMSERVICE_MODAL)}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={this.handleFormSubmit}
            loading={isAddingExtAndCommService}
          >
            Add
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
            })(<DatePicker disabledDate={this.disabledStartDate} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="End Date">
            {getFieldDecorator('endDate', {
              rules: [
                {
                  required: true,
                  message: 'Please input end date',
                },
              ],
            })(<DatePicker disabledDate={this.disabledEndDate} />)}
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
            })(<InputNumber min={0} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddExtAndCommServiceModal);
