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
import RegForm from './RegForm';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const Step = Steps.Step;

class FormSample extends Component {
  render() {
    return (
      <div>
        <h1>FSR Form</h1>
        <Row>
          <Col span={6}>
            <Card title="Tasks" style={styles.formFSR}>
              <Steps direction="vertical" size="small" current={1}>
                <Step
                  title="Waiting"
                  description="Teaching Load in the College."
                />
                <Step
                  title="Waiting"
                  description="Research/Textbook Writing/Creative Work."
                />
                <Step title="Waiting" description="Administrative Work" />
                <Step
                  title="Waiting"
                  description="Extension and Community Service"
                />
                <Step title="Waiting" description="Study Load" />
                <Step
                  title="Waiting"
                  description="Limited Practice of Profession"
                />
                <Step
                  title="Waiting"
                  description="Professional Chair or Faculty Grant Recipient or Nominee"
                />
                <Step title="Waiting" description="Consultation Hours" />
                <Step title="Waiting" description="Certification" />
              </Steps>
            </Card>
          </Col>
          <div>
            <Col span={16}>
              <Card title="Faculty Service Record" style={styles.formFSR}>
                <RegForm />
              </Card>
            </Col>
          </div>
        </Row>
      </div>
    );
  }
}

export default FormSample;
