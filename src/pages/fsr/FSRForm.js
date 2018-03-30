import { Steps, Card, Row, Col } from 'antd';
import React, { Component } from 'react';
import styles from './styles';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import RegForm from './components/RegForm';
import TeachingLoadForm from './components/TeachingLoadForm';
import ResearchAndCreativeWorkForm from './components/ResearchAndCreativeWorkForm';

import steps from './steps';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const Step = Steps.Step;

class FSRForm extends Component {
  render() {
    const {
      isAddSubjectModalOpen,
      isAddCWorkModalOpen,
      isAddResearchModalOpen,

      toggleAddSubjectModal,
      toggleAddCWorkModal,
      toggleAddResearchModal,

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
              <Card title="Faculty Service Record" style={styles.formFSR}>
                {currentStep === 0 ? (
                  <TeachingLoadForm
                    isAddSubjectModalOpen={isAddSubjectModalOpen}
                    toggleAddSubjectModal={toggleAddSubjectModal}
                    nextStep={nextStep}
                  />
                ) : currentStep === 1 ? (
                  <ResearchAndCreativeWorkForm
                    isAddCWorkModalOpen={isAddCWorkModalOpen}
                    isAddResearchModalOpen={isAddResearchModalOpen}
                    toggleAddCWorkModal={toggleAddCWorkModal}
                    toggleAddResearchModal={toggleAddResearchModal}
                    prevStep={prevStep}
                    nextStep={nextStep}
                  />
                ) : (
                  ''
                )}
              </Card>
            </Col>
          </div>
        </Row>
      </div>
    );
  }
}

export default FSRForm;
