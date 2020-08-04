import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "./../../components/shop/OrderItem";

const OrdersScreen = (props) => {
  const ordersList = useSelector((state) => state.orders.orders);
  return (
    <FlatList
      data={ordersList}
      renderItem={(itemData) => <OrderItem itemdata={itemData.item}  />}
    />
  );
};
OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;
