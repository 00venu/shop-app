import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import { addOrder } from "../../store/actions/orders";

const CartScreen = (props) => {
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const cartProductList = [];
    for (let key in state.cart.items) {
      cartProductList.push({
        productId: key,
        productPrice: state.cart.items[key].productPrice,
        productTitle: state.cart.items[key].productTitle,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return cartProductList.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });
  //console.log(cartItems);
  return (
    <View style={styles.screen}>
      <View style={styles.total}>
        <Text style={styles.totalPrice}>
          Total : $ {totalAmount.toFixed(2)}
        </Text>
        <View style={styles.btnParent}>
          <Button
            color="#bf1557"
            title="Order Now"
            onPress={() => {
              dispatch(addOrder(cartItems, totalAmount));
            }}
          />
        </View>
      </View>
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={(itemData) => <CartItem itemdata={itemData.item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { padding: 20 },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 10,
  },
  btnParent: {
    alignItems: "center",
  },
  totalPrice: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "popins-medium",
    paddingBottom: 10,
  },
});

CartScreen.navigationOptions = {
  headerTitle: "Your Cart",
};

export default CartScreen;
