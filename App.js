import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ProductReducer from "./store/reducers/products";
import ShopNavigator from "./navigation/ShopNavigator";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import CartReducer from "./store/reducers/cart";
import OrdersReducer from "./store/reducers/orders";
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
  orders: OrdersReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const fetchFonts = () => {
  return Font.loadAsync({
    "popins-medium": require("./assets/fonts/poppins-medium-webfont.ttf"),
    "popins-semibold": require("./assets/fonts/poppins-semibold-webfont.ttf"),
  });
};

export default function App() {
  const [fonstload, setFontLoad] = useState(false);
  if (!fonstload) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoad(true)} />
    );
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({});
