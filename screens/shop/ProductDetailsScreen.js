import React from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  Button,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/cart";

const ProductDetailsScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const productData = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };
  const productItem = productData.find((product) => product.id === productId);

  return (
    <View>
      <Image style={styles.image} source={{ uri: productItem.imageUrl }} />
      <View style={styles.btn}>
        <Button
          color="#bf1557"
          title="Add To Cart"
          onPress={() => addToCartHandler(productItem)}
        />
      </View>
      <Text style={styles.price}>$ {productItem.price}</Text>
      <Text style={styles.dec}>{productItem.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
  btn: {
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    color: "#888",
    marginVertical: 20,
    textAlign: "center",
    fontFamily: "popins-medium",
  },
  dec: {
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 20,
    fontFamily: "popins-medium",
  },
});

ProductDetailsScreen.navigationOptions = (navData) => {
  productTitle = navData.navigation.getParam("productTitle");
  return {
    headerTitle: productTitle,
  };
};

export default ProductDetailsScreen;
