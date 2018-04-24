import { Steps, Row, Col, Button, Modal, notification } from 'antd';
import React, { Component } from 'react';
import { CERTIFICATION } from './duck';

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
const { Step } = Steps;

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

class FSRForm extends Component {
  componentDidMount() {
    this.props.getFSR(this.props.match.params.fsrID);
  }

  componentWillUnmount() {
    this.props.resetPage();
  }

  handleUnsubmitFSR = () => {
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
      isEditResearchModalOpen,
      isEditCWorkModalOpen,
      isEditAdminWorkModalOpen,
      isEditExtAndCommServiceModalOpen,
      isEditCourseModalOpen,
      isEditConsultationHourModalOpen,

      isCertificationModalOpen,

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
      extAndCommServices,
      extAndCommService,
      studyLoad,
      courses,
      course,
      courseScheds,
      ltdPractOfProf,
      award,
      consultationHours,
      consultationHour,

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
      getExtAndCommServices,
      addExtAndCommService,
      deleteExtAndCommService,
      editExtAndCommService,
      getStudyLoad,
      editStudyLoad,
      getCourses,
      addCourse,
      deleteCourse,
      editCourse,
      getCourseScheds,
      getLtdPractOfProfs,
      editLtdPractOfProf,
      getAwards,
      editAward,
      getConsultationHours,
      addConsultationHour,
      deleteConsultationHour,
      editConsultationHour,

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
      isGettingExtAndCommServices,
      isAddingExtAndCommService,
      isEditingExtAndCommService,
      isGettingStudyLoad,
      isEditingStudyLoad,
      isGettingCourses,
      isAddingCourse,
      isEditingCourse,
      isGettingCourseScheds,
      isAddingCourseSched,
      isGettingLtdPractOfProf,
      isEditingLtdPractOfProf,
      isGettingAward,
      isEditingAward,
      isGettingConsultationHours,
      isAddingConsultationHour,
      isEditingConsultationHour,

      isTurningIn,
      isFinalizing,
      isGettingFSR,
      pushLink,
      toggleTurningIn,
    } = this.props;

    const { fsrID } = this.props.match.params;
    const { acctType, userID } = this.props.user;

    console.log(fsr);

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
            Preview FSR
          </Button>
          {acctType === 'USER' ? (
            fsr.fsr.isTurnedIn ? (
              <Button
                style={styles.icons}
                size="large"
                icon="check"
                loading={isTurningIn}
                onClick={this.handleUnsubmitFSR}
                ghost
              >
                Turned In
              </Button>
            ) : (
              <Button
                style={styles.icons}
                size="large"
                icon="up-square-o"
                onClick={() => toggleModal(CERTIFICATION)}
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
              loading={isTurningIn}
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
              loading={isFinalizing}
            >
              Finalize FSR
            </Button>
          )}
        </ButtonGroup>
        <h1>
          Academic Year {fsr.fsr.acadYear} {fsr.fsr.semester} Term
        </h1>
        <Row>
          <Col span={4}>
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
            <Col span={20}>
              {currentStep === 0 ? (
                <TeachingLoadForm
                  userID={userID}
                  fsr={fsr}
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
                  userID={userID}
                  fsr={fsr}
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
                  userID={userID}
                  fsr={fsr}
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
                  userID={userID}
                  fsr={fsr}
                  fsrID={fsrID}
                  extAndCommServices={extAndCommServices}
                  extAndCommService={extAndCommService}
                  getExtAndCommServices={getExtAndCommServices}
                  addExtAndCommService={addExtAndCommService}
                  deleteExtAndCommService={deleteExtAndCommService}
                  editExtAndCommService={editExtAndCommService}
                  changeSelected={changeSelected}
                  isGettingExtAndCommServices={isGettingExtAndCommServices}
                  isAddingExtAndCommService={isAddingExtAndCommService}
                  isEditingExtAndCommService={isEditingExtAndCommService}
                  isAddExtAndCommServiceModalOpen={
                    isAddExtAndCommServiceModalOpen
                  }
                  isEditExtAndCommServiceModalOpen={
                    isEditExtAndCommServiceModalOpen
                  }
                  toggleModal={toggleModal}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              ) : currentStep === 4 ? (
                <StudyLoadForm
                  userID={userID}
                  fsr={fsr}
                  fsrID={fsrID}
                  studyLoad={studyLoad}
                  courses={courses}
                  course={course}
                  courseScheds={courseScheds}
                  getStudyLoad={getStudyLoad}
                  editStudyLoad={editStudyLoad}
                  getCourses={getCourses}
                  addCourse={addCourse}
                  deleteCourse={deleteCourse}
                  editCourse={editCourse}
                  getCourseScheds={getCourseScheds}
                  changeSelected={changeSelected}
                  isGettingStudyLoad={isGettingStudyLoad}
                  isEditingStudyLoad={isEditingStudyLoad}
                  isGettingCourses={isGettingCourses}
                  isAddingCourse={isAddingCourse}
                  isEditingCourse={isEditingCourse}
                  isGettingCourseScheds={isGettingCourseScheds}
                  isAddingCourseSched={isAddingCourseSched}
                  isAddCourseModalOpen={isAddCourseModalOpen}
                  isEditCourseModalOpen={isEditCourseModalOpen}
                  toggleModal={toggleModal}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              ) : currentStep === 5 ? (
                <LimitedPracticeForm
                  userID={userID}
                  fsr={fsr}
                  fsrID={fsrID}
                  ltdPractOfProf={ltdPractOfProf}
                  getLtdPractOfProfs={getLtdPractOfProfs}
                  editLtdPractOfProf={editLtdPractOfProf}
                  isGettingLtdPractOfProf={isGettingLtdPractOfProf}
                  isEditingLtdPractOfProf={isEditingLtdPractOfProf}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              ) : currentStep === 6 ? (
                <AwardForm
                  userID={userID}
                  fsr={fsr}
                  fsrID={fsrID}
                  award={award}
                  getAwards={getAwards}
                  editAward={editAward}
                  isGettingAward={isGettingAward}
                  isEditingAward={isEditingAward}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              ) : (
                <ConsultationHoursForm
                  userID={userID}
                  fsr={fsr}
                  fsrID={fsrID}
                  consultationHours={consultationHours}
                  consultationHour={consultationHour}
                  getConsultationHours={getConsultationHours}
                  addConsultationHour={addConsultationHour}
                  deleteConsultationHour={deleteConsultationHour}
                  editConsultationHour={editConsultationHour}
                  changeSelected={changeSelected}
                  isGettingConsultationHours={isGettingConsultationHours}
                  isAddingConsultationHour={isAddingConsultationHour}
                  isEditingConsultationHour={isEditingConsultationHour}
                  isAddConsultationHourModalOpen={
                    isAddConsultationHourModalOpen
                  }
                  isEditConsultationHourModalOpen={
                    isEditConsultationHourModalOpen
                  }
                  toggleModal={toggleModal}
                  prevStep={prevStep}
                />
              )}
              <CertificationForm
                fsr={fsr}
                toggleTurningIn={toggleTurningIn}
                isTurningIn={isTurningIn}
                isCertificationModalOpen={isCertificationModalOpen}
                toggleModal={toggleModal}
                pushLink={pushLink}
              />
            </Col>
          </div>
        </Row>
      </div>
    );
  }
}

export default FSRForm;
