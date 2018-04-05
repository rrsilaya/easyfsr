export const SEND_NOTIFICATION = 'SEND_NOTIFICATION';
export const CREATE_FSR = 'CREATE_FSR';
export const DOWNLOAD_FSR = 'DOWNLOAD_FSR';
export const EDIT_FSR = 'EDIT_FSR';
export const VIEW_FSR = 'VIEW_FSR';

// Action Types
export const TOGGLE_MODAL = 'DASHBOARD/TOGGLE_MODAL';

export const toggleModal = modal => ({
  type: TOGGLE_MODAL,
  payload: modal,
});

const initialState = {
  isSendNotificationModalOpen: false,
  isCreateNotificationModalOpen: false,
  isDownloadFSRModalOpen: false,
  isEditFSRModalOpen: false,
  isViewFSRModalOpen: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_MODAL:
      switch (payload) {
        case SEND_NOTIFICATION:
          return {
            ...state,
            isSendNotificationModalOpen: !state.isSendNotificationModalOpen,
          };
        case CREATE_FSR:
          return {
            ...state,
            isCreateFSRModalOpen: !state.isCreateFSRModalOpen,
          };
        case DOWNLOAD_FSR:
          return {
            ...state,
            isDownloadFSRModalOpen: !state.isDownloadFSRModalOpen,
          };
        case EDIT_FSR:
          return {
            ...state,
            isEditFSRModalOpen: !state.isEditFSRModalOpen,
          };
        case VIEW_FSR:
          return {
            ...state,
            isViewFSRModalOpen: !state.isViewFSRModalOpen,
          };

        default:
          return state;
      }

    default:
      return state;
  }
};

export default reducer;
