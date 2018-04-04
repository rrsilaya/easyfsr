import React, { Component } from 'react';
import { Form, Checkbox, Button, Card } from 'antd';

import styles from '../styles';

const FormItem = Form.Item;

class CertificationForm extends Component {
  render() {
    const { nextStep, prevStep } = this.props;

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
        <Form>
          <FormItem {...tailFormItemLayout}>
            {getFieldDecorator('certification', {
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
            <Button type="primary" onClick={nextStep}>
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
