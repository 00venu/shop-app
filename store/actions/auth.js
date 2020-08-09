// export const SIGNUP = "SIGNUP";
// export const LOGIN = "LOGIN";
import { AsyncStorage } from "react-native";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (token, userId) => {
  return {
    type: AUTHENTICATE,
    token,
    userId,
  };
};

export const signupHandler = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAOU9zy5luaFEGOyD2tTIi-RIlSZ2usPIU",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const errData = await response.json();
      let errorMsg = errData.error.message;
      throw new Error(errorMsg);
    }
    const resData = await response.json();
    //console.log(resData);
    dispatch(authenticate(resData.localId, resData.idToken));
  };
};

export const loginHandler = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAOU9zy5luaFEGOyD2tTIi-RIlSZ2usPIU",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const errData = await response.json();
      let errorMsg = errData.error.message;
      throw new Error(errorMsg);
    }
    const resData = await response.json();
    //console.log(resData.idToken);
    //console.log(resData.localId);
    const expDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expDate);
    dispatch(authenticate(resData.localId, resData.idToken));
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const saveDataToStorage = (token, userId, expiryDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiryDate: expiryDate.toISOString(),
    })
  );
};
