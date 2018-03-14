// Action Types
const TOGGLE_SIDEBAR = 'APP/TOGGLE_SIDEBAR';

// Action Creators
export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});

// Initial State
const initialState = {
  isSidebarCollapsed: false,
};

const reducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarCollapsed: !state.isSidebarCollapsed,
      };

    default:
      return state;
  }
};

export default reducer;
