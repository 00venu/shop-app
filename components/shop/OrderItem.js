import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import CartItem from "./../../models/cart-item";

const OrderItem = (props) => {
  const [showItems, setShowItems] = useState(false);

  return (
    <View style={{ padding: 20 }}>
      <View style={styles.orderInfo}>
        <Text style={styles.totalAmount}>
          Total $ {props.itemdata.totalPrice.toFixed(2)}
        </Text>
        <Text style={styles.orderDate}>{props.itemdata.formateDate}</Text>
      </View>
      <View style={styles.btnParent}>
        <Button
          color="#bf1557"
          title={showItems ? "Hide Details " : "Show Details"}
          onPress={() => {
            setShowItems((prevState) => !prevState);
          }}
        />
      </View>
      <View>
        {showItems && (
          <View>
            {props.itemdata.items.map((cartItem, index) => (
              <View key={index} style={styles.cartItem}>
                <Text style={styles.title}>{cartItem.productTitle}</Text>
                <Text style={styles.qty}>{cartItem.quantity}</Text>
                <Text style={styles.price}>$ {cartItem.sum}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  totalAmount: {
    fontFamily: "popins-medium",
    fontSize: 14,
  },
  orderDate: {
    fontFamily: "popins-medium",
    fontSize: 14,
    color: "#888",
  },
  btnParent: { alignItems: "center", justifyContent: "center" },
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
export default OrderItem;
