import { handle } from 'redux-pack';
import { notification } from 'antd';
import * as Api from '../../api';

// Action Types
const GET_FSR = 'SERVICE_RECORDS/GET_FSR';

// Action Creators
export const getFSRs = id => ({
  type: GET_FSR,
  promise: Api.getFSRs(id),
  meta: {
    onFailure: () => {
      notification.error({ message: 'Failure to fetch service records' });
    },
  },
});

// Initial State
const initialState = {
  fsr: [],

  isGettingFSR: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FSR:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingFSR: true,
        }),
        success: prevState => ({
          ...prevState,
          fsr: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingFSR: false,
        }),
      });

    default:
      return state;
  }
};

export default reducer;
