import React, { Component } from 'react';
import { Form, Input, Select, Table, Button, Card } from 'antd';
import { COURSE } from '../duck';

import AddCourseModal from './AddCourseModal';

import styles from '../styles';

const FormItem = Form.Item;
const { Option } = Select;

const columns = [
  {
    title: 'Course Number',
    dataIndex: 'courseNumber',
    key: 'courseNumber',
    align: 'center',
  },
  {
    title: 'Course Credit',
    dataIndex: 'credit',
    key: 'credit',
    align: 'center',
  },
  {
    title: 'Days',
    dataIndex: 'day',
    key: 'day',
    align: 'center',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    align: 'center',
  },
  {
    title: 'School',
    dataIndex: 'school',
    key: 'school',
    align: 'center',
  },
];

class StudyLoadForm extends Component {
  render() {
    const {
      isAddCourseModalOpen,
      toggleModal,
      nextStep,
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
      <Card title="Study Load" style={styles.formFSR}>
        <Form>
          <FormItem {...formItemLayout} label="Degree">
            {getFieldDecorator('degree', {
              rules: [
                {
                  required: true,
                  message: 'Please input degree enrolled in',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter degree program" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="University">
            {getFieldDecorator('university', {
              rules: [
                {
                  required: true,
                  message: 'Please input university enrolled in',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="Enter name of university" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="On full study leave with pay">
            {getFieldDecorator('studyLeave', {
              rules: [
                {
                  required: true,
                  message: 'Please select if on study leave with pay',
                },
              ],
            })(
              <Select placeholder="Select if Yes or No">
                <Option value="YES">Yes</Option>
                <Option value="NO">No</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Recipient of faculty fellowship">
            {getFieldDecorator('facultyFellowship', {
              rules: [
                {
                  required: true,
                  message: 'Please select if recipient of faculty fellowship',
                },
              ],
            })(
              <Select placeholder="Select if Yes or No">
                <Option value="YES">Yes</Option>
                <Option value="NO">No</Option>
              </Select>,
            )}
          </FormItem>
          <AddCourseModal
            isAddCourseModalOpen={isAddCourseModalOpen}
            toggleModal={toggleModal}
            handleAfterClose={this.handleAfterClose}
          />
          <div style={styles.button}>
            <Button
              icon="plus-circle-o"
              type="primary"
              onClick={() => toggleModal(COURSE)}
            >
              Add Course
            </Button>
          </div>
          <Table columns={columns} />
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

const WrappedStudyLoadForm = Form.create()(StudyLoadForm);

export default WrappedStudyLoadForm;
