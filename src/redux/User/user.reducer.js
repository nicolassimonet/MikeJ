import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null
};

const userReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case userTypes.SET_CURRENT_USER:
      console.log('SET_CURRENT_USER action', action);
      return {
        ...state,
        currentUser: action.payload
      }
    default:
      return state;
  }
};

export default userReducer;