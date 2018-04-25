import React, { Component } from 'react';
import { Modal, Form, Button, Input } from 'antd';
import { CERTIFICATION } from '../duck';

import styles from '../styles';

const FormItem = Form.Item;

class CertificationModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.toggleTurningIn(this.props.fsr.fsr.id, {
          isTurnedIn: !this.props.fsr.fsr.isTurnedIn,
        });

        this.props.pushLink(`/records`);
      }
    });
  };

  validateMessage = async (rule, value, callback) => {
    if (
      !value.match(
        /^I certify that all information provided are correct as of date of submission\.$/,
      )
    )
      return callback('Please enter the correct message');
  };

  render() {
    const { toggleModal, isTurningIn, isCertificationModalOpen } = this.props;

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
        title="Turn In FSR"
        visible={isCertificationModalOpen}
        onOk={() => toggleModal(CERTIFICATION)}
        onCancel={() => toggleModal(CERTIFICATION)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(CERTIFICATION)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={this.handleFormSubmit}
            loading={isTurningIn}
          >
            Yes
          </Button>,
        ]}
      >
        <p>Are you sure you want to turn in this FSR?</p>
        <p> Please type in the message below to confirm. </p>
        <p style={styles.confirmation}>
          {' '}
          I certify that all information provided are correct as of date of
          submission.{' '}
        </p>
        <Form onSubmit={this.handleFormSubmit}>
          <FormItem {...formItemLayout} required hasFeedback>
            {getFieldDecorator('confirmation@@turnInFSR', {
              rules: [
                {
                  validator: this.validateMessage,
                },
              ],
            })(<Input type="text" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(CertificationModal);
