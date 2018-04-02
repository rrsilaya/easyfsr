import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { ADD_ADMINWORK } from '../duck';

const FormItem = Form.Item;

class AddAdminWorkModal extends Component {
  handleAfterClose = () => {
    this.props.form.resetFields();
  };

  handleCancel = () => {
    this.props.toggleModal(ADD_ADMINWORK);
    this.handleAfterClose();
  };

  render() {
    const {
      isAddAdminWorkModalOpen,

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
        title="Add Administrative Work"
        visible={isAddAdminWorkModalOpen}
        onOk={() => toggleModal(ADD_ADMINWORK)}
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
          <FormItem {...formItemLayout} label="Position">
            {getFieldDecorator('position', {
              rules: [
                {
                  required: true,
                  message: 'Please input position',
                  whitespace: true,
                },
              ],
            })(
              <Input placeholder="Enter position or nature of administrative work" />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Office/Unit">
            {getFieldDecorator('officeUnit', {
              rules: [
                {
                  required: true,
                  message: 'Please input office or unit',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter office or unit" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Approved Credit Units">
            {getFieldDecorator('approvedUnits', {
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

export default Form.create()(AddAdminWorkModal);
