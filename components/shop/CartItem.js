import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "../../store/actions/cart";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const deleteHandler = (productId) => {
    dispatch(deleteCartItem(productId));
  };
  return (
    <View style={styles.cartItem}>
      <Text style={styles.title}>{props.itemdata.productTitle}</Text>
      <Text style={styles.qty}>{props.itemdata.quantity}</Text>
      <Text style={styles.price}>$ {props.itemdata.sum}</Text>
      <TouchableOpacity>
        <Ionicons
          name="md-trash"
          color="#bf1557"
          size={23}
          onPress={() => deleteHandler(props.itemdata.productId)}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    paddingVertical: 15,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    width: 120,
    fontSize: 14,
    fontFamily: "popins-medium",
  },
  qty: {
    width: 20,
    fontSize: 14,
    fontFamily: "popins-medium",
    color: "#888",
  },
  price: {
    width: 80,
    fontSize: 14,
    fontFamily: "popins-medium",
  },
});

export default CartItem;
