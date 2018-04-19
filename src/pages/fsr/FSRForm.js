import { Steps, Row, Col } from 'antd';
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

import steps from './steps';

const { Step } = Steps;

class FSRForm extends Component {
  componentDidMount() {
    this.props.getFSR(this.props.match.params.fsrID);
  }

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
    } = this.props;

    const { fsrID } = this.props.match.params;

    return (
      <div>
        <h1>
          Academic Year {fsr.acadYear} {fsr.semester} Term
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
                  isGettingAnnouncements={isGettingAnnouncements}
                  isGettingNotifications={isGettingNotifications}
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
