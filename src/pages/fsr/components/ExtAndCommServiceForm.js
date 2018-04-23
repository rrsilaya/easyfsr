import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Card, Modal, Icon, Tooltip } from 'antd';
import {
  EXTANDCOMMSERVICE,
  ADD_EXTANDCOMMSERVICE_MODAL,
  EDIT_EXTANDCOMMSERVICE_MODAL,
} from '../duck';
import moment from 'moment';
import StackGrid from 'react-stack-grid';
import { DataLoader } from '../../../global';

import AddExtAndCommServiceModal from './AddExtAndCommServiceModal';
import EditExtAndCommServiceModal from './EditExtAndCommServiceModal';

import styles from '../styles';

const { confirm } = Modal;

class ExtAndCommServiceForm extends Component {
  componentDidMount() {
    this.props.getExtAndCommServices({ id: this.props.fsrID });
  }

  handleToggleEditExtAndCommService = extAndCommService => {
    this.props.changeSelected({
      entity: EXTANDCOMMSERVICE,
      data: extAndCommService,
    });
    this.props.toggleModal(EDIT_EXTANDCOMMSERVICE_MODAL);
  };

  handleDeleteExtensionConfirmation = ({ extAndCommServiceID }) => {
    confirm({
      title:
        'Are you sure you want to delete this extension and community service?',
      okType: 'danger',
      onOk: () => {
        this.props.deleteExtAndCommService(extAndCommServiceID);
      },
      onCancel() {},
    });
  };

  render() {
    const {
      fsrID,
      extAndCommServices,
      extAndCommService,
      addExtAndCommService,
      editExtAndCommService,
      isGettingExtAndCommService,
      isAddingExtAndCommService,
      isEditingExtAndCommService,
      isAddExtAndCommServiceModalOpen,
      isEditExtAndCommServiceModalOpen,
      toggleModal,
      nextStep,
      prevStep,
    } = this.props;

    return (
      <Card title="Extension and Community Service" style={styles.formFSR}>
        <AddExtAndCommServiceModal
          id={fsrID}
          addExtAndCommService={addExtAndCommService}
          isAddingExtAndCommService={isAddingExtAndCommService}
          isAddExtAndCommServiceModalOpen={isAddExtAndCommServiceModalOpen}
          toggleModal={toggleModal}
        />
        {isEditExtAndCommServiceModalOpen ? (
          <EditExtAndCommServiceModal
            id={fsrID}
            extAndCommService={extAndCommService}
            editExtAndCommService={editExtAndCommService}
            isEditingExtAndCommService={isEditingExtAndCommService}
            isEditExtAndCommServiceModalOpen={isEditExtAndCommServiceModalOpen}
            toggleModal={toggleModal}
          />
        ) : (
          ''
        )}
        <div style={styles.button}>
          <Button
            icon="plus-circle-o"
            type="primary"
            onClick={() => toggleModal(ADD_EXTANDCOMMSERVICE_MODAL)}
          >
            Add Extension and Community Service
          </Button>
        </div>
        <DataLoader
          isLoading={isGettingExtAndCommService}
          color="#fff"
          spinColor="#483440"
          content={
            <StackGrid
              columnWidth="33.3333%"
              gutterWidth={16}
              gutterHeight={16}
              duration={0}
              gridRef={grid => (this.grid = grid)}
            >
              {extAndCommServices.map(extension => (
                <Card
                  key={extension.extAndCommServiceID}
                  style={{ borderColor: '#483440' }}
                  actions={[
                    <Tooltip
                      title="Edit Extension and Community Service"
                      arrowPointAtCenter
                    >
                      <Icon
                        type="edit"
                        className="text normal"
                        onClick={() =>
                          this.handleToggleEditExtAndCommService(extension)
                        }
                      />
                    </Tooltip>,
                    <Tooltip
                      title="Delete Extension and Community Service"
                      arrowPointAtCenter
                    >
                      <Icon
                        type="delete"
                        className="text normal"
                        onClick={() =>
                          this.handleDeleteExtensionConfirmation(extension)
                        }
                      />
                    </Tooltip>,
                  ]}
                >
                  <dl>
                    <dt>Activity/Program</dt>
                    <dd>{extension.title}</dd>
                  </dl>
                  <dl>
                    <dt>Role</dt>
                    <dd>{extension.role}</dd>
                  </dl>
                  <dl>
                    <dt>Type</dt>
                    <dd>{extension.type}</dd>
                  </dl>
                  <dl>
                    <dt>Number of Hours</dt>
                    <dd>{extension.hours}</dd>
                  </dl>
                  <dl>
                    <dt>Participants</dt>
                    <dd>{extension.participant}</dd>
                  </dl>
                  <dl>
                    <dt>Duration</dt>
                    <dd>
                      {moment(extension.startDate).format('MMMM DD, YYYY')} to{' '}
                      {moment(extension.endDate).format('MMMM DD, YYYY')}
                    </dd>
                  </dl>
                  <dl>
                    <dt>Approved Credit Units</dt>
                    <dd>{extension.creditUnit}</dd>
                  </dl>
                </Card>
              ))}
            </StackGrid>
          }
        />
        <div style={styles.button}>
          <Button type="primary" onClick={prevStep} style={{ marginRight: 15 }}>
            Previous
          </Button>
          <Button type="primary" onClick={nextStep}>
            Next
          </Button>
        </div>
      </Card>
    );
  }
}

export default ExtAndCommServiceForm;
