import React, { Component } from 'react';
import { Icon, Button, Card, Progress, Table, Row, Col } from 'antd';
import styles from './styles';
import dataSource from './datasource';
import columns from './columns';

import SendNotificationModal from './components/SendNotificationModal';
import CreateFSRModal from './components/CreateFSRModal';
import DownloadFSRModal from './components/DownloadFSRModal';
import EditFSRModal from './components/EditFSRModal';
import ViewFSRModal from './components/ViewFSRModal';

import { SEND_NOTIFICATION } from './duck';
import { CREATE_FSR } from './duck';
import { DOWNLOAD_FSR } from './duck';
import { EDIT_FSR } from './duck';
import { VIEW_FSR } from './duck';

class Dashboard extends Component {
  render() {
    const {
      isSendNotificationModalOpen,
      isCreateFSRModalOpen,
      isDownloadFSRModalOpen,
      isEditFSRModalOpen,
      isViewFSRModalOpen,

      toggleModal,
    } = this.props;
    return (
      <div style={{ padding: '30px' }}>
        <h1>Dashboard</h1>
        <Row type="flex">
          <Col span={24}>
            <Button.Group style={styles.menu}>
              <SendNotificationModal
                isSendNotificationModalOpen={isSendNotificationModalOpen}
                toggleModal={toggleModal}
                handleAfterClose={this.handleAfterClose}
              />
              <Button
                type="default"
                style={styles.menuItems}
                onClick={() => toggleModal(SEND_NOTIFICATION)}
              >
                <Icon type="notification" style={styles.icons} />
                <p style={styles.description}>Send Notification</p>
              </Button>

              <CreateFSRModal
                isCreateFSRModalOpen={isCreateFSRModalOpen}
                toggleModal={toggleModal}
                handleAfterClose={this.handleAfterClose}
              />
              <Button
                type="default"
                style={styles.menuItems}
                onClick={() => toggleModal(CREATE_FSR)}
              >
                <Icon type="file-add" style={styles.icons} />
                <p style={styles.description}>Create FSR</p>
              </Button>

              <EditFSRModal
                isEditFSRModalOpen={isEditFSRModalOpen}
                toggleModal={toggleModal}
                handleAfterClose={this.handleAfterClose}
              />
              <Button
                type="default"
                style={styles.menuItems}
                onClick={() => toggleModal(EDIT_FSR)}
              >
                <Icon type="edit" style={styles.icons} />
                <p style={styles.description}>Edit FSR</p>
              </Button>

              <ViewFSRModal
                isViewFSRModalOpen={isViewFSRModalOpen}
                toggleModal={toggleModal}
                handleAfterClose={this.handleAfterClose}
              />
              <Button
                type="default"
                style={styles.menuItems}
                onClick={() => toggleModal(VIEW_FSR)}
              >
                <Icon type="eye-o" style={styles.icons} />
                <p style={styles.description}>View FSR</p>
              </Button>

              <DownloadFSRModal
                isDownloadFSRModalOpen={isDownloadFSRModalOpen}
                toggleModal={toggleModal}
                handleAfterClose={this.handleAfterClose}
              />
              <Button
                type="default"
                style={styles.menuItems}
                onClick={() => toggleModal(DOWNLOAD_FSR)}
              >
                <Icon type="download" style={styles.icons} />
                <p style={styles.description}>Download FSR</p>
              </Button>
            </Button.Group>
          </Col>
        </Row>
        <div>
          <Row gutter={12} type="flex">
            <Col span={8}>
              <Card title="Faculty Progress">
                <Progress
                  type="dashboard"
                  percent={30}
                  style={styles.progressBar}
                  width={200}
                />
              </Card>
            </Col>
            <Col span={16}>
              <Card title="Latest Submissions">
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  style={styles.facultyTable}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Dashboard;
