import {
  Form,
  Input,
  Cascader,
  Select,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import React, { Component } from 'react';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const colleges = [
  {
    value: 'cas',
    label: 'College of Arts and Sciences',
  },
  {
    value: 'cem',
    label: 'College of Economics and Management',
  },
];

class RegForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`,
      );
    }
    this.setState({ autoCompleteResult });
  };
  render() {
    function onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    }
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="Name">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please input your name!',
                whitespace: true,
              },
            ],
          })(
            <AutoComplete placeholder="Last Name, Given Name, M.I.">
              <Input />
            </AutoComplete>,
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Rank">
          {getFieldDecorator('rank', {
            rules: [
              {
                required: true,
                message: 'Please input rank!',
                whitespace: true,
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Home Department">
          {getFieldDecorator('department', {
            rules: [
              {
                required: true,
                message: 'Please input home department',
                whitespace: true,
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Home College">
          {getFieldDecorator('homeCollege', {
            rules: [
              {
                type: 'array',
                required: true,
                message: 'Please select your home college!',
              },
            ],
          })(<Cascader options={colleges} />)}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>,
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegForm);

// Ina heto yung mali mo. Dapat kasi ang ine-export mo ay isang class ng Form (since antb yung framework niyo) na may parameter na RegForm.
// Pinalitan ko lang yung export default ng var na ginawa from Form.create(Regform);

//Ayown. Good luck sa 128! Wag mahiya maghingi ng tulong

export default WrappedRegistrationForm;
