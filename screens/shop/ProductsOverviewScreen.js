import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import PRODUCTS from "./../../data/dummy-data";
import ProductItem from "./../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={products}
        renderItem={(itemData) => (
          <ProductItem
            items={itemData.item}
            onViewDetails={() => {
              props.navigation.navigate("ProductDetails", {
                productId: itemData.item.id,
                productTitle: itemData.item.title,
              });
            }}
            onAddToCart={() => addToCartHandler(itemData.item)}
          />
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
