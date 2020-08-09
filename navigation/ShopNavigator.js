import React from "react";
import { View, Button, SafeAreaView, AsyncStorage } from "react-native";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";

import ProductsOverviewScreen from "./../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "./../screens/shop/OrderScreen";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen from "./../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "./../screens/user/AuthScreen";
import StartUpScreen from "./../screens/StartUpScreen";
import { logout } from "../store/actions/auth";

const defaultStyles = {
  headerStyle: {
    backgroundColor: "#bf1557",
  },
  headerTintColor: "#fff",
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetails: ProductDetailsScreen,
    cartScreen: CartScreen,
  },
  {
    defaultNavigationOptions: defaultStyles,
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-cart" size={18} color="#bf1557" />
      ),
    },
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    defaultNavigationOptions: defaultStyles,
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-list" size={18} color="#bf1557" />
      ),
    },
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    defaultNavigationOptions: defaultStyles,
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-create" size={18} color="#bf1557" />
      ),
    },
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: "#bf1557",
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ paddingTop: 30 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                title="Logout"
                color="#bf1557"
                onPress={() => {
                  dispatch(logout());
                  AsyncStorage.setItem("userData", "");
                  props.navigation.navigate("Auth");
                }}
              />
            </View>
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen,
});

const MainNavigator = createSwitchNavigator({
  StartUp: StartUpScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
