import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StackGrid from 'react-stack-grid';
import { Table, Button, Card, Icon, Modal, Tooltip } from 'antd';
import {
  RESEARCH,
  ADD_RESEARCH_MODAL,
  EDIT_RESEARCH_MODAL,
  CWORK,
  ADD_CWORK_MODAL,
  EDIT_CWORK_MODAL,
} from '../duck';
import { DataLoader } from '../../../global';
import moment from 'moment';

import AddCWorkModal from './AddCWorkModal';
import AddResearchModal from './AddResearchModal';
import EditCWorkModal from './EditCWorkModal';
import EditResearchModal from './EditResearchModal';

import styles from '../styles';

const { confirm } = Modal;

class ResearchAndCreativeWorkForm extends Component {
  componentDidMount() {
    this.props.getResearches({ id: this.props.fsrID });
    this.props.getCreativeWorks({ id: this.props.fsrID });
  }

  handleToggleEditResearch = research => {
    this.props.changeSelected({ entity: RESEARCH, data: research });
    this.props.toggleModal(EDIT_RESEARCH_MODAL);
  };

  columns2 = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
    },
    {
      title: 'Co-Authors',
      dataIndex: 'coAuthor',
      key: 'coAuthor',
      align: 'center',
    },
    {
      title: 'Date of Publication',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      render: date => moment(date).format('MMMM D, YYYY'),
    },
    {
      title: 'File',
      dataIndex: 'filepath',
      key: 'filepath',
      align: 'center',
      render: text =>
        text ? (
          <Link to={text} className="text secondary">
            {text.split('/')[3]}
          </Link>
        ) : (
          ''
        ),
    },
    {
      title: 'Approved Credit Units',
      dataIndex: 'credUnit',
      key: 'credUnit',
      align: 'center',
    },
    {
      render: (text, record) => (
        <div style={styles.icons}>
          <Link
            to="#"
            disabled={
              this.props.userID === this.props.fsr.fsr.userID ? false : true
            }
          >
            <Tooltip title="Delete Creative Work" arrowPointAtCenter>
              <Icon
                type="delete"
                className="text secondary"
                onClick={() =>
                  this.handleDeleteCreativeWorkConfirmation(record)
                }
              />
            </Tooltip>
          </Link>
          <Link
            to="#"
            disabled={
              this.props.userID === this.props.fsr.fsr.userID ? false : true
            }
          >
            <Tooltip title="Edit Creative Work" arrowPointAtCenter>
              <Icon
                type="edit"
                className="text secondary"
                style={{ marginLeft: 10 }}
                onClick={() => this.handleToggleEditCWork(record)}
              />
            </Tooltip>
          </Link>
        </div>
      ),
    },
  ];

  handleToggleEditCWork = creativeWork => {
    this.props.changeSelected({ entity: CWORK, data: creativeWork });
    this.props.toggleModal(EDIT_CWORK_MODAL);
  };

  handleDeleteResearchConfirmation = ({ researchID }) => {
    confirm({
      title: 'Are you sure you want to delete this research?',
      okType: 'danger',
      onOk: () => {
        this.props.deleteResearch(researchID);
      },
      onCancel() {},
    });
  };

  handleDeleteCreativeWorkConfirmation = ({ creativeWorkID }) => {
    confirm({
      title: 'Are you sure you want to delete this creative work?',
      okType: 'danger',
      onOk: () => {
        this.props.deleteCreativeWork(creativeWorkID);
      },
      onCancel() {},
    });
  };

  render() {
    const {
      userID,
      fsr,
      fsrID,
      researches,
      research,
      cworks,
      cwork,
      addResearch,
      editResearch,
      addCreativeWork,
      editCreativeWork,
      isGettingResearches,
      isAddingResearch,
      isEditingResearch,
      isGettingCWorks,
      isAddingCWork,
      isEditingCWork,
      isAddCWorkModalOpen,
      isAddResearchModalOpen,
      isEditResearchModalOpen,
      isEditCWorkModalOpen,
      toggleModal,
      nextStep,
      prevStep,
    } = this.props;

    return (
      <Card
        title="Research / Textbook Writing / Creative Work"
        style={styles.formFSR}
      >
        <AddResearchModal
          id={fsrID}
          addResearch={addResearch}
          isAddingResearch={isAddingResearch}
          isAddResearchModalOpen={isAddResearchModalOpen}
          toggleModal={toggleModal}
        />
        <EditResearchModal
          id={fsrID}
          research={research}
          editResearch={editResearch}
          isEditingResearch={isEditingResearch}
          isEditResearchModalOpen={isEditResearchModalOpen}
          toggleModal={toggleModal}
        />
        <div style={styles.button}>
          <Button
            icon="plus-circle-o"
            type="primary"
            onClick={() => toggleModal(ADD_RESEARCH_MODAL)}
            disabled={userID === fsr.fsr.userID ? false : true}
          >
            Add Research
          </Button>
        </div>
        <DataLoader
          isLoading={isGettingResearches}
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
              {researches.map(research => (
                <Card
                  key={research.researchID}
                  style={{ borderColor: '#483440' }}
                  actions={[
                    <Tooltip title="Edit Research" arrowPointAtCenter>
                      {userID === fsr.fsr.userID ? (
                        <Icon
                          type="edit"
                          className="text normal"
                          onClick={() =>
                            this.handleToggleEditResearch(research)
                          }
                        />
                      ) : (
                        <Icon type="edit" className="text meta-2" />
                      )}
                    </Tooltip>,
                    <Tooltip title="Delete Research" arrowPointAtCenter>
                      {userID === fsr.fsr.userID ? (
                        <Icon
                          type="delete"
                          className="text normal"
                          onClick={() =>
                            this.handleDeleteResearchConfirmation(research)
                          }
                        />
                      ) : (
                        <Icon type="delete" className="text meta-2" />
                      )}
                    </Tooltip>,
                  ]}
                >
                  <div className="text normal">
                    <dl>
                      <dt>Title</dt>
                      <dd>{research.title}</dd>
                    </dl>
                    <dl>
                      <dt>Role</dt>
                      <dd>{research.role}</dd>
                    </dl>
                    {!!research.coAuthor && (
                      <dl>
                        <dt>Co-Workers</dt>
                        <dd>{research.coAuthor}</dd>
                      </dl>
                    )}
                    <dl>
                      <dt>Date</dt>
                      <dd>
                        {moment(research.startDate).format('MMMM DD, YYYY')} -{' '}
                        {research.endDate
                          ? moment(research.endDate).format('MMMM DD, YYYY')
                          : 'Present'}
                      </dd>
                    </dl>
                    <dl>
                      <dt>Funding</dt>
                      <dd>{research.funding}</dd>
                    </dl>
                    {!!research.filepath && (
                      <dl>
                        <dt>Attachment</dt>
                        <dd>
                          <Link
                            to={research.filepath}
                            className="text secondary"
                          >
                            {research.filepath.split('/')[3]}
                          </Link>
                        </dd>
                      </dl>
                    )}
                    <dl>
                      <dt>Approved Credit Units</dt>
                      <dd>{research.approvedUnits}</dd>
                    </dl>
                  </div>
                </Card>
              ))}
            </StackGrid>
          }
        />
        <br />

        <AddCWorkModal
          id={fsrID}
          addCreativeWork={addCreativeWork}
          isAddingCWork={isAddingCWork}
          isAddCWorkModalOpen={isAddCWorkModalOpen}
          toggleModal={toggleModal}
        />
        <EditCWorkModal
          id={fsrID}
          cwork={cwork}
          editCreativeWork={editCreativeWork}
          isEditingCWork={isEditingCWork}
          isEditCWorkModalOpen={isEditCWorkModalOpen}
          toggleModal={toggleModal}
        />
        <div style={styles.button}>
          <Button
            icon="plus-circle-o"
            type="primary"
            onClick={() => toggleModal(ADD_CWORK_MODAL)}
            disabled={userID === fsr.fsr.userID ? false : true}
          >
            Add Creative Work
          </Button>
        </div>
        <Table
          columns={this.columns2}
          dataSource={cworks}
          loading={isGettingCWorks}
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

export default ResearchAndCreativeWorkForm;
