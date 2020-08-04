import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import PRODUCTS from "./../../data/dummy-data";
import ProductItem from "./../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { setProduct } from "../../store/actions/products";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

  const productDetailsHandler = (id, title) => {
    props.navigation.navigate("ProductDetails", {
      productId: id, //itemData.item.id,
      productTitle: title, //itemData.item.title,
    });
  };
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    const loadingProducts = async () => {
      setIsLoading(true);
      try {
        await dispatch(setProduct());
      } catch (err) {
        setErrMsg(err.message);
      }
      setIsLoading(false);
    };
    loadingProducts();
    /* const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadingProducts
    );
    return () => {
      willFocusSub.remove();
    };*/
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#bf1557" />
      </View>
    );
  }
  if (errMsg !== null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Oops! Error has been occoured!</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={products}
        renderItem={(itemData) => (
          <ProductItem
            items={itemData.item}
            onViewDetails={() =>
              productDetailsHandler(itemData.item.id, itemData.item.title)
            }
          >
            <Button
              color="#bf1557"
              title="View Details"
              onPress={() =>
                productDetailsHandler(itemData.item.id, itemData.item.title)
              }
            />
            <Button
              color="#bf1557"
              title="Add To Cart"
              onPress={() => addToCartHandler(itemData.item)}
            />
          </ProductItem>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {},
});

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName="md-cart"
          onPress={() => navData.navigation.navigate("cartScreen")}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;
