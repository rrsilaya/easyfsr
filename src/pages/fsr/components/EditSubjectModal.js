import React, { Component } from 'react';
import { Modal, Button, Form, Input, InputNumber } from 'antd';
import { EDIT_SUBJECT_MODAL } from '../duck';
import { getFieldValues } from '../../../utils';

const FormItem = Form.Item;

class EditSubjectModal extends Component {
  //   componentDidMount(){
  //       console.log(this.props.subject.subjectID);
  //       this.props.getTimeslots({ subjectID: this.props.subject.subjectID });
  //   }

  handleFormSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const fieldValues = getFieldValues(values);
        this.props.editSubject(this.props.subject.subjectID, {
          ...fieldValues,
          id: this.props.id,
        });
      }
    });
  };

  render() {
    const {
      isEditSubjectModalOpen,
      isEditingSubject,
      subject,

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
        title="Edit Subject"
        visible={isEditSubjectModalOpen}
        onOk={() => toggleModal(EDIT_SUBJECT_MODAL)}
        onCancel={() => toggleModal(EDIT_SUBJECT_MODAL)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(EDIT_SUBJECT_MODAL)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={this.handleFormSubmit}
            loading={isEditingSubject}
          >
            Edit
          </Button>,
        ]}
      >
        <Form onSubmit={this.handleFormSubmit}>
          <FormItem {...formItemLayout} label="Subject">
            {getFieldDecorator('subjectCode', {
              rules: [
                {
                  required: true,
                  message: 'Please input Subject Code',
                  whitespace: true,
                },
              ],
              initialValue: subject.subjectCode,
            })(<Input placeholder="Enter subject code" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Section Code">
            {getFieldDecorator('sectionCode', {
              rules: [
                {
                  required: true,
                  message: 'Please input Section Code',
                  whitespace: true,
                },
              ],
              initialValue: subject.sectionCode,
            })(<Input placeholder="Enter section code" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Room">
            {getFieldDecorator('room', {
              rules: [
                {
                  required: true,
                  message: 'Please input room',
                  whitespace: true,
                },
              ],
              initialValue: subject.room,
            })(<Input placeholder="Enter name of room" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="No of Students">
            {getFieldDecorator('noOfStudents', {
              rules: [
                {
                  required: true,
                  message: 'Please input total number of students',
                },
              ],
              initialValue: subject.noOfStudents,
            })(<InputNumber min={0} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Course Credits">
            {getFieldDecorator('teachingLoadCreds', {
              rules: [
                {
                  required: true,
                  message: 'Please input course credits',
                },
              ],
              initialValue: subject.teachingLoadCreds,
            })(<InputNumber min={0} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(EditSubjectModal);
