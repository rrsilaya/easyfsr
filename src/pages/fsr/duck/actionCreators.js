import { notification } from 'antd';
import * as Api from '../../../api';
import * as Action from './actionTypes';

export const toggleModal = modal => ({
  type: Action.TOGGLE_MODAL,
  payload: modal,
});

export const changeSelected = data => ({
  type: Action.CHANGE_SELECTED,
  payload: data,
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
        dispatch(getSubjects({ id: fsr.id }));
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

export const deleteSubject = subjectID => {
  return dispatch => {
    return dispatch({
      type: Action.DELETE_SUBJECT,
      promise: Api.deleteSubject(subjectID),
      meta: {
        onSuccess: () => {
          notification.success({ message: 'Successfully deleted subject' });
        },
        onFailure: () => {
          notification.error({
            message: 'Server error while deleting subject',
          });
        },
      },
    });
  };
};

export const editSubject = (subjectID, body) => (dispatch, getState) => {
  dispatch({
    type: Action.EDIT_SUBJECT,
    promise: Api.editSubject(subjectID, body),
    meta: {
      onSuccess: () => {
        const { timeslots } = getState().fsr;

        timeslots.forEach(timeslot => {
          dispatch(editTimeslot(timeslot.timeslotID, { ...body }));
        });

        notification.success({ message: 'Successfully edited subject' });
      },
      onFailure: () => {
        notification.error({ message: 'Server error while updating subject' });
      },
    },
  });
};

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

export const editTimeslot = (timeslotID, body) => {
  return dispatch => {
    return dispatch({
      type: Action.EDIT_TIMESLOT,
      promise: Api.editTimeslot(timeslotID, body),
      meta: {
        onFailure: () => {
          notification.error({
            message: 'Server error while editing timeslot',
          });
        },
      },
    });
  };
};

export const getResearches = query => {
  return dispatch => {
    return dispatch({
      type: Action.GET_RESEARCHES,
      promise: Api.getResearches(query),
      meta: {
        onFailure: () => {
          notification.error({ message: 'Failure to fetch researches' });
        },
      },
    });
  };
};

export const addResearch = values => {
  return dispatch => {
    return dispatch({
      type: Action.ADD_RESEARCH,
      promise: Api.addResearch(values),
      meta: {
        onSuccess: () => {
          notification.success({ message: 'Successfully added research' });
        },
        onFailure: () => {
          notification.error({
            message: 'Server error while creating research',
          });
        },
      },
    });
  };
};

export const deleteResearch = researchID => {
  return dispatch => {
    return dispatch({
      type: Action.DELETE_RESEARCH,
      promise: Api.deleteResearch(researchID),
      meta: {
        onSuccess: () => {
          notification.success({ message: 'Successfully deleted research' });
        },
        onFailure: () => {
          notification.error({
            message: 'Server error while deleting research',
          });
        },
      },
    });
  };
};

export const editResearch = (researchID, body) => {
  return dispatch => {
    return dispatch({
      type: Action.EDIT_RESEARCH,
      promise: Api.editResearch(researchID, body),
      meta: {
        onSuccess: () => {
          notification.success({ message: 'Successfully edited research' });
        },
        onFailure: () => {
          notification.error({
            message: 'Server error while updating research',
          });
        },
      },
    });
  };
};

export const getCreativeWorks = query => {
  return dispatch => {
    return dispatch({
      type: Action.GET_CWORKS,
      promise: Api.getCreativeWorks(query),
      meta: {
        onFailure: () => {
          notification.error({ message: 'Failure to fetch creative works' });
        },
      },
    });
  };
};

export const addCreativeWork = values => {
  return dispatch => {
    return dispatch({
      type: Action.ADD_CWORK,
      promise: Api.addCreativeWork(values),
      meta: {
        onSuccess: () => {
          notification.success({ message: 'Successfully added creative work' });
        },
        onFailure: () => {
          notification.error({
            message: 'Server error while creating creative work',
          });
        },
      },
    });
  };
};

export const deleteCreativeWork = creativeWorkID => {
  return dispatch => {
    return dispatch({
      type: Action.DELETE_CWORK,
      promise: Api.deleteCreativeWork(creativeWorkID),
      meta: {
        onSuccess: () => {
          notification.success({
            message: 'Successfully deleted creative work',
          });
        },
        onFailure: () => {
          notification.error({
            message: 'Server error while deleting creative work',
          });
        },
      },
    });
  };
};

export const editCreativeWork = (creativeWorkID, body) => {
  return dispatch => {
    return dispatch({
      type: Action.EDIT_CWORK,
      promise: Api.editCreativeWork(creativeWorkID, body),
      meta: {
        onSuccess: () => {
          notification.success({
            message: 'Successfully edited creative work',
          });
        },
        onFailure: () => {
          notification.error({
            message: 'Server error while updating creative work',
          });
        },
      },
    });
  };
};
