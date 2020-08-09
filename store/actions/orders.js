import Order from "./../../models/order";
export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const setOrders = () => {
  return async (dispatch, getState) => {
    //id, items, totalPrice, date
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://shop-app-a5e92.firebaseio.com/orders/${userId}.json`
    );
    const resData = await response.json();
    const loadingOrders = [];
    for (const key in resData) {
      loadingOrders.push(
        new Order(
          resData[key],
          resData[key].cartItems,
          resData[key].totalPrice,
          new Date(resData[key].date)
        )
      );
    }

    dispatch({
      type: SET_ORDERS,
      orders: loadingOrders,
    });
  };
};

export const addOrder = (cartItems, totalPrice) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://shop-app-a5e92.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalPrice,
          date: new Date().toISOString(),
        }),
      }
    );
    const resData = response.json();
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalPrice,
        date: new Date(),
      },
    });
  };
};
