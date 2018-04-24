import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  Input,
  Select,
  Table,
  Button,
  Card,
  Tooltip,
  Icon,
  Modal,
} from 'antd';
import { COURSE, ADD_COURSE_MODAL, EDIT_COURSE_MODAL } from '../duck';
import { getFieldValues } from '../../../utils';

import AddCourseModal from './AddCourseModal';
import EditCourseModal from './EditCourseModal';

import styles from '../styles';

const { confirm } = Modal;

const FormItem = Form.Item;
const { Option } = Select;

class StudyLoadForm extends Component {
  componentDidMount() {
    this.props.getStudyLoad(this.props.fsrID);
    this.props.getCourses({ id: this.props.fsrID });
  }

  handleFormSubmit = e => {
    e.preventDefault();

    if (this.props.userID === this.props.fsr.fsr.userID) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const fieldValues = getFieldValues(values);

          this.props.editStudyLoad(this.props.fsrID, fieldValues);
        }
      });
    } else {
      this.props.nextStep();
    }
  };

  columns = [
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
      title: 'Hours Per Week',
      dataIndex: 'hoursPerWeek',
      key: 'hoursPerWeek',
      align: 'center',
    },
    {
      title: 'School',
      dataIndex: 'school',
      key: 'school',
      align: 'center',
    },
    {
      render: (text, record) => (
        <div style={styles.icons}>
          <Link
            to="#"
            disabled={
              this.props.userID === this.props.fsr.fsr.userID ? false : true
            }
          >
            <Tooltip title="Delete Course" arrowPointAtCenter>
              <Icon
                type="delete"
                className="text secondary"
                onClick={() => this.handleDeleteCourseConfirmation(record)}
              />
            </Tooltip>
          </Link>
          <Link
            to="#"
            disabled={
              this.props.userID === this.props.fsr.fsr.userID ? false : true
            }
          >
            <Tooltip title="Edit Course" arrowPointAtCenter>
              <Icon
                type="edit"
                className="text secondary"
                style={{ marginLeft: 10 }}
                onClick={() => this.handleToggleEditCourse(record)}
              />
            </Tooltip>
          </Link>
        </div>
      ),
    },
  ];

  handleToggleEditCourse = course => {
    this.props.changeSelected({ entity: COURSE, data: course });
    this.props.toggleModal(EDIT_COURSE_MODAL);
  };

  handleDeleteCourseConfirmation = ({ courseID }) => {
    confirm({
      title: 'Are you sure you want to delete this course?',
      okType: 'danger',
      onOk: () => {
        this.props.deleteCreativeWork(courseID);
      },
      onCancel() {},
    });
  };

  render() {
    const {
      userID,
      fsr,
      fsrID,
      studyLoad,
      courses,
      course,
      courseScheds,
      addCourse,
      editCourse,
      getCourseScheds,
      isGettingStudyLoad,
      isEditingStudyLoad,
      isGettingCourses,
      isAddingCourse,
      isEditingCourse,
      isAddingCourseSched,
      isAddCourseModalOpen,
      isEditCourseModalOpen,
      toggleModal,
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
        title="Study Load"
        style={styles.formFSR}
        loading={isGettingStudyLoad}
      >
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
              initialValue: studyLoad.degree,
            })(
              <Input
                placeholder="Enter degree program"
                disabled={userID === fsr.fsr.userID ? false : true}
              />,
            )}
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
              initialValue: studyLoad.university,
            })(
              <Input
                placeholder="Enter name of university"
                disabled={userID === fsr.fsr.userID ? false : true}
              />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="On full study leave with pay">
            {getFieldDecorator('fullLeaveWithPay', {
              rules: [
                {
                  required: true,
                  message: 'Please select if on study leave with pay',
                },
              ],
              initialValue: studyLoad.fullLeaveWithPay,
            })(
              <Select
                placeholder="Select if Yes or No"
                disabled={userID === fsr.fsr.userID ? false : true}
              >
                <Option value={1}>Yes</Option>
                <Option value={0}>No</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Recipient of faculty fellowship">
            {getFieldDecorator('fellowshipRecipient', {
              rules: [
                {
                  required: true,
                  message: 'Please select if recipient of faculty fellowship',
                },
              ],
              initialValue: studyLoad.fellowshipRecipient,
            })(
              <Select
                placeholder="Select if Yes or No"
                disabled={userID === fsr.fsr.userID ? false : true}
              >
                <Option value={1}>Yes</Option>
                <Option value={0}>No</Option>
              </Select>,
            )}
          </FormItem>
          <AddCourseModal
            id={fsrID}
            addCourse={addCourse}
            isAddingCourse={isAddingCourse}
            isAddingCourseSched={isAddingCourseSched}
            isAddCourseModalOpen={isAddCourseModalOpen}
            toggleModal={toggleModal}
          />
          <EditCourseModal
            id={fsrID}
            course={course}
            courseScheds={courseScheds}
            editCourse={editCourse}
            getCourseScheds={getCourseScheds}
            isEditingCourse={isEditingCourse}
            isEditCourseModalOpen={isEditCourseModalOpen}
            toggleModal={toggleModal}
          />
          <div style={styles.button}>
            <Button
              icon="plus-circle-o"
              type="primary"
              onClick={() => toggleModal(ADD_COURSE_MODAL)}
              disabled={userID === fsr.fsr.userID ? false : true}
            >
              Add Course
            </Button>
          </div>
          <Table
            columns={this.columns}
            dataSource={courses}
            loading={isGettingCourses}
          />
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
              htmlType="submit"
              onClick={this.handleFormSubmit}
              loading={isEditingStudyLoad}
            >
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
