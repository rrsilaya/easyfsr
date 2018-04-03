import { handle } from 'redux-pack';
import * as Api from '../../api';
import { notification } from 'antd';

// Action Types
const SEARCH_USER = 'FACULTY/SEARCH_USER';

// Action Creators
export const searchUser = query => ({
  type: SEARCH_USER,
  promise: Api.getUsers(query),
  meta: {
    onFailure: () => {
      notification.error({ message: 'Error searching faculty staff' });
    },
  },
});

// Initial State
const initialState = {
  isSearching: false,
  users: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_USER:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isSearching: true,
        }),
        success: prevState => ({
          ...prevState,
          users: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isSearching: false,
        }),
      });

    default:
      return state;
  }
};

export default reducer;
