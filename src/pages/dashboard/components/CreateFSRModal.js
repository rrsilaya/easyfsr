import React, { Component } from 'react';
import { Modal, Button, Form, Input, Transfer } from 'antd';
import { CREATE_FSR } from '../duck';
import styles from '../styles';

const FormItem = Form.Item;

class CreateFSRModal extends Component {
  state = {
    dataSource: [],
  };

  // async componentDidMount() {
  //   await this.props.getUsers({ limit: 99999 });
  //   const dataSource = this.props.users.map(user => ({ ...user, key: user.userID }));
  //   this.setState({ dataSource });
  // }

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        this.handleAfterClose();
      }
    });
  };

  handleAfterClose = () => {
    // this.props.changeSelectedUser({});
    this.props.form.resetFields();
  };

  handleCancel = () => {
    this.handleAfterClose();
  };

  handleFilter = (inputValue, option) =>
    option.lastName.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;

  handleChange = targetKeys => {
    this.props.changeSelectedUsers(targetKeys);
  };

  render() {
    const {
      isCreateFSRModalOpen,

      toggleModal,

      form,
    } = this.props;

    return (
      <Modal
        title="Create FSR"
        visible={isCreateFSRModalOpen}
        onOk={() => toggleModal(CREATE_FSR)}
        onCancel={() => {
          this.handleAfterClose();
          toggleModal(CREATE_FSR);
        }}
        destroyOnClose
        footer={[
          <Button
            key="back"
            onClick={() => {
              this.handleAfterClose();
              toggleModal(CREATE_FSR);
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={this.handleFormSubmit}
          >
            Create
          </Button>,
        ]}
      >
        <Form onSubmit={this.handleFormSubmit}>
          <FormItem>
            {form.getFieldDecorator('fsr@@createFSR')(
              <Transfer
                showSearch
                searchPlaceholder="Enter name"
                listStyle={{ height: 500, width: '39%' }}
                dataSource={this.props.users.map(user => ({
                  ...user,
                  key: user.userID,
                }))}
                operations={['Apply', 'Return']}
                render={user => `${user.lastName}, ${user.firstName}`}
                onChange={this.handleChange}
                filterOption={this.handleFilter}
                targetKeys={this.props.selectedUsers}
              />,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(CreateFSRModal);
