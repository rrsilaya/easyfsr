import React, { Component } from 'react';
import { Modal, Button, Input, Form } from 'antd';
import { getFieldValues } from '../../../utils';
import styles from '../styles';

import { CREATE_ANNOUNCEMENT } from '../duck';

const FormItem = Form.Item;
const { TextArea } = Input;

class CreateAnnouncementModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.addAnnouncement(getFieldValues(values));
      }
    });
  };
  render() {
    const {
      isCreateAnnouncementModalOpen,

      isAddingAnnouncement,
      toggleModal,

      form,
    } = this.props;

    return (
      <Modal
        title="Create Announcement"
        visible={isCreateAnnouncementModalOpen}
        onOk={() => toggleModal(CREATE_ANNOUNCEMENT)}
        onCancel={() => toggleModal(CREATE_ANNOUNCEMENT)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(CREATE_ANNOUNCEMENT)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={this.handleFormSubmit}
            loading={isAddingAnnouncement}
          >
            Create
          </Button>,
        ]}
      >
        <Form>
          <FormItem label="Announcement Title" required>
            {form.getFieldDecorator('title@@addAnnouncement', {
              rules: [
                {
                  required: true,
                  message: 'Please input announcement title',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter title here.." />)}
          </FormItem>
          <FormItem label="Announcement Body" required>
            {form.getFieldDecorator('body@@addAnnouncement', {
              rules: [
                {
                  required: true,
                  message: 'Please input announcement',
                  whitespace: true,
                },
              ],
            })(
              <TextArea
                rows={5}
                placeholder="Enter announcement here..."
                style={styles.messageBox}
              />,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(CreateAnnouncementModal);
