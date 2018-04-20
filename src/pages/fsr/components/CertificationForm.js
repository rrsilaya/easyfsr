import React, { Component } from 'react';
import { Form, Checkbox, Button, Card } from 'antd';

import styles from '../styles';

const FormItem = Form.Item;

class CertificationForm extends Component {
  handleFormSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.pushLink(`/records`);
      }
    });
  };

  render() {
    const { prevStep } = this.props;

    const { getFieldDecorator } = this.props.form;

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    };

    return (
      <Card title="Certification" style={styles.formFSR}>
        <Form onSubmit={this.handleFormSubmit}>
          <FormItem {...tailFormItemLayout}>
            {getFieldDecorator('certification', {
              rules: [
                {
                  required: true,
                  message:
                    'Please mark the checkbox to certify all information',
                },
              ],
              valuePropName: 'checked',
            })(
              <Checkbox>
                The faculty member certifies that all information provided are
                correct as of date of submission.
              </Checkbox>,
            )}
          </FormItem>
          <div style={styles.button}>
            <Button
              type="primary"
              onClick={prevStep}
              style={{ marginRight: 15 }}
            >
              Previous
            </Button>
            <Button type="primary" onClick={this.handleFormSubmit}>
              Finish
            </Button>
          </div>
        </Form>
      </Card>
    );
  }
}

const WrappedCertificationForm = Form.create()(CertificationForm);

export default WrappedCertificationForm;
