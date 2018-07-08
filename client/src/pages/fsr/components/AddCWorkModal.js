import React, { Component } from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Icon,
  InputNumber,
} from 'antd';
import { ADD_CWORK_MODAL } from '../duck';
import { getFieldValues } from '../../../utils';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;

class AddCWorkModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const fieldValues = getFieldValues(values);
        fieldValues.date = moment(fieldValues.date).format('YYYY-MM-DD');
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

        this.props.addCreativeWork(data);
      }
    });
  };

  render() {
    const {
      isAddCWorkModalOpen,
      isAddingCWork,

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
        title="Add Creative Work"
        visible={isAddCWorkModalOpen}
        onOk={() => toggleModal(ADD_CWORK_MODAL)}
        onCancel={() => toggleModal(ADD_CWORK_MODAL)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(ADD_CWORK_MODAL)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={this.handleFormSubmit}
            loading={isAddingCWork}
          >
            Add
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
            })(
              <Input placeholder="Enter complete title, place and publication" />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Type">
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: 'Please input Type',
                },
              ],
            })(
              <Select placeholder="Select type of creative work">
                <Option value="Oral/Poster">
                  Oral/Poster Papers Presented in Conferences
                </Option>
                <Option value="PublishedPapers">
                  Papers Published in Proceedings or Conferences
                </Option>
                <Option value="Monographs">Monographs</Option>
                <Option value="Article">Articles in Refereed Journals</Option>
                <Option value="ChapterInABook">Chapters In A Book</Option>
                <Option value="Books">Books</Option>
                <Option value="Others">Others</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Co-Authors">
            {getFieldDecorator('coAuthor', {
              rules: [
                {
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter name of co-authors" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Date of Publication">
            {getFieldDecorator('date', {
              rules: [
                {
                  required: true,
                  message: 'Please input date of publication',
                },
              ],
            })(<DatePicker />)}
          </FormItem>
          <FormItem {...formItemLayout} label="File">
            {getFieldDecorator('filepath')(
              <Upload>
                <Button>
                  <Icon type="upload" /> Upload File
                </Button>
              </Upload>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Approved Credit Units">
            {getFieldDecorator('credUnit', {
              rules: [
                {
                  required: true,
                  message: 'Please input approved credit units',
                },
              ],
            })(<InputNumber min={0} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddCWorkModal);
