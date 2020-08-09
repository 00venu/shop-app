import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, Button, Alert, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

import ProductItem from "./../../components/shop/ProductItem";
import { deleteProduct } from "../../store/actions/products";

const UserProductsScreen = (props) => {
  const [error, setError] = useState(null);
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const editProductHandler = (id) => {
    props.navigation.navigate("EditProduct", {
      prodictId: id,
    });
  };

  const deleteHandler = async (id) => {
    setError(null);
    try {
      //const rmProduct = await dispatch(deleteProduct(id));
      Alert.alert("Are you sure?", "Do you want to delete the product?", [
        {
          text: "No",
          style: "default",
          onPress: () => {
            return;
          },
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            await dispatch(deleteProduct(id));
          },
        },
      ]);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    if (error) {
      Alert.alert("Alert!", error, [{ text: "Okay" }]);
    }
  }, [error]);
  if (userProducts.length === 0) {
    return (
      <View style={styles.noProducts}>
        <Text>No specific user products. Create some products</Text>
      </View>
    );
  }
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

const styles = StyleSheet.create({
  noProducts: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "popins-medium",
    fontSize: 14,
  },
});

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
