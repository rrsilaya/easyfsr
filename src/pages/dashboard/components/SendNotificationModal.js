import React, { Component } from 'react';
import { Modal, Button, Input, Select, Spin } from 'antd';
import { SEND_NOTIFICATION } from '../duck';
import styles from '../styles';
import { getFieldValues } from '../../../utils';

const CHANGE_SELECTED_USER = 'USER/CHANGE_SELECTED_USER';
const { Search } = Input;
const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;

class SendNotificationModal extends Component {
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.getUsers(getFieldValues(values));
      }
    });
  };

  handleToggleConfirmNotificationModal = () => {
    this.props.toggleConfirmNotificationModal();
  };

  handleSearchUser = async value => {
    this.setState({});
    const { data } = await this.props.getUsers({
      limit: 10,
      page: 1,
      name: value,
    });
    this.setState({ userOptions: [...data.data] });
    if (!data.data.length) {
      this.setState({});
    } else {
      this.setState({});
    }
    if (
      this.state.userOptions
        .find
        // name => user.name.toLowerCase() === value.toLowerCase(),
        ()
    ) {
      this.handleSelectUser(value);
    }
  };

  render() {
    const {
      isSendNotificationModalOpen,

      toggleModal,
      user,
    } = this.props;

    return (
      <Modal
        title="Send Notification"
        visible={isSendNotificationModalOpen}
        onOk={() => toggleModal(SEND_NOTIFICATION)}
        onCancel={() => toggleModal(SEND_NOTIFICATION)}
        destroyOnClose
        footer={[
          <Button key="back" onClick={() => toggleModal(SEND_NOTIFICATION)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={this.props.toggleConfirmNotificationModal}
          >
            Send
          </Button>,
        ]}
      >
        <Select
          mode="combobox"
          onSearch={this.handleSearchUser}
          // onSelect
          // value={value}
          placeholder="Select users"
          filterOption={false}
          style={styles.toUserBox}
          defaultActiveFirstOption={false}
          showArrow={false}
        >
          {/* {options} */}
        </Select>
        <TextArea
          rows={5}
          placeholder="Enter message here..."
          style={styles.messageBox}
        />
      </Modal>
    );
  }
}

export default SendNotificationModal;
