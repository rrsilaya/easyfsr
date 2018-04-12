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
} from 'antd';
import { CWORK } from '../duck';

const FormItem = Form.Item;
const { Option } = Select;

class AddCWorkModal extends Component {
  render() {
    const {
      isAddCWorkModalOpen,

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
        onOk={() => toggleModal(CWORK)}
        onCancel={() => toggleModal(CWORK)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(CWORK)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" htmlType="submit">
            Add
          </Button>,
        ]}
      >
        <Form>
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
            {getFieldDecorator('cworkCoAuthor', {
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
            {getFieldDecorator('cworkFile', {
              rules: [
                {
                  required: true,
                  message: 'Please attach creative work file',
                },
              ],
            })(
              <Upload>
                <Button>
                  <Icon type="upload" /> Upload File
                </Button>
              </Upload>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Approved Credit Units">
            {getFieldDecorator('creditUnit', {
              rules: [
                {
                  required: true,
                  message: 'Please input approved credit units',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter approved credit units" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddCWorkModal);
