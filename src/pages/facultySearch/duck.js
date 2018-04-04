import { handle } from 'redux-pack';
import * as Api from '../../api';
import { notification } from 'antd';

// Action Types
const SEARCH_USER = 'FACULTY/SEARCH_USER';
const RESET_PAGE = 'FACULTY/RESET_PAGE';

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

export const resetPage = () => ({
  type: RESET_PAGE,
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

    case RESET_PAGE:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
