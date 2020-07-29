import { ADD_TO_CART, DELETE_CART_ITEM } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders";

const initialState = {
  items: {},
  totalAmount: 0,
};

//quantity, productPrice, productTitle, sum

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      //console.log(state.items);
      const cartProduct = action.product;
      const cartProductPrice = cartProduct.price;
      const cartProductTitle = cartProduct.title;
      if (state.items[cartProduct.id]) {
        const updatedCart = new CartItem(
          state.items[cartProduct.id].quantity + 1,
          cartProductPrice,
          cartProductTitle,
          state.items[cartProduct.id].sum + cartProductPrice
        );
        return {
          ...state,
          items: { ...state.items, [cartProduct.id]: updatedCart },
          totalAmount: state.totalAmount + cartProductPrice,
        };
      } else {
        const newCartItem = new CartItem(
          1,
          cartProductPrice,
          cartProductTitle,
          cartProductPrice
        );
        return {
          ...state,
          items: { ...state.items, [cartProduct.id]: newCartItem },
          totalAmount: state.totalAmount + cartProductPrice,
        };
      }
    case DELETE_CART_ITEM:
      const updateItems = { ...state.items };
      const pAmount = updateItems[action.pid].productPrice;

      const pTitle = updateItems[action.pid].productTitle;

      if (updateItems[action.pid].quantity > 1) {
        //quantity, productPrice, productTitle, sum
        const newQty = updateItems[action.pid].quantity - 1;
        let newSum =
          updateItems[action.pid].sum - updateItems[action.pid].productPrice;
        newSum = newSum.toFixed(2);
        const updatedCartItem = new CartItem(newQty, pAmount, pTitle, newSum);
        return {
          ...state,
          items: { ...state.items, [action.pid]: updatedCartItem },
          totalAmount: state.totalAmount - pAmount,
        };
      } else {
        delete updateItems[action.pid];
        return {
          ...state,
          items: updateItems,
          totalAmount: state.totalAmount - pAmount,
        };
      }
    case ADD_ORDER:
      return initialState;

    default:
      return state;
  }
};
