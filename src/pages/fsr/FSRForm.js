import { Steps, Row, Col, Button, Modal, notification } from 'antd';
import React, { Component } from 'react';

import TeachingLoadForm from './components/TeachingLoadForm';
import ResearchAndCreativeWorkForm from './components/ResearchAndCreativeWorkForm';
import AdminWorkForm from './components/AdminWorkForm';
import ExtAndCommServiceForm from './components/ExtAndCommServiceForm';
import StudyLoadForm from './components/StudyLoadForm';
import LimitedPracticeForm from './components/LimitedPracticeForm';
import AwardForm from './components/AwardForm';
import ConsultationHoursForm from './components/ConsultationHoursForm';
import CertificationForm from './components/CertificationForm';

import { PageLoader } from '../../global';
import steps from './steps';
import styles from './styles';
import { Link } from 'react-router-dom';
const { Step } = Steps;

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

class FSRForm extends Component {
  componentDidMount() {
    this.props.getFSR(this.props.match.params.fsrID);
  }

  handleTurningInFSR = () => {
    this.props.toggleTurningIn(this.props.fsr.fsr.id, {
      isTurnedIn: !this.props.fsr.fsr.isTurnedIn,
    });
  };

  handleFinalizingFSR = () => {
    if (this.props.fsr.fsr.isTurnedIn) {
      this.props.toggleFinalizing(this.props.fsr.fsr.id, {
        isChecked: !this.props.fsr.isChecked,
      });
    } else {
      notification.error({ message: 'FSR is not turned in.' });
    }
  };

  showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to finalize this FSR?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        this.handleFinalizingFSR();
      },
      onCancel: () => {
        console.log('Cancelled Finalizing FSR');
      },
    });
  };

  render() {
    const {
      isAddSubjectModalOpen,
      isAddCWorkModalOpen,
      isAddResearchModalOpen,
      isAddAdminWorkModalOpen,
      isAddExtAndCommServiceModalOpen,
      isAddCourseModalOpen,
      isAddConsultationHourModalOpen,

      isEditSubjectModalOpen,

      toggleModal,
      nextStep,
      prevStep,

      currentStep,
      fsr,
      subjects,
      subject,
      timeslots,

      getSubjects,
      addSubject,
      deleteSubject,
      editSubject,
      changeSelectedSubject,
      getTimeslots,

      isGettingSubjects,
      isAddingSubject,
      isAddingTimeslot,
      isEditingSubject,
      isGettingTimeslots,
      isTurningIn,
      isFinalizing,
      isGettingFSR,
      pushLink,

      user,
    } = this.props;

    const { fsrID } = this.props.match.params;
    const { acctType } = this.props.user;

    return isGettingFSR ? (
      <PageLoader />
    ) : (
      <div>
        <ButtonGroup style={{ float: 'right', display: 'flex' }}>
          <Button
            style={styles.icons}
            size="large"
            icon="file"
            onClick={() => pushLink(`/records/${fsrID}/preview`)}
            ghost
          >
            View Preview
          </Button>
          {acctType == 'USER' ? (
            fsr.fsr.isTurnedIn ? (
              <Button
                style={styles.icons}
                size="large"
                icon="check"
                onClick={this.handleTurningInFSR}
                ghost
              >
                Turned In
              </Button>
            ) : (
              <Button
                style={styles.icons}
                size="large"
                icon="up-square-o"
                onClick={this.handleTurningInFSR}
                ghost
              >
                Turn In FSR
              </Button>
            )
          ) : fsr.fsr.isChecked && fsr.fsr.isTurnedIn ? (
            <Button
              style={styles.icons}
              size="large"
              icon="check-circle-o"
              disabled
              ghost
            >
              Finalized
            </Button>
          ) : (
            <Button
              style={styles.icons}
              size="large"
              icon="check-circle-o"
              onClick={this.showDeleteConfirm}
              ghost
            >
              Finalize FSR
            </Button>
          )}
        </ButtonGroup>
        <h1>
          Academic Year {fsr.fsr.acadYear} {fsr.fsr.semester} Term
        </h1>
        <Row>
          <Col span={5}>
            <Steps direction="vertical" size="small" current={currentStep}>
              {steps.map((item, index) => (
                <Step
                  key={index}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </Steps>
          </Col>
          <div>
            <Col span={19}>
              {currentStep === 0 ? (
                <TeachingLoadForm
                  fsrID={fsrID}
                  subjects={subjects}
                  subject={subject}
                  timeslots={timeslots}
                  getSubjects={getSubjects}
                  addSubject={addSubject}
                  deleteSubject={deleteSubject}
                  editSubject={editSubject}
                  changeSelectedSubject={changeSelectedSubject}
                  getTimeslots={getTimeslots}
                  isGettingSubjects={isGettingSubjects}
                  isAddingSubject={isAddingSubject}
                  isAddingTimeslot={isAddingTimeslot}
                  isEditingSubject={isEditingSubject}
                  isGettingTimeslots={isGettingTimeslots}
                  isAddSubjectModalOpen={isAddSubjectModalOpen}
                  isEditSubjectModalOpen={isEditSubjectModalOpen}
                  toggleModal={toggleModal}
                  nextStep={nextStep}
                />
              ) : currentStep === 1 ? (
                <ResearchAndCreativeWorkForm
                  isAddCWorkModalOpen={isAddCWorkModalOpen}
                  isAddResearchModalOpen={isAddResearchModalOpen}
                  toggleModal={toggleModal}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              ) : currentStep === 2 ? (
                <AdminWorkForm
                  isAddAdminWorkModalOpen={isAddAdminWorkModalOpen}
                  toggleModal={toggleModal}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              ) : currentStep === 3 ? (
                <ExtAndCommServiceForm
                  isAddExtAndCommServiceModalOpen={
                    isAddExtAndCommServiceModalOpen
                  }
                  toggleModal={toggleModal}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              ) : currentStep === 4 ? (
                <StudyLoadForm
                  isAddCourseModalOpen={isAddCourseModalOpen}
                  toggleModal={toggleModal}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              ) : currentStep === 5 ? (
                <LimitedPracticeForm prevStep={prevStep} nextStep={nextStep} />
              ) : currentStep === 6 ? (
                <AwardForm prevStep={prevStep} nextStep={nextStep} />
              ) : currentStep === 7 ? (
                <ConsultationHoursForm
                  isAddConsultationHourModalOpen={
                    isAddConsultationHourModalOpen
                  }
                  toggleModal={toggleModal}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              ) : (
                <CertificationForm prevStep={prevStep} nextStep={nextStep} />
              )}
            </Col>
          </div>
        </Row>
      </div>
    );
  }
}

export default FSRForm;
