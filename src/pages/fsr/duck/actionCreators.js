import { notification } from 'antd';
import * as Api from '../../../api';
import * as Action from './actionTypes';

export const toggleModal = modal => ({
  type: Action.TOGGLE_MODAL,
  payload: modal,
});

export const nextStep = () => ({
  type: Action.NEXT_STEP,
});

export const prevStep = () => ({
  type: Action.PREVIOUS_STEP,
});

export const getFSR = id => ({
  type: Action.GET_FSR,
  promise: Api.getFSR(id),
  meta: {
    onFailure: () => {
      notification.error({ message: 'Failure to fetch fsr' });
    },
  },
});

export const getSubjects = query => {
  return dispatch => {
    return dispatch({
      type: Action.GET_SUBJECTS,
      promise: Api.getSubjects(query),
      meta: {
        onFailure: () => {
          notification.error({ message: 'Failure to fetch subjects' });
        },
      },
    });
  };
};

export const addSubject = values => (dispatch, getState) => {
  dispatch({
    type: Action.ADD_SUBJECT,
    promise: Api.addSubject(values),
    meta: {
      onSuccess: () => {
        const { subject, fsr } = getState().fsr;

        values.days.forEach(day => {
          dispatch(
            addTimeslot({ ...values, day, subjectID: subject.subjectID }),
          );
        });

        notification.success({ message: 'Successfully added subject' });
        dispatch(getSubjects({ id: fsr.fsrID }));
      },
      onFailure: () => {
        notification.error({ message: 'Server error while creating subject' });
      },
    },
  });
};

export const addTimeslot = timeslot => {
  return dispatch => {
    return dispatch({
      type: Action.ADD_TIMESLOT,
      promise: Api.addTimeslot(timeslot),
      meta: {
        onFailure: () => {
          notification.error({ message: 'Server error while adding timeslot' });
        },
      },
    });
  };
};

export const deleteSubject = subjectID => (dispatch, getState) => {
  dispatch({
    type: Action.DELETE_SUBJECT,
    promise: Api.deleteSubject(subjectID),
    meta: {
      onSuccess: () => {
        const { fsr } = getState().fsr;

        notification.success({ message: 'Successfully deleted subject' });
        dispatch(getSubjects({ id: fsr.fsrID }));
      },
      onFailure: () => {
        notification.error({ message: 'Server error while deleting subject' });
      },
    },
  });
};

export const editSubject = (subjectID, body) => {
  return dispatch => {
    return dispatch({
      type: Action.EDIT_SUBJECT,
      promise: Api.editSubject(subjectID, body),
      meta: {
        onSuccess: () => {
          notification.success({ message: 'Successfully edited subject' });
        },
        onFailure: () => {
          notification.error({
            message: 'Server error while updating subject',
          });
        },
      },
    });
  };
};

export const changeSelectedSubject = subject => ({
  type: Action.CHANGE_SELECTED_SUBJECT,
  payload: subject,
});

export const getTimeslots = query => {
  return dispatch => {
    return dispatch({
      type: Action.GET_TIMESLOTS,
      promise: Api.getTimeslots(query),
      meta: {
        onFailure: () => {
          notification.error({ message: 'Failure to fetch timeslots' });
        },
      },
    });
  };
};


export const getNotifications = query => {
  return dispatch => {
    return dispatch({
      type: GET_NOTIFICATIONS,
      promise: Api.getNotifications(query),
      meta: {
        onFailure: () => {
          notification.error({
            message: 'Error while getting notifications.',
          });
        },
      },
    });
  };
};

export const getAnnouncements = query => {
  return dispatch => {
    return dispatch({
      type: GET_ANNOUNCEMENTS,
      promise: Api.getAnnouncements(query),
      meta: {
        onFailure: () => {
          notification.error({
            message: 'Error while getting announcements.',
          });
        },
      },
    });
  };
};