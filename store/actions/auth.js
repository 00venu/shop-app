export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

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
    dispatch({
      type: SIGNUP,
      token: resData.idToken,
      userId: resData.localId,
    });
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
    dispatch({
      type: LOGIN,
      token: resData.idToken,
      userId: resData.localId,
    });
  };
};
