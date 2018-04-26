import React, { Component } from 'react';
import { Modal, Button, Input, Select, Form } from 'antd';
import { SEND_NOTIFICATION_FS } from '../duck';
import styles from '../styles';
import { getFieldValues } from '../../../utils';

// const { Search } = Input;
const { TextArea } = Input;
const { Option } = Select;
const FormItem = Form.Item;

class SendNotificationFSModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = getFieldValues(values);
        formData.receiverID = this.props.user.userID;
        this.props.addNotification(formData);
        this.props.toggleModal(SEND_NOTIFICATION_FS);
      }
    });
  };

  render() {
    const {
      isSendNotificationFSModalOpen,
      //   searchedUsers,

      isAddingNotification,

      toggleModal,
      user,
      form,
    } = this.props;

    return (
      <Modal
        title="Send Notification"
        visible={isSendNotificationFSModalOpen}
        onOk={() => toggleModal(SEND_NOTIFICATION_FS)}
        onCancel={() => toggleModal(SEND_NOTIFICATION_FS)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(SEND_NOTIFICATION_FS)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={this.handleFormSubmit}
            loading={isAddingNotification}
          >
            Send
          </Button>,
        ]}
      >
        <Form onSubmit={this.handleFormSubmit}>
          <FormItem required>
            <Input value={`${user.firstName} ${user.lastName}`} disabled />
          </FormItem>
          <FormItem label="Message" required>
            {form.getFieldDecorator('message@@addNotification', {
              rules: [
                {
                  required: true,
                  message: 'Please input message',
                  whitespace: true,
                },
              ],
            })(
              <TextArea
                rows={5}
                placeholder="Enter message here..."
                style={styles.messageBox}
              />,
            )}
          </FormItem>
          <FormItem label="Priority">
            {form.getFieldDecorator('priority@@addNotification', {
              initialValue: 'Normal',
              rules: [
                {
                  required: true,
                  message: 'Please select level of priority',
                },
              ],
            })(
              <Select placeholder="Select Priority Level">
                <Option value="High">High</Option>
                <Option value="Normal">Normal</Option>
                <Option value="Low">Low</Option>
              </Select>,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(SendNotificationFSModal);
