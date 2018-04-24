import React, { Component } from 'react';
import { Modal, Button, Form, Input, InputNumber } from 'antd';
import { ADD_ADMINWORK_MODAL } from '../duck';
import { getFieldValues } from '../../../utils';

const FormItem = Form.Item;

class AddAdminWorkModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const fieldValues = getFieldValues(values);
        this.props.addAdminWork({ ...fieldValues, id: this.props.id });
      }
    });
  };

  render() {
    const {
      isAddAdminWorkModalOpen,
      isAddingAdminWork,

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
        onOk={() => toggleModal(ADD_ADMINWORK_MODAL)}
        onCancel={() => toggleModal(ADD_ADMINWORK_MODAL)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(ADD_ADMINWORK_MODAL)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={this.handleFormSubmit}
            loading={isAddingAdminWork}
          >
            Add
          </Button>,
        ]}
      >
        <Form onSubmit={this.handleFormSubmit}>
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
                },
              ],
            })(<InputNumber min={0} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddAdminWorkModal);
