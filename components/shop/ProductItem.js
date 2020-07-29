import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

const ProductItem = (props) => {
  const { imageUrl, title, price } = props.items;
  return (
    <TouchableOpacity onPress={props.onViewDetails} activeOpacity={0.7}>
      <View style={styles.product}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: imageUrl }} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}> $ {price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>
          <Button
            color="#bf1557"
            title="View Details"
            onPress={props.onViewDetails}
          />
          <Button
            color="#bf1557"
            title="Add To Cart"
            onPress={props.onAddToCart}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
    marginBottom: 0,
    fontFamily: "popins-medium",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    fontFamily: "popins-medium",
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "popins-medium",
  },
  details: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: "20%",
  },
});

export default ProductItem;
