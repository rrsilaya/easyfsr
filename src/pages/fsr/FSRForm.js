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
      isEditResearchModalOpen,
      isEditCWorkModalOpen,
      isEditAdminWorkModalOpen,

      toggleModal,
      nextStep,
      prevStep,

      currentStep,
      fsr,
      subjects,
      subject,
      timeslots,
      researches,
      research,
      cworks,
      cwork,
      adminWorks,
      adminWork,

      getSubjects,
      addSubject,
      deleteSubject,
      editSubject,
      changeSelected,
      getTimeslots,
      getResearches,
      addResearch,
      deleteResearch,
      editResearch,
      getCreativeWorks,
      addCreativeWork,
      deleteCreativeWork,
      editCreativeWork,
      getAdminWorks,
      addAdminWork,
      deleteAdminWork,
      editAdminWork,

      isGettingSubjects,
      isAddingSubject,
      isAddingTimeslot,
      isEditingSubject,
      isGettingTimeslots,
      isGettingResearches,
      isAddingResearch,
      isEditingResearch,
      isGettingCWorks,
      isAddingCWork,
      isEditingCWork,
      isGettingAdminWorks,
      isAddingAdminWork,
      isEditingAdminWork,
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
                  changeSelected={changeSelected}
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
                  fsrID={fsrID}
                  researches={researches}
                  research={research}
                  cworks={cworks}
                  cwork={cwork}
                  getResearches={getResearches}
                  addResearch={addResearch}
                  deleteResearch={deleteResearch}
                  editResearch={editResearch}
                  changeSelected={changeSelected}
                  getCreativeWorks={getCreativeWorks}
                  addCreativeWork={addCreativeWork}
                  deleteCreativeWork={deleteCreativeWork}
                  editCreativeWork={editCreativeWork}
                  isGettingResearches={isGettingResearches}
                  isAddingResearch={isAddingResearch}
                  isEditingResearch={isEditingResearch}
                  isGettingCWorks={isGettingCWorks}
                  isAddingCWork={isAddingCWork}
                  isEditingCWork={isEditingCWork}
                  isAddCWorkModalOpen={isAddCWorkModalOpen}
                  isEditCWorkModalOpen={isEditCWorkModalOpen}
                  isAddResearchModalOpen={isAddResearchModalOpen}
                  isEditResearchModalOpen={isEditResearchModalOpen}
                  toggleModal={toggleModal}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              ) : currentStep === 2 ? (
                <AdminWorkForm
                  fsrID={fsrID}
                  adminWorks={adminWorks}
                  adminWork={adminWork}
                  getAdminWorks={getAdminWorks}
                  addAdminWork={addAdminWork}
                  deleteAdminWork={deleteAdminWork}
                  editAdminWork={editAdminWork}
                  changeSelected={changeSelected}
                  isGettingAdminWorks={isGettingAdminWorks}
                  isAddingAdminWork={isAddingAdminWork}
                  isEditingAdminWork={isEditingAdminWork}
                  isAddAdminWorkModalOpen={isAddAdminWorkModalOpen}
                  isEditAdminWorkModalOpen={isEditAdminWorkModalOpen}
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
