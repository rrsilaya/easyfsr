import React, { Component } from 'react';
import { Form, Select, Input, DatePicker, Button, Card } from 'antd';

import styles from '../styles';

const FormItem = Form.Item;
const { Option } = Select;

class AwardForm extends Component {
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
      <Card
        title="Professional Chair or Faculty Grant Recipient or Nominee"
        style={styles.formFSR}
      >
        <Form>
          <FormItem {...formItemLayout} label="Status">
            {getFieldDecorator('recipientOrNominee', {
              rules: [
                {
                  required: true,
                  message: 'Please select if recipient or nominee',
                },
              ],
            })(
              <Select placeholder="Select if Recipient or Nominee">
                <Option value="RECIPIENT">Recipient</Option>
                <Option value="NOMINEE">Nominee</Option>
                <Option value="N/A">N/A</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Already Nominated">
            {getFieldDecorator('collegeHasNominated', {
              rules: [
                {
                  required: true,
                  message: 'Please select if college has already nominated',
                },
              ],
            })(
              <Select placeholder="Select if Yes or No">
                <Option value="YES">Yes</Option>
                <Option value="NO">No</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Professional Chair">
            {getFieldDecorator('professionalChair', {
              rules: [
                {
                  required: true,
                  message: 'Please input professional chair',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter professional chair" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Grant">
            {getFieldDecorator('grantF', {
              rules: [
                {
                  required: true,
                  message: 'Please input grant',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter name of grant" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Chair/Grant Title">
            {getFieldDecorator('chairGrantTitle', {
              rules: [
                {
                  required: true,
                  message: 'Please input chair or grant title',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter title of chair or grant" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Approved Start Date">
            {getFieldDecorator('approvedStartDate')(<DatePicker />)}
          </FormItem>
          <FormItem {...formItemLayout} label="End Date">
            {getFieldDecorator('endDate')(<DatePicker />)}
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

const WrappedAwardForm = Form.create()(AwardForm);

export default WrappedAwardForm;
