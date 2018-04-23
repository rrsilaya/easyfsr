import React, { Component } from 'react';
import { Form, Select, DatePicker, Button, Card } from 'antd';
import { getFieldValues } from '../../../utils';
import moment from 'moment';

import styles from '../styles';

const FormItem = Form.Item;
const { Option } = Select;

class LimitedPracticeForm extends Component {
  componentDidMount() {
    this.props.getLtdPractOfProfs({ id: this.props.fsrID });
  }

  handleFormSubmit = e => {
    e.preventDefault();

    if (this.props.userID === this.props.fsr.fsr.userID) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const fieldValues = getFieldValues(values);
          fieldValues.date =
            fieldValues.date !== null
              ? moment(fieldValues.date).format('YYYY-MM-DD')
              : null;

          this.props.editLtdPractOfProf(this.props.fsrID, {
            ...fieldValues,
            id: this.props.fsrID,
          });
        }
      });
    } else {
      this.props.nextStep();
    }
  };

  render() {
    const {
      userID,
      fsr,
      ltdPractOfProf,
      isGettingLtdPractOfProf,
      isEditingLtdPractOfProf,
      prevStep,
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
      <Card
        title="Limited Practice of Profession"
        style={styles.formFSR}
        loading={isGettingLtdPractOfProf}
      >
        <Form onSubmit={this.handleFormSubmit}>
          <FormItem {...formItemLayout} label="Applied for official permission">
            {getFieldDecorator('askedPermission', {
              rules: [
                {
                  required: true,
                  message:
                    'Please select if you have applied for official permission',
                },
              ],
              initialValue: ltdPractOfProf.askedPermission,
            })(
              <Select
                placeholder="Select if Yes or No"
                disabled={userID === fsr.fsr.userID ? false : true}
              >
                <Option value="YES">Yes</Option>
                <Option value="NO">No</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Date">
            {getFieldDecorator('date', {
              initialValue:
                ltdPractOfProf.date !== null
                  ? moment(ltdPractOfProf.date)
                  : null,
            })(
              <DatePicker
                disabled={userID === fsr.fsr.userID ? false : true}
              />,
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
            <Button
              type="primary"
              onClick={this.handleFormSubmit}
              loading={isEditingLtdPractOfProf}
            >
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
