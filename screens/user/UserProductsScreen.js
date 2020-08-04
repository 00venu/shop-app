import React from "react";
import { FlatList, Button, Alert, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

import ProductItem from "./../../components/shop/ProductItem";
import { deleteProduct } from "../../store/actions/products";

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const editProductHandler = (id) => {
    props.navigation.navigate("EditProduct", {
      prodictId: id,
    });
  };
  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you want to delete the product?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => dispatch(deleteProduct(id)),
      },
    ]);
  };
  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          items={itemData.item}
          onViewDetails={() => editProductHandler(itemData.item.id)}
          onAddToCart={() => {}}
        >
          <Button
            color="#bf1557"
            title="Edit"
            onPress={() => editProductHandler(itemData.item.id)}
          />
          <Button
            color="#bf1557"
            title="Delete"
            onPress={() => deleteHandler(itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({});

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Products",
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
          title="Edit"
          iconName="md-create"
          onPress={() => navData.navigation.navigate("EditProduct")}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;
