import React, { Component } from 'react';
import { Modal, Button, Form, Input, Select, DatePicker } from 'antd';
import { getFieldValues } from '../../../utils';
import { SETTINGS } from '../duck';
import styles from '../styles';

const FormItem = Form.Item;
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';

class SettingsModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        this.props.addMetaData(getFieldValues(values));
      }
    });
  };

  handleDateChange = date => {};

  render() {
    const {
      isSettingsModalOpen,

      isUpdatingMeta,
      toggleModal,

      form,
    } = this.props;

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
        title="Settings"
        visible={isSettingsModalOpen}
        onOk={() => toggleModal(SETTINGS)}
        onCancel={() => toggleModal(SETTINGS)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(SETTINGS)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={this.handleFormSubmit}
            loading={isUpdatingMeta}
          >
            Yes
          </Button>,
        ]}
      >
        <Form>
          <FormItem {...formItemLayout} label="Academic Year" required>
            {form.getFieldDecorator('acadYear@@addMeta', {
              rules: [
                {
                  required: true,
                  message: 'Please input academic year',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter Academic Year here..." />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Semester" required>
            {form.getFieldDecorator('semester@@addMeta', {
              rules: [
                {
                  required: true,
                  message: 'Please input semester',
                  whitespace: true,
                },
              ],
            })(
              <Select placeholder="Select Semester">
                <Option value="First">1st</Option>
                <Option value="Second">2nd</Option>
                <Option value="Midyear">Midyear</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="University Registrar" required>
            {form.getFieldDecorator('universityRegistrar@@addMeta', {
              rules: [
                {
                  required: true,
                  message: 'Please input University Registrar',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter University Registrar here..." />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Home Department" required>
            {form.getFieldDecorator('homeDepartment@@addMeta', {
              rules: [
                {
                  required: true,
                  message: 'Please input Home Department',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter Home Department here..." />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Date of Form Revision" required>
            {form.getFieldDecorator('date', {
              rules: [
                {
                  required: true,
                  message: 'Please input Date of Revision',
                },
              ],
            })(
              <DatePicker
                style={styles.datePicker}
                format={dateFormat}
                placeholder={'Enter date here'}
              />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Home College" required>
            {form.getFieldDecorator('homeCollege@@addMeta', {
              rules: [
                {
                  required: true,
                  message: 'Please input Home College',
                  whitespace: true,
                },
              ],
            })(
              <Select placeholder="Select College">
                <Option value="CAFS">CAFS</Option>
                <Option value="CAS">CAS</Option>
                <Option value="CDC">CDC</Option>
                <Option value="CEAT">CEAT</Option>
                <Option value="CEM">CEM</Option>
                <Option value="CFNR">CFNR</Option>
                <Option value="CHE">CHE</Option>
                <Option value="CPA">CPA</Option>
                <Option value="CVM">CVM</Option>
                <Option value="SESAM">SESAM</Option>
                <Option value="GS">GS</Option>
              </Select>,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(SettingsModal);
