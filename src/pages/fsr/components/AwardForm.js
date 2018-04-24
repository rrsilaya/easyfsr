import React, { Component } from 'react';
import {
  Form,
  Select,
  Input,
  DatePicker,
  Button,
  Card,
  Upload,
  Icon,
} from 'antd';
import { getFieldValues } from '../../../utils';
import moment from 'moment';

import styles from '../styles';

const FormItem = Form.Item;
const { Option } = Select;

class AwardForm extends Component {
  componentDidMount() {
    this.props.getAwards({ id: this.props.fsrID });
  }

  handleFormSubmit = e => {
    e.preventDefault();

    if (this.props.userID === this.props.fsr.fsr.userID) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const fieldValues = getFieldValues(values);
          fieldValues.approvedStartDate = fieldValues.approvedStartDate
            ? moment(fieldValues.approvedStartDate).format('YYYY-MM-DD')
            : fieldValues.approvedStartDate;
          fieldValues.endDate = fieldValues.endDate
            ? moment(fieldValues.endDate).format('YYYY-MM-DD')
            : fieldValues.endDate;
          fieldValues.filepath =
            fieldValues.filepath !== undefined
              ? fieldValues.filepath.file.originFileObj
              : undefined;

          const data = new FormData();
          Object.keys(fieldValues).forEach(key => {
            if (fieldValues[key] !== undefined)
              data.append(key, fieldValues[key]);
          });
          data.append('id', this.props.fsrID);

          this.props.editAward(this.props.award.awardID, data);
        }
      });
    } else {
      this.props.nextStep();
    }
  };

  disabledStartDate = approvedStartDate => {
    const endDate = this.props.form.getFieldValue('endDate');
    if (!approvedStartDate || !endDate) {
      return false;
    }

    return approvedStartDate.valueOf() > endDate.valueOf();
  };

  disabledEndDate = endDate => {
    const approvedStartDate = this.props.form.getFieldValue(
      'approvedStartDate',
    );
    if (!endDate || !approvedStartDate) {
      return false;
    }

    return endDate.valueOf() <= approvedStartDate.valueOf();
  };

  render() {
    const {
      userID,
      fsr,
      award,
      isGettingAward,
      isEditingAward,
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
        title="Professorial Chair or Faculty Grant Recipient or Nominee"
        style={styles.formFSR}
        loading={isGettingAward}
      >
        <Form onSubmit={this.handleFormSubmit}>
          <FormItem {...formItemLayout} label="Status">
            {getFieldDecorator('recipientOrNominee', {
              rules: [
                {
                  required: true,
                  message: 'Please select if recipient or nominee',
                },
              ],
              initialValue: award.recipientOrNominee,
            })(
              <Select
                placeholder="Select if Recipient or Nominee"
                disabled={userID === fsr.fsr.userID ? false : true}
              >
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
              initialValue: award.collegeHasNominated,
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
          <FormItem {...formItemLayout} label="Professorial Chair">
            {getFieldDecorator('professionalChair', {
              rules: [
                {
                  required: true,
                  message: 'Please input professorial chair',
                  whitespace: true,
                },
              ],
              initialValue: award.professionalChair,
            })(
              <Input
                placeholder="Enter professorial chair"
                disabled={userID === fsr.fsr.userID ? false : true}
              />,
            )}
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
              initialValue: award.grantF,
            })(
              <Input
                placeholder="Enter name of grant"
                disabled={userID === fsr.fsr.userID ? false : true}
              />,
            )}
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
              initialValue: award.chairGrantTitle,
            })(
              <Input
                placeholder="Enter title of chair or grant"
                disabled={userID === fsr.fsr.userID ? false : true}
              />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Approved Start Date">
            {getFieldDecorator('approvedStartDate', {
              initialValue: award.approvedStartDate
                ? moment(award.approvedStartDate)
                : null,
            })(
              <DatePicker
                disabledDate={this.disabledStartDate}
                disabled={userID === fsr.fsr.userID ? false : true}
              />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="End Date">
            {getFieldDecorator('endDate', {
              initialValue: award.endDate ? moment(award.endDate) : null,
            })(
              <DatePicker
                disabledDate={this.disabledEndDate}
                disabled={userID === fsr.fsr.userID ? false : true}
              />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="File">
            {getFieldDecorator('filepath')(
              <Upload>
                <Button disabled={userID === fsr.fsr.userID ? false : true}>
                  <Icon type="upload" /> Upload File
                </Button>
                {award.filepath ? award.filepath.split('/')[3] : ''}
              </Upload>,
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
              loading={isEditingAward}
            >
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
