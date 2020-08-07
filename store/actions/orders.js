import Order from "./../../models/order";
export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const setOrders = () => {
  return async (dispatch) => {
    //id, items, totalPrice, date
    const response = await fetch(
      "https://shop-app-a5e92.firebaseio.com/orders/u1.json"
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
  return async (dispatch) => {
    const response = await fetch(
      "https://shop-app-a5e92.firebaseio.com/orders/u1.json",
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
