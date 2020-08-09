import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

//export const dataTest = initialState;

export default (state = initialState, action) => {
  //  console.log(state);
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      //console.log(initialState);
      return initialState;
    /* case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
      };*/
    default:
      return state;
  }
};
