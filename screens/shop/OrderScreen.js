import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "./../../components/shop/OrderItem";
import { setOrders } from "../../store/actions/orders";

const OrdersScreen = (props) => {
  const [isLoading, setIsLoading] = useState();
  const ordersList = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(setOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#bf1557" />
      </View>
    );
  }
  if (ordersList.length === 0) {
    return (
      <View style={styles.noOrders}>
        <Text>Orders not found. Please order some.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={ordersList}
      renderItem={(itemData) => <OrderItem itemdata={itemData.item} />}
    />
  );
};

const styles = StyleSheet.create({
  noOrders: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "popins-medium",
    fontSize: 14,
  },
});

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
