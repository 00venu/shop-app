import { LOGIN, SIGNUP } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

//export const dataTest = initialState;

export default (state = initialState, action) => {
  //  console.log(state);
  switch (action.type) {
    case LOGIN:
      //console.log(action.token);
      // console.log(action.userId);

      return {
        token: action.token,
        userId: action.userId,
      };
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
      };
    default:
      return state;
  }
};
