import React, { Component } from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  InputNumber,
  Icon,
} from 'antd';
import { EDIT_RESEARCH_MODAL } from '../duck';
import { getFieldValues } from '../../../utils';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;

class EditResearchModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const fieldValues = getFieldValues(values);
        fieldValues.startDate = moment(fieldValues.startDate).format(
          'YYYY-MM-DD',
        );
        fieldValues.endDate =
          fieldValues.endDate !== null
            ? moment(fieldValues.endDate).format('YYYY-MM-DD')
            : null;
        fieldValues.filepath =
          fieldValues.filepath !== undefined
            ? fieldValues.filepath.file.originFileObj
            : undefined;

        const data = new FormData();
        Object.keys(fieldValues).forEach(key => {
          if (fieldValues[key] !== undefined)
            data.append(key, fieldValues[key]);
        });
        data.append('id', this.props.id);

        this.props.editResearch(this.props.research.researchID, data);
      }
    });
  };

  render() {
    const {
      isEditResearchModalOpen,
      isEditingResearch,
      research,

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
        title="Edit Research"
        visible={isEditResearchModalOpen}
        onOk={() => toggleModal(EDIT_RESEARCH_MODAL)}
        onCancel={() => toggleModal(EDIT_RESEARCH_MODAL)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(EDIT_RESEARCH_MODAL)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={this.handleFormSubmit}
            loading={isEditingResearch}
          >
            Edit
          </Button>,
        ]}
      >
        <Form onSubmit={this.handleFormSubmit}>
          <FormItem {...formItemLayout} label="Title">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: 'Please input Title',
                  whitespace: true,
                },
              ],
              initialValue: research.title,
            })(<Input placeholder="Enter complete title of research" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Type">
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: 'Please input Type',
                },
              ],
              initialValue: research.type,
            })(
              <Select placeholder="Select type of research">
                <Option value="Proposal">Proposal</Option>
                <Option value="Implementation">Implementation</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Role">
            {getFieldDecorator('role', {
              rules: [
                {
                  required: true,
                  message: 'Please input role',
                  whitespace: true,
                },
              ],
              initialValue: research.role,
            })(<Input placeholder="Enter your role" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Co-Workers">
            {getFieldDecorator('coAuthor', {
              rules: [
                {
                  whitespace: true,
                },
              ],
              initialValue: research.coAuthor,
            })(<Input placeholder="Enter name of co-workers" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Start Date">
            {getFieldDecorator('startDate', {
              rules: [
                {
                  required: true,
                  message: 'Please input start date',
                },
              ],
              initialValue: moment(research.startDate),
            })(<DatePicker />)}
          </FormItem>
          <FormItem {...formItemLayout} label="End Date">
            {getFieldDecorator('endDate', {
              initialValue:
                research.endDate !== null ? moment(research.endDate) : null,
            })(<DatePicker />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Funding">
            {getFieldDecorator('funding', {
              initialValue: research.funding,
            })(<Input placeholder="Enter funding" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="File">
            {getFieldDecorator('filepath', {
              initialValue: research.filepath,
            })(
              <Upload>
                <Button>
                  <Icon type="upload" /> Upload File
                </Button>
              </Upload>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Approved Credit Units">
            {getFieldDecorator('approvedUnits', {
              rules: [
                {
                  required: true,
                  message: 'Please input approved credit units',
                },
              ],
              initialValue: research.approvedUnits,
            })(<InputNumber min={0} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(EditResearchModal);
