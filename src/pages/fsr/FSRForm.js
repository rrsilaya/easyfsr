import { Steps, Card, Row, Col } from 'antd';
import React, { Component } from 'react';
import styles from './styles';

import RegForm from './components/RegForm';
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
  render() {
    const {
      isAddSubjectModalOpen,
      isAddCWorkModalOpen,
      isAddResearchModalOpen,
      isAddAdminWorkModalOpen,
      isAddExtAndCommServiceModalOpen,
      isAddCourseModalOpen,
      isAddConsultationHourModalOpen,

      toggleModal,
      nextStep,
      prevStep,

      currentStep,
    } = this.props;

    return (
      <div>
        <h1>FSR Form</h1>
        <Row>
          <Col span={7}>
            <Card title="Tasks" style={styles.formFSR}>
              <Steps direction="vertical" size="small" current={currentStep}>
                {steps.map((item, index) => (
                  <Step
                    key={index}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </Steps>
            </Card>
          </Col>
          <div>
            <Col span={17}>
              {currentStep === 0 ? (
                <TeachingLoadForm
                  isAddSubjectModalOpen={isAddSubjectModalOpen}
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
