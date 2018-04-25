import React, { Component } from 'react';
import { Modal, Button, Form, Input, Transfer } from 'antd';
import { CREATE_FSR } from '../duck';
import styles from '../styles';
import { getFieldValues } from '../../../utils';

const FormItem = Form.Item;

class CreateFSRModal extends Component {
  componentDidMount() {
    console.log(this.props.getMetaData());
  }

  // async componentDidMount() {
  //   await this.props.getUsers({ limit: 99999 });
  //   const dataSource = this.props.users.map(user => ({ ...user, key: user.userID }));
  //   this.setState({ dataSource });
  // }

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const users = this.props.selectedUsers;
        const { acadYear, semester } = this.props.meta;
        console.log(users, acadYear, semester);
        this.props.addFSR({ users, acadYear, semester });
        this.handleAfterClose();
      }
    });
    this.props.toggleModal(CREATE_FSR);
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
      isAddingFSR,

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
            loading={isAddingFSR}
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
                listStyle={{ height: 500, width: '45%' }}
                dataSource={this.props.users.map(user => ({
                  ...user,
                  key: user.userID,
                }))}
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
