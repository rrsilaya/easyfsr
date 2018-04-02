import React, { Component } from 'react';
import { Form, Select, DatePicker, Button, Card } from 'antd';

import styles from '../styles';

const FormItem = Form.Item;
const { Option } = Select;

class LimitedPracticeForm extends Component {
  render() {
    const { nextStep, prevStep } = this.props;

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
      <Card title="Limited Practice of Profession" style={styles.formFSR}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Applied for official permission">
            {getFieldDecorator('askedPermission', {
              rules: [
                {
                  required: true,
                  message:
                    'Please select if you have applied for official permission',
                },
              ],
            })(
              <Select placeholder="Select if Yes or No">
                <Option value="YES">Yes</Option>
                <Option value="NO">No</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Date">
            {getFieldDecorator('date')(<DatePicker />)}
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
              Next
            </Button>
          </div>
        </Form>
      </Card>
    );
  }
}

const WrappedLimitedPracticeForm = Form.create()(LimitedPracticeForm);

export default WrappedLimitedPracticeForm;
